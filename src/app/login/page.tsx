"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function ClientLogin() {
  const [name, setName] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    signIn('credentials', { role: 'client', name: name.trim(), redirect: false }).then(() => {
      router.push('/client/dashboard');
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Client Login</h2>
        <p className="muted mb-4">Sign in to access your wellness plan and video sessions.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Full name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md p-2 bg-white/3"
              placeholder="Jane Doe"
            />
          </label>
          <button type="submit" className="btn-primary w-full">Sign in</button>
        </form>
      </div>
    </div>
  );
}
