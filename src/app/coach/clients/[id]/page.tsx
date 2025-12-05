'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export const dynamic = 'force-dynamic';

interface ClientDetail {
  id: string;
  name: string;
  age: number;
  lastSession: string;
  metrics: { weight: number; glucose: number; sleepHrs: number };
  notes: Array<{ date: string; text: string }>;
  sessions: Array<{ id: string; date: string; type: string }>;
}

export default function ClientPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/coach/clients/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setClient(d.client);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function messageClient() {
    // placeholder: open mailto with subject
    if (!client) return;
    const subject = encodeURIComponent(`Follow up: ${client.name}`);
    window.location.href = `mailto:?subject=${subject}`;
  }

  function exportData() {
    if (!client) return;
    const blob = new Blob([JSON.stringify(client, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${client.name.replace(/\s+/g, '_')}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading)
    return (
      <div className="min-h-screen p-6">
        <div className="card max-w-md mx-auto">Loading...</div>
      </div>
    );
  if (!client)
    return (
      <div className="min-h-screen p-6">
        <div className="card max-w-md mx-auto">Client not found or unauthorized.</div>
      </div>
    );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{client.name}</h1>
            <p className="muted">Last session: {client.lastSession}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-ghost" onClick={() => router.back()}>
              Back
            </button>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <h3 className="font-medium mb-2">Key Metrics</h3>
            <div className="text-sm muted">Weight: {client.metrics.weight} lbs</div>
            <div className="text-sm muted">Glucose: {client.metrics.glucose} mg/dL</div>
            <div className="text-sm muted">Sleep: {client.metrics.sleepHrs} hrs</div>

            <div className="mt-4 flex space-x-2">
              <button className="btn-primary" onClick={messageClient}>
                Message
              </button>
              <button className="btn-ghost" onClick={exportData}>
                Export
              </button>
            </div>
          </div>

          <div className="card md:col-span-2">
            <h3 className="font-medium mb-2">Recent Notes</h3>
            <ul className="space-y-2 text-sm">
              {client.notes.map((n) => (
                <li key={n.date} className="p-3 bg-white/3 rounded-lg">
                  <div className="text-xs muted">{n.date}</div>
                  <div className="mt-1">{n.text}</div>
                </li>
              ))}
            </ul>

            <h3 className="font-medium mt-4 mb-2">Sessions</h3>
            <ul className="space-y-2 text-sm">
              {client.sessions.map((s) => (
                <li key={s.id} className="p-3 bg-white/3 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.type}</div>
                    <div className="text-xs muted">{s.date}</div>
                  </div>
                  <div>
                    <button className="btn-primary">Open</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
