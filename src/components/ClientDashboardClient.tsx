"use client";

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Session = { role: 'client' | 'coach'; name?: string; ts?: number } | null;

export default function ClientDashboardClient() {
  const [session, setSession] = useState<Session>(null);
  const router = useRouter();
  const { data: sess } = useSession();

  useEffect(() => {
    const raw = sess as unknown as { user?: { name?: string; role?: string } } | null;
    const user = raw?.user ?? null;
    if (user && (user.role === 'coach' || user.role === 'client')) {
      setSession({ role: user.role as 'coach' | 'client', name: user.name });
    } else {
      setSession(null);
    }
  }, [sess]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card max-w-md text-center">
          <p className="muted">You are not signed in.</p>
          <div className="mt-4">
            <button className="btn-primary" onClick={() => router.push('/login')}>Go to login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {session.name}</h1>
          <div>
            <button className="btn-ghost mr-2" onClick={() => { signOut({ callbackUrl: '/login' }); }}>Sign out</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-medium">Upcoming Session</h3>
            <p className="muted">Friday, Dec 20 at 10:00 AM</p>
          </div>

          <div className="card">
            <h3 className="font-medium">Your Plan</h3>
            <p className="muted">Personalized nutrition and activity plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
