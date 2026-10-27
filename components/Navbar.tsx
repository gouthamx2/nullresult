'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import UserAvatar from './UserAvatar';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl text-slate-900 hover:text-brand-600 transition-colors">
          Null<span className="line-through decoration-brand-600 decoration-2">Result</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/search" className="hover:text-brand-600 transition-colors">Search</Link>
          <Link href="/log" className="hover:text-brand-600 transition-colors">Log a failure</Link>
        </nav>

        {/* Auth area */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <UserAvatar name={session.user.name} avatar={session.user.image} size={34} />
                <span className="hidden md:block text-sm font-medium text-slate-700 max-w-[120px] truncate">
                  {session.user.name}
                </span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-slate-200 py-1 z-50">
                  <Link href={`/profile/${session.user.id}`}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link href="/log"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setMenuOpen(false)}>
                    Log a failure
                  </Link>
                  <hr className="my-1 border-slate-100" />
                  <button
                    onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login"
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors px-3 py-1.5">
                Sign in
              </Link>
              <Link href="/auth/register"
                className="text-sm font-semibold bg-brand-600 text-white px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors">
                Join free
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
