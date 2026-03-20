"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import AuthGate from "@/components/auth/AuthGate";
import AppShell from "@/components/layout/AppShell";

/**
 * ClientApp - Root client-side component that switches between auth and app views.
 *
 * Contract:
 * - If user is not authenticated: renders AuthGate (login/register/forgot)
 * - If user is authenticated: renders AppShell with children (page content)
 * - Single decision point for authenticated vs unauthenticated UI
 */
// PUBLIC_INTERFACE
export default function ClientApp({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthGate />;
  }

  return <AppShell>{children}</AppShell>;
}
