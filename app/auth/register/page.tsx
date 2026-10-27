'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    // 1. Register
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setLoading(false); return; }
    // 2. Auto sign in
    await signIn('credentials', { email: form.email, password: form.password, redirect: false });
    router.push('/');
    router.refresh();
  }

  const avatarPreview = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(form.email || form.name || 'preview')}&radius=50`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif font-black text-2xl text-slate-900">
            Null<span className="line-through decoration-brand-600 decoration-2">Result</span>
          </Link>
          <h1 className="text-2xl font-bold font-serif mt-4 mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm">Share your failures. Earn citable credit.</p>
        </div>

        <div className="card">
          {/* Avatar preview */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <Image src={avatarPreview} alt="Your auto-generated avatar"
                width={72} height={72} className="rounded-full ring-4 ring-brand-100" unoptimized />
              <span className="absolute -bottom-1 -right-1 text-xs bg-brand-600 text-white rounded-full px-1.5 py-0.5">auto</span>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mb-5">Your profile photo is auto-generated from your email</p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="name">Full name</label>
              <input id="name" type="text" required value={form.name} onChange={update('name')}
                placeholder="Ada Lovelace" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" type="email" required value={form.email} onChange={update('email')}
                placeholder="ada@example.com" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" type="password" required minLength={8}
                value={form.password} onChange={update('password')}
                placeholder="At least 8 characters" className="input" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
