import type { Metadata } from "next";
import "./globals.css";
import CoachGlobalLogout from '@/components/CoachGlobalLogout';
import AuthProvider from '@/components/AuthProvider';
import { getServerSession, type NextAuthOptions, type Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }

// Using system font stack to avoid remote font fetch during build
const systemClass = "font-sans";

export const metadata: Metadata = {
  title: "Transforming Lives Coaching",
  description: "Client coaching dashboard and tools — secure coach login and client progress tracking.",
};

// Prevent static prerendering of pages that rely on client-session hooks
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getServerSession(authOptions as unknown as NextAuthOptions)) as Session | null;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="theme-color" content="#0F766E" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className={`${systemClass} antialiased`}>
        <div className="min-h-screen">
          <AuthProvider session={session}>
            <CoachGlobalLogout />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}