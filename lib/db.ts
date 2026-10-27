import { ObjectId } from 'mongodb';
import clientPromise from './mongodb';
import type { EntryDoc, EntryCard, UserDoc, ContributorPreview } from '../types';

// ─── helpers ─────────────────────────────────────────────────────────────────

async function db() {
  const client = await clientPromise;
  return client.db('nullresult');
}

async function entries() { return (await db()).collection<EntryDoc>('entries'); }
async function users()   { return (await db()).collection<UserDoc>('users'); }

// ─── NR-ID counter ───────────────────────────────────────────────────────────

async function nextNrId(): Promise<string> {
  const col = (await db()).collection<{ _id: string; seq: number }>('counters');
  const result = await col.findOneAndUpdate(
    { _id: 'nr_seq' },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' },
  );
  const seq = String(result!.seq).padStart(4, '0');
  return `NR-${new Date().getFullYear()}-${seq}`;
}

// ─── Entries ─────────────────────────────────────────────────────────────────

export async function insertEntry(
  fields: Omit<EntryDoc, '_id' | 'nr_id' | 'created_at'>,
): Promise<string> {
  const col = await entries();
  const nr_id = await nextNrId();
  await col.insertOne({
    ...fields,
    _id: new ObjectId().toString() as unknown as string,
    nr_id,
    created_at: new Date(),
  } as unknown as EntryDoc);
  return nr_id;
}

export async function getEntryByNrId(nr_id: string): Promise<EntryDoc | null> {
  const col = await entries();
  return col.findOne({ nr_id }, { projection: { _id: 0 } }) as Promise<EntryDoc | null>;
}

export async function getRecentEntries(limit = 6): Promise<EntryCard[]> {
  const col = await entries();
  return col
    .find({}, { projection: { _id: 0, nr_id: 1, title: 1, field: 1, outcome: 1, tags: 1, image_url: 1, contributor_name: 1, user_id: 1, created_at: 1 } })
    .sort({ created_at: -1 })
    .limit(limit)
    .toArray() as unknown as EntryCard[];
}

export async function searchEntries(q: string, field?: string): Promise<EntryCard[]> {
  const col = await entries();
  await col.createIndex(
    { title: 'text', hypothesis: 'text', method: 'text', outcome: 'text', probable_reason: 'text', tags: 'text' },
    { name: 'fts' },
  ).catch(() => {}); // index already exists – ignore

  const filter: Record<string, unknown> = { $text: { $search: q } };
  if (field && field !== 'all') filter.field = field;

  return col
    .find(filter, {
      projection: {
        _id: 0, nr_id: 1, title: 1, field: 1, outcome: 1, tags: 1, image_url: 1, contributor_name: 1, user_id: 1, created_at: 1,
        score: { $meta: 'textScore' },
      },
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(30)
    .toArray() as unknown as EntryCard[];
}

export async function getStats(): Promise<{ entries: number; hours: number }> {
  const col = await entries();
  const [result] = await col
    .aggregate<{ entries: number; hours: number }>([
      { $group: { _id: null, entries: { $sum: 1 }, hours: { $sum: '$hours_spent' } } },
    ])
    .toArray();
  const count = result?.entries ?? await col.countDocuments();
  return { entries: count, hours: count * 40 };
}

export async function getEntriesByUser(user_id: string): Promise<EntryCard[]> {
  const col = await entries();
  return col
    .find({ user_id }, { projection: { _id: 0, nr_id: 1, title: 1, field: 1, outcome: 1, tags: 1, image_url: 1, contributor_name: 1, user_id: 1, created_at: 1 } })
    .sort({ created_at: -1 })
    .toArray() as unknown as EntryCard[];
}

// ─── Recent contributors for homepage preview ────────────────────────────────

export async function getRecentContributors(limit = 8): Promise<ContributorPreview[]> {
  const col = await entries();
  const recent = await col
    .aggregate<{ contributor_name: string; user_id?: string }>([
      { $sort: { created_at: -1 } },
      { $group: { _id: '$contributor_name', user_id: { $first: '$user_id' } } },
      { $limit: limit },
    ])
    .toArray();

  const userCol = await users();
  return Promise.all(
    recent.map(async (r) => {
      let avatar = avatarUrl(r.contributor_name);
      if (r.user_id) {
        const u = await userCol.findOne({ _id: r.user_id });
        if (u?.avatar) avatar = u.avatar;
      }
      return { name: r.contributor_name, avatar, user_id: r.user_id };
    }),
  );
}

// ─── Users ───────────────────────────────────────────────────────────────────

export function avatarUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed)}&radius=50`;
}

export async function createUser(
  name: string, email: string, passwordHash: string,
): Promise<UserDoc> {
  const col = await users();
  const existing = await col.findOne({ email });
  if (existing) throw new Error('Email already registered.');
  const doc: UserDoc = {
    _id: new ObjectId().toString(),
    name, email, passwordHash,
    avatar: avatarUrl(email),
    createdAt: new Date(),
  };
  await col.insertOne(doc as unknown as UserDoc);
  return doc;
}

export async function getUserByEmail(email: string): Promise<UserDoc | null> {
  const col = await users();
  return col.findOne({ email }) as unknown as UserDoc | null;
}

export async function getUserById(id: string): Promise<UserDoc | null> {
  const col = await users();
  return col.findOne({ _id: id }) as unknown as UserDoc | null;
}

export async function updateUserAvatar(id: string, avatar: string): Promise<void> {
  const col = await users();
  await col.updateOne({ _id: id }, { $set: { avatar } });
}
