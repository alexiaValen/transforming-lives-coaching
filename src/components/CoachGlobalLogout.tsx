"use client";

import { useSession, signOut } from 'next-auth/react';

export default function CoachGlobalLogout() {
  const { data: sess } = useSession();

  const user = (sess as unknown as { user?: { role?: string } } | null)?.user;
  const isCoach = user?.role === 'coach';

  if (!isCoach) return null;

  async function handleLogout() {
    try {
      await signOut({ redirect: true, callbackUrl: '/coach-secret-login' });
    } catch {
      window.location.href = '/coach-secret-login';
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button className="btn-ghost" onClick={handleLogout}>Coach Logout</button>
    </div>
  );
}
