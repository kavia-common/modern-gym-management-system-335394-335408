"use client";

import React from "react";

type BadgeVariant = "success" | "error" | "warning" | "info" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-600 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  error: "bg-red-50 text-red-600 ring-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
  warning: "bg-amber-50 text-amber-600 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  info: "bg-blue-50 text-blue-600 ring-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/20",
  default: "bg-[var(--color-hover)] text-[var(--color-text-secondary)] ring-[var(--color-border)]",
};

/**
 * Badge - Small status indicator / label with modern pill design.
 */
// PUBLIC_INTERFACE
export default function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ring-1 ring-inset ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
