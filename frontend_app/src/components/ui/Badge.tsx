"use client";

import React from "react";

type BadgeVariant = "success" | "error" | "warning" | "info" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20",
  error: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20",
  warning: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
  info: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20",
  default: "bg-[var(--color-hover)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
};

/**
 * Badge - Small status indicator / label.
 */
// PUBLIC_INTERFACE
export default function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
