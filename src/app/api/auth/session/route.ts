export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret';

function verify_cookie(cookie: string | undefined) {
  if (!cookie) return null;
  const [b64, sig] = cookie.split('.');
  if (!b64 || !sig) return null;
  try {
    const raw = Buffer.from(b64, 'base64').toString('utf8');
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(raw).digest('hex');
    if (expected !== sig) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('tl_session')?.value;
  const session = verify_cookie(cookie);
  if (!session) return NextResponse.json({ session: null });
  return NextResponse.json({ session });
}
