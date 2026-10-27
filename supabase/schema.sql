create sequence if not exists nr_seq start 1;

create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  nr_id text unique not null default
    ('NR-' || extract(year from now())::int || '-' || lpad(nextval('nr_seq')::text, 4, '0')),
  title text not null,
  field text,
  author text,
  what_tried text not null,
  what_happened text not null,
  why_failed text,
  failure_category text,
  hours_spent numeric not null default 0,
  created_at timestamptz not null default now(),
  fts tsvector generated always as (
    to_tsvector('english',
      coalesce(title,'') || ' ' || coalesce(what_tried,'') || ' ' ||
      coalesce(what_happened,'') || ' ' || coalesce(why_failed,''))
  ) stored
);
create index if not exists entries_fts_idx on entries using gin (fts);

alter table entries enable row level security;
create policy "public read" on entries for select using (true);
create policy "public insert" on entries for insert with check (
  char_length(title) between 3 and 200 and char_length(what_tried) <= 5000
);

-- OR-style search so "biodegradable plastic from banana peel" matches partial overlaps
create or replace function search_entries(q text)
returns table (nr_id text, title text, field text, why_failed text, failure_category text,
               hours_spent numeric, created_at timestamptz, rank real)
language sql stable as $$
  with tq as (
    select nullif(replace(plainto_tsquery('english', q)::text, '&', '|'), '')::tsquery as t
  )
  select e.nr_id, e.title, e.field, e.why_failed, e.failure_category, e.hours_spent, e.created_at,
         ts_rank(e.fts, tq.t) as rank
  from entries e, tq
  where tq.t is not null and e.fts @@ tq.t
  order by rank desc limit 20;
$$;

create or replace function entry_stats()
returns table (entries bigint, hours numeric)
language sql stable as $$
  select count(*), coalesce(sum(hours_spent), 0) from entries;
$$;
