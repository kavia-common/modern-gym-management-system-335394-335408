"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { Dumbbell, ArrowRight } from "lucide-react";

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

/**
 * RegisterPage - New user registration form with modern design.
 *
 * Contract:
 * - Calls auth.register on submit
 * - Validates all fields before submission
 * - onSwitchToLogin: navigation callback to login page
 */
// PUBLIC_INTERFACE
export default function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const ok = await register(name, email, password);
    setLoading(false);
    if (!ok) setError("Registration failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="fixed inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />

      <div className="w-full max-w-[420px] relative animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 rounded-2xl gradient-accent text-white mb-5 shadow-lg shadow-emerald-500/20">
            <Dumbbell size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">Create Account</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1.5">Join GymPro today</p>
        </div>

        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-7 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="At least 6 characters"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <p className="text-sm text-[var(--color-error)] bg-[var(--color-error)]/5 px-3 py-2 rounded-xl" role="alert">{error}</p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Create Account
              <ArrowRight size={16} />
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-semibold transition-colors">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
