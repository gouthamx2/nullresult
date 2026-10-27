'use client';
import { useActionState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { logFailure } from './actions';

const FIELDS = [
  'Chemistry', 'Biology', 'Computer Science', 'Physics',
  'Materials', 'Education', 'Engineering', 'Environmental', 'Agriculture', 'Machine learning',
];

export default function LogPage() {
  const { data: session } = useSession();
  const params = useSearchParams();
  const prefillTitle = params.get('title') ?? '';
  const [error, action, pending] = useActionState(logFailure, null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Share a failure
        </span>
        <h1 className="text-4xl font-black font-serif mt-3 mb-2 text-slate-900">Log a failure</h1>
        <p className="text-slate-500">
          Takes 5 minutes. You&apos;ll get a permanent citable ID — e.g.{' '}
          <code className="text-brand-600 font-mono text-sm bg-brand-50 px-1.5 py-0.5 rounded">NR-2026-0001</code> —
          that you can add to your CV, paper, or thesis.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <form action={action} className="space-y-6 card">
        {/* honeypot */}
        <input name="website" className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden />

        {/* Title */}
        <div>
          <label className="label" htmlFor="title">
            Title <span className="text-red-500">*</span>
          </label>
          <input id="title" name="title" required minLength={5} maxLength={200}
            defaultValue={prefillTitle}
            placeholder="What you tried, in one sentence"
            className="input" />
        </div>

        {/* Field */}
        <div>
          <label className="label" htmlFor="field">
            Research field <span className="text-red-500">*</span>
          </label>
          <select id="field" name="field" required className="input">
            <option value="">Select a field</option>
            {FIELDS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>

        {/* Hypothesis */}
        <div>
          <label className="label" htmlFor="hypothesis">
            Hypothesis <span className="text-red-500">*</span>
          </label>
          <textarea id="hypothesis" name="hypothesis" required rows={3}
            placeholder="What did you expect to happen? Why did you think it would work?"
            className="input resize-none" />
        </div>

        {/* Method */}
        <div>
          <label className="label" htmlFor="method">
            Method <span className="text-red-500">*</span>
          </label>
          <textarea id="method" name="method" required rows={4}
            placeholder="Materials, conditions, protocol steps…"
            className="input resize-none" />
        </div>

        {/* Outcome */}
        <div>
          <label className="label" htmlFor="outcome">
            What happened <span className="text-red-500">*</span>
          </label>
          <textarea id="outcome" name="outcome" required rows={3}
            placeholder="The actual result — what you observed"
            className="input resize-none" />
        </div>

        {/* Probable reason */}
        <div>
          <label className="label" htmlFor="probable_reason">
            Probable reason for failure <span className="text-red-500">*</span>
          </label>
          <textarea id="probable_reason" name="probable_reason" required rows={3}
            placeholder="Your best explanation for why it didn't work"
            className="input resize-none" />
        </div>

        {/* Tags */}
        <div>
          <label className="label" htmlFor="tags">Tags (comma-separated)</label>
          <input id="tags" name="tags"
            placeholder="e.g. bioplastic, starch, humidity, banana-peel"
            className="input" />
          <p className="text-xs text-slate-400 mt-1">Up to 10 tags. Helps others find your entry.</p>
        </div>

        {/* Image preview URL (optional) */}
        <div>
          <label className="label" htmlFor="image_url">Experiment photo / diagram URL (optional)</label>
          <input id="image_url" name="image_url" type="url"
            placeholder="https://example.com/experiment-setup.jpg"
            className="input" />
          <p className="text-xs text-slate-400 mt-1">Direct link to a photo of your setup, petri dish, chart, or microscope view.</p>
        </div>

        {/* Contributor */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="contributor_name">
              Your name <span className="text-red-500">*</span>
            </label>
            <input id="contributor_name" name="contributor_name" required
              defaultValue={session?.user?.name ?? ''}
              placeholder="For the citation"
              className="input" />
          </div>
          <div>
            <label className="label" htmlFor="contributor_email">Email (optional)</label>
            <input id="contributor_email" name="contributor_email" type="email"
              defaultValue={session?.user?.email ?? ''}
              placeholder="Never shown publicly"
              className="input" />
          </div>
        </div>

        <button type="submit" disabled={pending} className="btn-primary w-full justify-center py-3">
          {pending ? 'Publishing…' : 'Publish and get my citable ID →'}
        </button>
      </form>
    </div>
  );
}
