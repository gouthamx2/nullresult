import Link from 'next/link';
import { searchEntries, getRecentEntries } from '../../lib/db';
import EntryCard from '../../components/EntryCard';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const FIELDS = [
  'all', 'Chemistry', 'Biology', 'Computer Science', 'Physics',
  'Materials', 'Education', 'Engineering', 'Environmental', 'Agriculture', 'Machine learning',
];

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q = '' } = await searchParams;
  return { title: q ? `"${q}" – Search` : 'Search dead ends' };
}

interface Props {
  searchParams: Promise<{ q?: string; field?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = '', field = 'all' } = await searchParams;

  let results = q
    ? await searchEntries(q, field === 'all' ? undefined : field).catch(() => [])
    : await getRecentEntries(18).catch(() => []);

  const n = results.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Search bar */}
      <form action="/search" className="flex gap-2 max-w-2xl mb-6">
        <input
          name="q"
          defaultValue={q}
          type="search"
          autoFocus
          placeholder="Search experiments, hypotheses, methods…"
          className="input flex-1"
        />
        <button className="btn-primary shrink-0">Search</button>
      </form>

      {/* Field filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FIELDS.map((f) => {
          const params = new URLSearchParams({ ...(q ? { q } : {}), field: f });
          const active = (field === f) || (!field && f === 'all');
          return (
            <Link
              key={f}
              href={`/search?${params}`}
              className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                active
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-brand-400 hover:text-brand-600'
              }`}
            >
              {f === 'all' ? 'All fields' : f}
            </Link>
          );
        })}
      </div>

      {/* Result banner */}
      {q && n > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
          <span className="text-2xl">⚠️</span>
          <p className="text-sm font-medium text-amber-900">
            <strong>{n} {n === 1 ? 'person' : 'people'}</strong> already tried something similar.
            Review before you start.
          </p>
        </div>
      )}

      {/* Results */}
      {n > 0 ? (
        <>
          {!q && (
            <h2 className="text-xl font-bold font-serif text-slate-800 mb-4">Recent entries</h2>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((e) => <EntryCard key={e.nr_id} entry={e} />)}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            Tried it anyway and failed?{' '}
            <Link href="/log" className="text-brand-600 font-medium hover:underline">
              Log your attempt.
            </Link>
          </p>
        </>
      ) : q ? (
        <div className="card text-center py-16 max-w-lg mx-auto">
          <p className="text-5xl mb-4">🔬</p>
          <h2 className="text-xl font-bold font-serif mb-2">Nothing recorded for &ldquo;{q}&rdquo; yet.</h2>
          <p className="text-slate-500 mb-6">
            Either it&apos;s untried, or the failure was never shared.
            If you try it and it fails, please log it.
          </p>
          <Link href={`/log?title=${encodeURIComponent(q)}`} className="btn-primary">
            Log this failure
          </Link>
        </div>
      ) : null}
    </div>
  );
}
