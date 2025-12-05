import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { NextAuthOptions } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions as unknown as NextAuthOptions);

  // Role redirects (cast to any to avoid strict Session typing issues)
  if ((session as any)?.user?.role === 'coach') {
    redirect('/coach/dashboard');
  }

  if ((session as any)?.user?.role === 'client') {
    redirect('/client/dashboard');
  }

  // Unauthenticated UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md border border-emerald-100 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          Transforming Lives Coaching
        </h1>

        <p className="text-emerald-600 mb-6">
          Personalized functional coaching and simple tracking. Please choose your entry:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/login"
            className="block text-center bg-emerald-600 text-white py-3 px-4 rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Client Login
          </Link>

          <Link
            href="/coach-secret-login"
            className="block text-center bg-emerald-50 border border-emerald-200 text-emerald-800 py-3 px-4 rounded-lg shadow-sm hover:bg-emerald-100 transition"
          >
            Coach Access
          </Link>
        </div>

        <p className="text-sm text-emerald-500 mt-6">
          Coaches: access is intentionally less prominent. Use your secret to sign in.
        </p>
      </div>
    </div>
  );
}