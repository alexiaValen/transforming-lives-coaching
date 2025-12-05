"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function CoachSecretLogin() {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await signIn('credentials', { role: 'coach', name: 'Coach', secret: pass, redirect: false });
      const result = res as unknown as { error?: string } | undefined;
      if (!result) {
        setError('Invalid response');
        return;
      }
      if (!result.error) {
        router.push('/coach/dashboard');
      } else {
        setError('Invalid secret');
      }
    } catch {
      setError('Network error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Coach Access</h2>
        <p className="muted mb-4">Enter the secret to unlock coach insights.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Secret</span>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              className="mt-1 block w-full rounded-md p-2 bg-white/3"
              placeholder="Secret"
            />
          </label>
          {error && <div className="text-sm text-red-400">{error}</div>}
          <button type="submit" className="btn-primary w-full">Enter</button>
        </form>
      </div>
    </div>
  );
}
