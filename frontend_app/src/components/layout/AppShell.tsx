"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ToastContainer from "@/components/ui/ToastContainer";

/**
 * AppShell - Main application layout with modern sidebar + topbar + content area.
 *
 * Contract:
 * - Renders sidebar on left, topbar on top, children in main content area.
 * - Provides skip-to-content accessibility link.
 * - Responsive layout with smooth transitions.
 */
// PUBLIC_INTERFACE
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Topbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
