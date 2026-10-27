'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) { setError('Invalid email or password.'); return; }
    router.push('/');
    router.refresh();
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif font-black text-2xl text-slate-900">
            Null<span className="line-through decoration-brand-600 decoration-2">Result</span>
          </Link>
          <h1 className="text-2xl font-bold font-serif mt-4 mb-1 text-slate-900">Welcome back</h1>
          <p className="text-slate-500 text-sm">Sign in to log and manage your entries</p>
        </div>

        <div className="card">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" type="email" required autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" type="password" required autoComplete="current-password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" className="input" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-brand-600 font-medium hover:underline">Join free</Link>
        </p>
      </div>
    </div>
  );
}
