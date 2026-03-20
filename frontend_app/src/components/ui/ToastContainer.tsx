"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: "border-l-emerald-500 bg-emerald-50/80 dark:bg-emerald-500/10",
  error: "border-l-red-500 bg-red-50/80 dark:bg-red-500/10",
  info: "border-l-blue-500 bg-blue-50/80 dark:bg-blue-500/10",
  warning: "border-l-amber-500 bg-amber-50/80 dark:bg-amber-500/10",
};

const iconColorMap = {
  success: "text-emerald-500",
  error: "text-red-500",
  info: "text-blue-500",
  warning: "text-amber-500",
};

/**
 * ToastContainer - Renders the stack of active toast notifications.
 * Positioned fixed at bottom-right of viewport with modern styling.
 */
// PUBLIC_INTERFACE
export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg backdrop-blur-sm bg-[var(--color-surface)]/95 ${colorMap[toast.type]} animate-slide-in-toast`}
          >
            <Icon size={18} className={`mt-0.5 flex-shrink-0 ${iconColorMap[toast.type]}`} />
            <p className="text-sm flex-1 text-[var(--color-text)] font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-[var(--color-hover)] transition-colors flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <X size={14} className="text-[var(--color-text-muted)]" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
