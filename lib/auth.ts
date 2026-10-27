import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await getUserByEmail(credentials.email);
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        return { id: user._id, name: user.name, email: user.email, image: user.avatar };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.id = user.id; token.image = user.image; }
      return token;
    },
    async session({ session, token }) {
      session.user.id    = token.id as string;
      session.user.image = token.image as string;
      return session;
    },
  },
  pages: { signIn: '/auth/login' },
  secret: process.env.NEXTAUTH_SECRET,
};
