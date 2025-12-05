import { NextResponse } from 'next/server';

// Deprecated: coach login is now handled by NextAuth Credentials provider.
// Keep this route present but return a helpful message to migrate callers.
export async function POST() {
  return NextResponse.json(
    { error: 'Deprecated: use NextAuth credentials sign-in (POST to /api/auth/callback/credentials)' },
    { status: 410 }
  );
}
