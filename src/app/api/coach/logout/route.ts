import { NextResponse } from 'next/server';

// Deprecated: logout is handled by NextAuth signOut on the client.
export async function POST() {
  return NextResponse.json({ error: 'Deprecated: use NextAuth signOut' }, { status: 410 });
}
