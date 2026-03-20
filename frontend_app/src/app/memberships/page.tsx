"use client";

import React from "react";
import { MOCK_PLANS } from "@/data/mockData";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/context/ToastContext";
import { Check, Users, Star } from "lucide-react";

/**
 * MembershipsPage - Displays membership plans with pricing cards.
 *
 * Contract:
 * - Displays plans in pricing card layout
 * - Highlights the popular plan
 * - Mock subscribe action
 */
// PUBLIC_INTERFACE
export default function MembershipsPage() {
  const { addToast } = useToast();

  const handleSubscribe = (planName: string) => {
    addToast("success", `Subscribed to ${planName} plan!`);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-[var(--color-text)] tracking-tight">Membership Plans</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">Choose the plan that fits your fitness goals and budget</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {MOCK_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border bg-[var(--color-surface)] p-6 flex flex-col transition-all duration-300 hover:shadow-lg
              ${plan.popular ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/20 shadow-[var(--shadow-glow)]" : "border-[var(--color-border)] hover:border-[var(--color-accent)]/30"}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="success" className="flex items-center gap-1 shadow-sm">
                  <Star size={10} />
                  Popular
                </Badge>
              </div>
            )}
            <h3 className="text-lg font-bold text-[var(--color-text)] mt-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-3xl font-bold text-[var(--color-text)] tracking-tight">${plan.price}</span>
              <span className="text-sm text-[var(--color-text-muted)]">/ {plan.duration.toLowerCase()}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-text-muted)]">
              <Users size={12} />
              {plan.activeMembers} active members
            </div>
            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm text-[var(--color-text)]">
                  <div className="w-4 h-4 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-[var(--color-accent)]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full mt-5"
              variant={plan.popular ? "primary" : "outline"}
              onClick={() => handleSubscribe(plan.name)}
            >
              Subscribe
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
