// ─── Domain types ────────────────────────────────────────────────────────────

export interface UserDoc {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;       // URL – auto-generated or user-supplied
  bio?: string;
  createdAt: Date;
}

export interface EntryDoc {
  _id: string;
  nr_id: string;
  title: string;
  field: string;
  hypothesis: string;
  method: string;
  outcome: string;
  probable_reason: string;
  tags: string[];
  image_url?: string;
  contributor_name: string;
  contributor_email?: string;
  user_id?: string;     // links to UserDoc._id when logged in
  created_at: Date;
}

// Lighter shape used in card lists
export type EntryCard = Pick<
  EntryDoc,
  | 'nr_id'
  | 'title'
  | 'field'
  | 'outcome'
  | 'tags'
  | 'image_url'
  | 'contributor_name'
  | 'user_id'
  | 'created_at'
>;

// Contributor preview shown below the search bar
export interface ContributorPreview {
  name: string;
  avatar: string;
  user_id?: string;
}

// Next-Auth session augmentation
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
  interface User {
    id: string;
    image: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    image: string;
  }
}
