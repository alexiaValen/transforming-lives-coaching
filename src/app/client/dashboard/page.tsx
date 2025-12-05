import ClientDashboardClient from '@/components/ClientDashboardClient';

export const dynamic = 'force-dynamic';

export default function ClientDashboardPage() {
  // Server component shell that renders the client-only dashboard UI
  return <ClientDashboardClient />;
}
