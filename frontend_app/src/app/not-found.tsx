import React from "react";
import Link from "next/link";

/**
 * NotFound - 404 page for unmatched routes with modern design.
 */
// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="text-center animate-fade-in-up">
        <div className="text-8xl font-bold text-[var(--color-accent)] opacity-20 mb-4 tracking-tighter">404</div>
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2 tracking-tight">Page Not Found</h1>
        <p className="text-[var(--color-text-muted)] mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-6 py-2.5 rounded-xl gradient-accent text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 active:scale-[0.97]"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
