"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Dumbbell, ArrowRight } from "lucide-react";

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onSwitchToForgot: () => void;
}

/**
 * LoginPage - Authentication login screen with role-based demo access.
 *
 * Contract:
 * - Calls auth.login on submit
 * - Provides quick-login buttons for demo roles
 * - onSwitchToRegister/onSwitchToForgot: navigation callbacks
 */
// PUBLIC_INTERFACE
export default function LoginPage({ onSwitchToRegister, onSwitchToForgot }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) setError("Invalid credentials");
  };

  const handleDemoLogin = async (role: UserRole) => {
    setLoading(true);
    const emails: Record<UserRole, string> = {
      admin: "admin@gym.com",
      trainer: "trainer@gym.com",
      member: "member@gym.com",
    };
    await login(emails[role], "demo123", role);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />

      <div className="w-full max-w-[420px] relative animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 rounded-2xl gradient-accent text-white mb-5 shadow-lg shadow-emerald-500/20">
            <Dumbbell size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Welcome back</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1.5">Sign in to your GymPro account</p>
        </div>

        {/* Form Card */}
        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-7 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? "Email is required" : undefined}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error && !password ? "Password is required" : undefined}
            />

            {error && email && password && (
              <p className="text-sm text-[var(--color-error)] bg-[var(--color-error)]/5 px-3 py-2 rounded-xl" role="alert">{error}</p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Sign In
              <ArrowRight size={16} />
            </Button>
          </form>

          <button
            onClick={onSwitchToForgot}
            className="w-full text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium mt-4 text-center transition-colors"
          >
            Forgot password?
          </button>

          {/* Demo quick access */}
          <div className="mt-6 pt-6 border-t border-[var(--color-divider)]">
            <p className="text-[11px] text-center text-[var(--color-text-muted)] mb-3 uppercase tracking-wider font-medium">Quick demo access</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDemoLogin("admin")}>
                Admin
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDemoLogin("trainer")}>
                Trainer
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDemoLogin("member")}>
                Member
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Don&apos;t have an account?{" "}
          <button onClick={onSwitchToRegister} className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-semibold transition-colors">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
