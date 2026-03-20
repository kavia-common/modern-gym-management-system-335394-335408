"use client";

import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ToastProvider } from "@/context/ToastContext";

/**
 * Providers - Composes all application context providers.
 *
 * Provider order (outermost to innermost):
 * 1. ThemeProvider (affects all UI)
 * 2. AuthProvider (determines auth state)
 * 3. SidebarProvider (layout state)
 * 4. ToastProvider (notifications)
 */
// PUBLIC_INTERFACE
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
