import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Dev helper: returns the server-side session as JSON so you can inspect what NextAuth sees.
// Usage: open https://localhost:PORT/debug/session (or http://localhost:PORT/debug/session) in your browser.
export async function GET() {
  const session = await getServerSession(authOptions as unknown as NextAuthOptions);
  // Return a small, safe payload — raw session is fine in dev but avoid exposing secrets in prod.
  return NextResponse.json({ session });
}
