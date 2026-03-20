"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { Dumbbell, ArrowLeft, CheckCircle, Send } from "lucide-react";

interface ForgotPasswordPageProps {
  onSwitchToLogin: () => void;
}

/**
 * ForgotPasswordPage - Password reset request form.
 *
 * Contract:
 * - Calls auth.forgotPassword on submit
 * - Shows success state after submission
 * - onSwitchToLogin: navigation callback
 */
// PUBLIC_INTERFACE
export default function ForgotPasswordPage({ onSwitchToLogin }: ForgotPasswordPageProps) {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setLoading(true);
    setError("");
    const ok = await forgotPassword(email);
    setLoading(false);
    if (ok) {
      setSent(true);
    } else {
      setError("Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="fixed inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />

      <div className="w-full max-w-[420px] relative animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 rounded-2xl gradient-accent text-white mb-5 shadow-lg shadow-emerald-500/20">
            <Dumbbell size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Reset Password</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1.5">
            {sent ? "Check your email" : "Enter your email to receive a reset link"}
          </p>
        </div>

        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-7 shadow-lg">
          {sent ? (
            <div className="text-center py-6">
              <div className="inline-flex p-4 rounded-2xl bg-[var(--color-accent)]/10 mb-5">
                <CheckCircle size={40} className="text-[var(--color-accent)]" />
              </div>
              <p className="text-sm text-[var(--color-text)]">
                We&apos;ve sent a password reset link to <strong>{email}</strong>.
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                Check your inbox and follow the instructions.
              </p>
              <Button variant="outline" className="w-full mt-6" onClick={onSwitchToLogin}>
                Back to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error || undefined}
              />
              <Button type="submit" loading={loading} className="w-full">
                Send Reset Link
                <Send size={15} />
              </Button>
            </form>
          )}
        </div>

        <button
          onClick={onSwitchToLogin}
          className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] mx-auto mt-6 transition-colors font-medium"
        >
          <ArrowLeft size={14} />
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
