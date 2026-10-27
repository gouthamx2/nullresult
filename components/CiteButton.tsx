'use client';
import { useState } from 'react';

interface Props {
  nr_id: string;
  title: string;
  contributor_name: string;
  created_at: Date | string;
}

export default function CiteButton({ nr_id, title, contributor_name, created_at }: Props) {
  const [copied, setCopied] = useState<'link' | 'cite' | null>(null);

  const date = new Date(created_at);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/entry/${nr_id}`
    : `https://nullresult.app/entry/${nr_id}`;

  const citation = `${contributor_name}. "${title}." NullResult, ${nr_id}, ${month} ${year}. ${url}`;

  async function copyText(text: string, type: 'link' | 'cite') {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <button
        onClick={() => copyText(url, 'link')}
        className="inline-flex items-center gap-1.5 text-sm font-medium border border-slate-300 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors"
      >
        {copied === 'link' ? (
          <><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-green-600">Link copied</span></>
        ) : (
          <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy link</>
        )}
      </button>

      <button
        onClick={() => copyText(citation, 'cite')}
        className="inline-flex items-center gap-1.5 text-sm font-semibold bg-brand-600 text-white rounded-lg px-3 py-2 hover:bg-brand-700 transition-colors"
      >
        {copied === 'cite' ? (
          <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
        ) : (
          <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>Cite this</>
        )}
      </button>

      {copied === 'cite' && (
        <p className="w-full text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded-lg break-all">
          {citation}
        </p>
      )}
    </div>
  );
}
