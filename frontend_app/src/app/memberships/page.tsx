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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Membership Plans</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Choose the plan that fits your needs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl border bg-[var(--color-surface)] p-6 flex flex-col transition-shadow hover:shadow-md
              ${plan.popular ? "border-[#16A34A] ring-1 ring-[#16A34A]" : "border-[var(--color-border)]"}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="success" className="flex items-center gap-1">
                  <Star size={10} />
                  Popular
                </Badge>
              </div>
            )}
            <h3 className="text-lg font-bold text-[var(--color-text)] mt-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-[var(--color-text)]">${plan.price}</span>
              <span className="text-sm text-[var(--color-text-secondary)]">/ {plan.duration.toLowerCase()}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-text-secondary)]">
              <Users size={12} />
              {plan.activeMembers} active members
            </div>
            <ul className="mt-4 flex-1 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                  <Check size={14} className="text-[#16A34A] flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full mt-4"
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
