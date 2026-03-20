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
        <label htmlFor={inputId} className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2 rounded-lg text-sm transition-colors duration-150
          border ${error ? "border-[#EF4444]" : "border-[var(--color-border)]"}
          bg-[var(--color-surface)] text-[var(--color-text)]
          placeholder:text-[var(--color-text-secondary)]
          focus:outline-none focus:ring-2 ${error ? "focus:ring-[#EF4444]" : "focus:ring-[#16A34A]"}
          ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-[#EF4444]" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
