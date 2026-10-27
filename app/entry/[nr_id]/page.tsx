import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getEntryByNrId } from '../../../lib/db';
import CiteButton from '../../../components/CiteButton';

export const dynamic = 'force-dynamic';

interface Props { params: Promise<{ nr_id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nr_id } = await params;
  const e = await getEntryByNrId(nr_id).catch(() => null);
  if (!e) return { title: 'Not found' };
  return { title: e.title, description: `${e.outcome.slice(0, 120)}…` };
}

const SECTION = 'mb-6 pb-6 border-b border-slate-100 last:border-0';
const SECTION_LABEL = 'text-xs font-bold uppercase tracking-widest text-slate-400 mb-2';

export default async function EntryPage({ params }: Props) {
  const { nr_id } = await params;
  const e = await getEntryByNrId(nr_id).catch(() => null);
  if (!e) notFound();

  const dateStr = new Date(e.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back */}
      <Link href="/search" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 mb-6 transition-colors">
        ← Back to search
      </Link>

      {/* Header card with research image */}
      <div className="card mb-6 overflow-hidden p-0">
        {e.image_url && (
          <div className="relative w-full h-64 sm:h-80 bg-slate-100">
            <Image
              src={e.image_url}
              alt={e.title}
              fill
              priority
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono text-sm font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
              {e.nr_id}
            </span>
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              {e.field}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 leading-tight mb-4">
            {e.title}
          </h1>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mb-4">
            <span>By <strong className="text-slate-700">{e.contributor_name}</strong></span>
            <span>{dateStr}</span>
          </div>

          {e.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {e.tags.map((t) => (
                <Link key={t} href={`/search?q=${encodeURIComponent(t)}`}
                  className="text-xs bg-brand-50 text-brand-700 hover:bg-brand-100 px-2.5 py-0.5 rounded-full transition-colors">
                  #{t}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="card space-y-0">
        <div className={SECTION}>
          <p className={SECTION_LABEL}>Hypothesis</p>
          <p className="text-slate-800 leading-relaxed">{e.hypothesis}</p>
        </div>
        <div className={SECTION}>
          <p className={SECTION_LABEL}>Method</p>
          <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{e.method}</p>
        </div>
        <div className={SECTION}>
          <p className={SECTION_LABEL}>What happened</p>
          <p className="text-slate-800 leading-relaxed">{e.outcome}</p>
        </div>
        <div className={SECTION}>
          <p className={SECTION_LABEL}>Probable reason for failure</p>
          <p className="text-slate-800 leading-relaxed font-medium">{e.probable_reason}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6">
        <CiteButton
          nr_id={e.nr_id}
          title={e.title}
          contributor_name={e.contributor_name}
          created_at={e.created_at}
        />
      </div>

      {/* Similar */}
      <div className="mt-8 text-center text-sm text-slate-500">
        <Link href={`/search?q=${encodeURIComponent(e.title)}`}
          className="text-brand-600 font-medium hover:underline">
          Search for similar experiments →
        </Link>
      </div>
    </div>
  );
}
