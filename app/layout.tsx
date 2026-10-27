import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import Providers from '../components/Providers';
import Navbar from '../components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: { default: 'NullResult', template: '%s · NullResult' },
  description: 'Science publishes what worked. We keep what didn\'t.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Providers session={session}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white mt-16">
            <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
              <span className="font-serif font-bold text-slate-700">Null<span className="line-through decoration-brand-600 decoration-2">Result</span></span>
              <span>Science publishes what worked. We keep what didn&apos;t.</span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
