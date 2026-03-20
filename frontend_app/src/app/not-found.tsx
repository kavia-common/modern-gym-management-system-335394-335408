import React from "react";
import Link from "next/link";

/**
 * NotFound - 404 page for unmatched routes.
 */
// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-text)] mb-2">404</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-[#16A34A] text-white text-sm font-medium hover:bg-[#15803D] transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
