'use server';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import { insertEntry } from '../../lib/db';

export async function logFailure(_prev: string | null, formData: FormData) {
  // honeypot
  if (formData.get('website')) redirect('/');

  const g = (k: string) => (formData.get(k) as string | null ?? '').trim();
  const title = g('title');
  const field = g('field');
  const hypothesis = g('hypothesis');
  const method = g('method');
  const outcome = g('outcome');
  const probable_reason = g('probable_reason');
  const contributor_name = g('contributor_name');
  const image_url = g('image_url') || undefined;

  if (!title || !field || !hypothesis || !method || !outcome || !probable_reason || !contributor_name)
    return 'Please fill in all required fields.';
  if (title.length < 5) return 'Title must be at least 5 characters.';

  const tags = g('tags')
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 10);

  const session = await getServerSession(authOptions);

  try {
    const nr_id = await insertEntry({
      title,
      field,
      hypothesis,
      method,
      outcome,
      probable_reason,
      tags,
      image_url,
      contributor_name,
      contributor_email: g('contributor_email') || undefined,
      user_id: session?.user?.id ?? undefined,
    });
    redirect(`/entry/${nr_id}?new=1`);
  } catch (err: unknown) {
    if ((err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')) throw err;
    return (err as Error).message ?? 'Something went wrong. Please try again.';
  }
}
