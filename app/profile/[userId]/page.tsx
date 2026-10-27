import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getUserById, getEntriesByUser } from '../../../lib/db';
import EntryCard from '../../../components/EntryCard';

export const dynamic = 'force-dynamic';
interface Props { params: Promise<{ userId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params;
  const user = await getUserById(userId).catch(() => null);
  return { title: user ? `${user.name}'s Profile` : 'Profile' };
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params;
  const [user, entries] = await Promise.all([
    getUserById(userId).catch(() => null),
    getEntriesByUser(userId).catch(() => []),
  ]);
  if (!user) notFound();

  const joined = new Date(user.createdAt).toLocaleDateString('en-GB', {
    month: 'long', year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Profile header */}
      <div className="card flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        <Image
          src={user.avatar}
          alt={user.name}
          width={96}
          height={96}
          className="rounded-full ring-4 ring-brand-100"
          unoptimized
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-black font-serif text-slate-900 mb-1">{user.name}</h1>
          {user.bio && <p className="text-slate-500 mb-3 max-w-md">{user.bio}</p>}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-slate-500">
            <span>
              <strong className="text-slate-800">{entries.length}</strong>{' '}
              {entries.length === 1 ? 'failure' : 'failures'} logged
            </span>
            <span>Joined {joined}</span>
          </div>
        </div>
      </div>

      {/* Entries */}
      <h2 className="text-2xl font-bold font-serif mb-4 text-slate-900">
        {user.name.split(' ')[0]}&apos;s failures
      </h2>

      {entries.length === 0 ? (
        <div className="card text-center py-12 text-slate-400">
          No entries yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((e) => <EntryCard key={e.nr_id} entry={e} />)}
        </div>
      )}
    </div>
  );
}
