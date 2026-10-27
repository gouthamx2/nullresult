import Link from 'next/link';
import Image from 'next/image';
import { getStats, getRecentEntries, getRecentContributors } from '../lib/db';
import EntryCard from '../components/EntryCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [stats, recent, contributors] = await Promise.all([
    getStats().catch(() => ({ entries: 0, hours: 0 })),
    getRecentEntries(6).catch(() => []),
    getRecentContributors(8).catch(() => []),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4">

      {/* ── Hero ── */}
      <section className="pt-16 pb-12 text-center">
        <p className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">
          Open Negative Results
        </p>
        <h1 className="text-5xl sm:text-6xl font-black font-serif text-slate-900 leading-tight mb-4 max-w-2xl mx-auto">
          Science publishes <span className="text-brand-600">what worked.</span>
          <br />We keep what didn&apos;t.
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-8">
          Search before you start. Every logged failure earns a permanent, citable ID—
          so sharing a dead end becomes a career asset.
        </p>

        {/* Search bar */}
        <form action="/search" className="flex gap-2 max-w-2xl mx-auto mb-6">
          <input
            name="q"
            type="search"
            autoComplete="off"
            placeholder="e.g. biodegradable plastic from banana peel"
            className="input flex-1 text-base shadow-sm"
            required
          />
          <button type="submit" className="btn-primary shrink-0">
            Search dead ends
          </button>
        </form>

        {/* ── Contributor preview (under search bar) ── */}
        {contributors.length > 0 && (
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex -space-x-2">
              {contributors.slice(0, 6).map((c, i) => (
                <Link
                  key={i}
                  href={c.user_id ? `/profile/${c.user_id}` : '#'}
                  title={c.name}
                  className="hover:z-10 relative"
                >
                  <Image
                    src={c.avatar}
                    alt={c.name}
                    width={36}
                    height={36}
                    className="rounded-full ring-2 ring-white object-cover"
                    unoptimized
                  />
                </Link>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">{stats.entries} researchers</span>{' '}
              have already shared their failures
            </p>
          </div>
        )}
      </section>

      {/* ── Stats counter ── */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-14 max-w-2xl mx-auto">
        <div className="card text-center">
          <p className="text-4xl font-black font-serif text-brand-600">{stats.entries}</p>
          <p className="text-sm text-slate-500 mt-1">dead ends recorded</p>
        </div>
        <div className="card text-center">
          <p className="text-4xl font-black font-serif text-brand-600">
            {stats.hours.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            research hours saved
            <span className="block text-xs text-slate-400">(est. 40 h per entry)</span>
          </p>
        </div>
        <div className="card text-center col-span-2 sm:col-span-1">
          <p className="text-4xl font-black font-serif text-brand-600">100%</p>
          <p className="text-sm text-slate-500 mt-1">open access, forever</p>
        </div>
      </section>

      {/* ── Recent entries ── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Recent failures</h2>
          <Link href="/search" className="text-sm font-medium text-brand-600 hover:underline">
            Browse all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-slate-500 mb-4">No entries yet. Be the first to log a failure.</p>
            <Link href="/log" className="btn-primary">Log a failure</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((e) => <EntryCard key={e.nr_id} entry={e} />)}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/log" className="btn-primary">
            Log your own failure →
          </Link>
        </div>
      </section>
    </div>
  );
}
