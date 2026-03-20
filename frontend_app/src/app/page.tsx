"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * HomePage - Root page that redirects authenticated users to the dashboard.
 *
 * Contract:
 * - If authenticated: redirect to /dashboard
 * - If not authenticated: AuthGate is already rendered by ClientApp
 */
// PUBLIC_INTERFACE
export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center animate-fade-in">
        <div className="w-10 h-10 border-[3px] border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[var(--color-text-muted)] font-medium">Loading...</p>
      </div>
    </div>
  );
}
