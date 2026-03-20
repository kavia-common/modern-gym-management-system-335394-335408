"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Dumbbell } from "lucide-react";

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
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-xl bg-[#16A34A] text-white mb-4">
            <Dumbbell size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Welcome to GymPro</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Sign in to manage your gym</p>
        </div>

        {/* Form */}
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <p className="text-sm text-[#EF4444]" role="alert">{error}</p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          <button
            onClick={onSwitchToForgot}
            className="w-full text-sm text-[#16A34A] hover:underline mt-3 text-center"
          >
            Forgot password?
          </button>

          {/* Demo quick access */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
            <p className="text-xs text-center text-[var(--color-text-secondary)] mb-3">Quick demo access</p>
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

        <p className="text-center text-sm text-[var(--color-text-secondary)] mt-4">
          Don&apos;t have an account?{" "}
          <button onClick={onSwitchToRegister} className="text-[#16A34A] hover:underline font-medium">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
