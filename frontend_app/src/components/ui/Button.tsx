"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] active:bg-[var(--color-accent-dark)] shadow-sm hover:shadow-md",
  secondary:
    "bg-[var(--color-hover)] text-[var(--color-text)] hover:bg-[var(--color-border)] active:bg-[var(--color-border)]",
  outline:
    "border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-hover)] active:bg-[var(--color-hover)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]",
  danger:
    "bg-[var(--color-error)] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-2.5 text-sm gap-2",
};

/**
 * Button - Reusable button component with variant and size support.
 *
 * Contract:
 * - variant: visual style (primary, secondary, outline, ghost, danger)
 * - size: sm, md, lg
 * - loading: shows loading state and disables interaction
 */
// PUBLIC_INTERFACE
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.97]
        ${variantStyles[variant]} ${sizeStyles[size]}
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
