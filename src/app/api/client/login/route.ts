export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret';

function sign(raw: string) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(raw).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name required' }, { status: 400 });
    }

    const session = { role: 'client', name, ts: Date.now() };
    const raw = JSON.stringify(session);
    const sig = sign(raw);
    const cookieVal = `${Buffer.from(raw).toString('base64')}.${sig}`;

    const res = NextResponse.json({ ok: true });
    res.cookies.set('tl_session', cookieVal, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
