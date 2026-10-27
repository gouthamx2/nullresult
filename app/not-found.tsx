import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-black font-serif text-brand-600 mb-4">404</p>
      <h1 className="text-2xl font-bold font-serif text-slate-900 mb-3">Page not found</h1>
      <p className="text-slate-500 mb-8">
        This entry or page doesn&apos;t exist — but maybe your failure should.
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        <Link href="/" className="btn-secondary">Go home</Link>
        <Link href="/log" className="btn-primary">Log a failure</Link>
      </div>
    </div>
  );
}
