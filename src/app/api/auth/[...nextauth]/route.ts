import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type Creds = { role?: string; name?: string; secret?: string } | undefined;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        role: { label: 'Role', type: 'text' },
        name: { label: 'Name', type: 'text' },
        secret: { label: 'Secret', type: 'password' }
      },
      async authorize(credentials: Creds) {
        if (!credentials) return null;
        const { role, name, secret } = credentials;

        // In production, verify against your user DB and hashed secrets
        if (role === 'coach') {
          const COACH_SECRET = process.env.COACH_SECRET || 'coach-open-sesame';
          if (secret !== COACH_SECRET) return null;
          return { id: 'coach-1', name: name || 'Coach', role: 'coach' };
        }

        if (role === 'client') {
          if (!name) return null;
          // create Lightweight client session
          return { id: `client-${name}`, name, role: 'client' };
        }

        return null;
      }
    })
  ],
  session: { strategy: 'jwt' as const },
  callbacks: {
    async jwt({ token, user }: { token: Record<string, unknown>; user?: Record<string, unknown> }) {
      if (user && typeof user === 'object') {
        const u = user as unknown as { role?: unknown; name?: unknown };
        if (typeof u.role === 'string') (token as Record<string, unknown>).role = u.role;
        if (typeof u.name === 'string') (token as Record<string, unknown>).name = u.name;
      }
      return token;
    },
  async session({ session, token }: { session: unknown; token: Record<string, unknown> }) {
      const t = token as Record<string, unknown>;
      const user: { name?: string; role?: 'client' | 'coach' } = {
        name: typeof t.name === 'string' ? String(t.name) : undefined,
        role: typeof t.role === 'string' && (t.role === 'client' || t.role === 'coach') ? (t.role as 'client' | 'coach') : undefined,
      };
      (session as unknown as { user?: unknown }).user = user;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-nextauth-secret'
} as const;

const handler = NextAuth(authOptions as unknown as NextAuthOptions);

export { handler as GET, handler as POST };
