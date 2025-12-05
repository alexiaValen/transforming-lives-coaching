import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'dev-nextauth-secret';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/coach')) {
    const token = await getToken({ req, secret: NEXTAUTH_SECRET });
    if (token && token.role === 'coach') return NextResponse.next();

    const url = new URL('/coach-secret-login', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/coach/:path*'],
};
