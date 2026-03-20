"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input - Reusable input with label, error, and helper text support.
 *
 * Contract:
 * - label: optional visible label
 * - error: displays error message and error styling
 * - helperText: displays helper text below input
 * - All standard input attributes are forwarded
 */
// PUBLIC_INTERFACE
export default function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-") || "field"}`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200
          border ${error ? "border-[var(--color-error)]" : "border-[var(--color-border)]"}
          bg-[var(--color-surface)] text-[var(--color-text)]
          placeholder:text-[var(--color-text-muted)]
          hover:border-[var(--color-secondary)]/50
          focus:outline-none focus:ring-2 ${error ? "focus:ring-[var(--color-error)]/20 focus:border-[var(--color-error)]" : "focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)]"}
          ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-[var(--color-error)] flex items-center gap-1" role="alert">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M6 3v3.5M6 8h.01"/>
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-xs text-[var(--color-text-muted)]">
          {helperText}
        </p>
      )}
    </div>
  );
}
