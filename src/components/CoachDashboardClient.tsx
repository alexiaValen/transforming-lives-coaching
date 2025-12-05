"use client";

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Session = { role: 'client' | 'coach'; name?: string; ts?: number } | null;

export default function CoachDashboardClient() {
  const [session, setSession] = useState<Session>(null);
  const router = useRouter();
  const { data: sess } = useSession();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const raw = sess as unknown as { user?: { name?: string; role?: string } } | null;
    const user = raw?.user ?? null;
    if (user && (user.role === 'coach' || user.role === 'client')) {
      setSession({ role: user.role as 'coach' | 'client', name: user.name });
    } else {
      setSession(null);
    }
  }, [sess]);

  if (!session || session.role !== 'coach') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card max-w-md text-center">
          <p className="muted">Coach access required.</p>
          <div className="mt-4">
            <button className="btn-primary" onClick={() => router.push('/coach-secret-login')}>Enter secret</button>
          </div>
        </div>
      </div>
    );
  }

  // Mock clients list
  const clients = [
    { id: 1, name: 'Jane Doe', lastSession: 'Nov 18' },
    { id: 2, name: 'John Smith', lastSession: 'Nov 20' },
  ];
  const filtered = clients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Coach Dashboard</h1>
          <div>
            <button
              className="btn-ghost"
              onClick={async () => {
                try {
                  await signOut({ redirect: true, callbackUrl: '/coach-secret-login' });
                } catch {
                  router.push('/coach-secret-login');
                }
              }}
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="card mb-6">
          <div className="flex items-center space-x-4">
            <input
              aria-label="Search clients"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clients..."
              className="flex-1 p-3 rounded-lg bg-white/3"
            />
            <div className="text-sm muted">{filtered.length} clients</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {filtered.map((c) => (
              <div key={c.id} className="p-4 bg-white/3 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center font-semibold">{c.name.split(' ').map((s) => s[0]).join('').slice(0,2)}</div>
                  <div>
                    <div className="font-medium text-lg">{c.name}</div>
                    <div className="text-sm muted">Last session: {c.lastSession}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/coach/clients/${c.id}`} className="btn-ghost">View</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <div className="flex flex-col space-y-2">
              <button className="btn-primary">Start Video</button>
              <button className="btn-ghost">Export Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
