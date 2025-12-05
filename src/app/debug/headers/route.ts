import { NextResponse } from 'next/server';

// Dev-only helper: returns the raw request headers and a parsed cookies object.
// Usage: GET /debug/headers
// Safety: blocked in production (returns 403).
export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  const headersObj = Object.fromEntries(Array.from(request.headers.entries()));

  const cookieHeader = headersObj.cookie ?? '';
  const cookies = cookieHeader
    ? Object.fromEntries(
        cookieHeader
          .split('; ')
          .filter(Boolean)
          .map((c) => {
            const idx = c.indexOf('=');
            if (idx === -1) return [c, ''];
            const k = c.slice(0, idx);
            const v = c.slice(idx + 1);
            try {
              return [k, decodeURIComponent(v)];
            } catch {
              return [k, v];
            }
          })
      )
    : {};

  return NextResponse.json({ headers: headersObj, cookies });
}
