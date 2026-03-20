import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import ClientApp from "@/components/ClientApp";

export const metadata: Metadata = {
  title: "GymPro – Gym Management System",
  description: "Modern gym management application with dashboards, member management, scheduling, and analytics.",
};

/**
 * RootLayout - Application root layout.
 *
 * Contract:
 * - Wraps all pages with Providers (theme, auth, sidebar, toast)
 * - Uses ClientApp to switch between auth gate and app shell
 * - suppressHydrationWarning for theme attribute changes
 */
// PUBLIC_INTERFACE
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <ClientApp>{children}</ClientApp>
        </Providers>
      </body>
    </html>
  );
}
