import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const runtime = 'edge';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'dev-nextauth-secret';

export async function GET(req: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  const token = await getToken({ req, secret: NEXTAUTH_SECRET });
  if (!token || token.role !== 'coach') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // params may be provided directly or as a Promise depending on runtime/types; normalize it
  const rawParams = await Promise.resolve(context.params as unknown as { id: string } | Promise<{ id: string }>);
  const id = rawParams?.id;
  // Mocked client data (replace with real DB fetch)
  const client = {
    id,
    name: id === '1' ? 'Jane Doe' : 'John Smith',
    age: id === '1' ? 34 : 42,
    lastSession: id === '1' ? 'Nov 18' : 'Nov 20',
    metrics: {
      weight: id === '1' ? 145 : 182,
      glucose: id === '1' ? 95 : 110,
      sleepHrs: id === '1' ? 7.2 : 6.5,
    },
    notes: [
      { date: '2025-11-18', text: 'Good energy this week; recommended increase in protein.' },
      { date: '2025-10-30', text: 'Discussed sleep hygiene and evening routine.' }
    ],
    sessions: [
      { id: 's1', date: '2025-11-18', type: 'Wellness Consultation' },
      { id: 's2', date: '2025-10-20', type: 'Nutrition Review' }
    ]
  };

  return NextResponse.json({ client });
}
