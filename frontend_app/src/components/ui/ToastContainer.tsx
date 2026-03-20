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
  success: "border-[#16A34A] bg-[#16A34A]/5",
  error: "border-[#EF4444] bg-[#EF4444]/5",
  info: "border-[#3B82F6] bg-[#3B82F6]/5",
  warning: "border-[#F59E0B] bg-[#F59E0B]/5",
};

const iconColorMap = {
  success: "text-[#16A34A]",
  error: "text-[#EF4444]",
  info: "text-[#3B82F6]",
  warning: "text-[#F59E0B]",
};

/**
 * ToastContainer - Renders the stack of active toast notifications.
 * Positioned fixed at bottom-right of viewport.
 */
// PUBLIC_INTERFACE
export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-3 rounded-lg border shadow-md bg-[var(--color-surface)] ${colorMap[toast.type]} animate-slide-in`}
          >
            <Icon size={18} className={`mt-0.5 flex-shrink-0 ${iconColorMap[toast.type]}`} />
            <p className="text-sm flex-1 text-[var(--color-text)]">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 rounded hover:bg-[var(--color-hover)] transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={14} className="text-[var(--color-text-secondary)]" />
            </button>
          </div>
        );
      })}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
