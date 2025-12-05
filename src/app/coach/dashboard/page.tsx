import CoachDashboardClient from '@/components/CoachDashboardClient';

export const dynamic = 'force-dynamic';

export default function CoachDashboardPage() {
  // Server component shell - renders client-only dashboard
  return <CoachDashboardClient />;
}
