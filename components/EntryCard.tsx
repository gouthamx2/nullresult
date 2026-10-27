import Link from 'next/link';
import Image from 'next/image';
import type { EntryCard } from '../types/index';

const FIELD_COLORS: Record<string, string> = {
  Chemistry:          'bg-amber-100 text-amber-800',
  Biology:            'bg-green-100 text-green-800',
  'Computer Science': 'bg-violet-100 text-violet-800',
  Education:          'bg-sky-100 text-sky-800',
  Physics:            'bg-rose-100 text-rose-800',
  Materials:          'bg-orange-100 text-orange-800',
  'Machine learning': 'bg-violet-100 text-violet-800',
  Engineering:        'bg-zinc-100 text-zinc-800',
  Environmental:      'bg-teal-100 text-teal-800',
  Agriculture:        'bg-lime-100 text-lime-800',
};

function fieldColor(field: string) {
  return FIELD_COLORS[field] ?? 'bg-slate-100 text-slate-700';
}

export default function EntryCard({ entry }: { entry: EntryCard }) {
  const date = new Date(entry.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <Link
      href={`/entry/${entry.nr_id}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-brand-400 hover:shadow-lg transition-all duration-200"
    >
      {/* Research preview thumbnail */}
      {entry.image_url && (
        <div className="relative w-full h-44 overflow-hidden bg-slate-100">
          <Image
            src={entry.image_url}
            alt={entry.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
            <span className="font-mono text-xs font-bold text-brand-600">{entry.nr_id}</span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm ${fieldColor(entry.field)}`}>
              {entry.field}
            </span>
          </div>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        {!entry.image_url && (
          <div className="flex items-start justify-between gap-3 mb-2">
            <span className="font-mono text-xs font-semibold text-brand-600">{entry.nr_id}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${fieldColor(entry.field)}`}>
              {entry.field}
            </span>
          </div>
        )}

        <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors leading-snug mb-2 line-clamp-2">
          {entry.title}
        </h3>

        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{entry.outcome}</p>

        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {entry.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
          <span className="font-medium text-slate-600">{entry.contributor_name}</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
