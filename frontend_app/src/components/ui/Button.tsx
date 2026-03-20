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
  primary: "bg-[#111827] text-white hover:bg-[#1F2937] dark:bg-[#16A34A] dark:hover:bg-[#15803D]",
  secondary: "bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB] dark:bg-[#374151] dark:text-[#F9FAFB] dark:hover:bg-[#4B5563]",
  outline: "border border-[#E5E7EB] bg-transparent text-[#111827] hover:bg-[#F3F4F6] dark:border-[#374151] dark:text-[#F9FAFB] dark:hover:bg-[#374151]",
  ghost: "bg-transparent text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] dark:hover:bg-[#374151] dark:hover:text-[#F9FAFB]",
  danger: "bg-[#EF4444] text-white hover:bg-[#DC2626]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
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
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-150 
        ${variantStyles[variant]} ${sizeStyles[size]}
        disabled:opacity-50 disabled:cursor-not-allowed
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
