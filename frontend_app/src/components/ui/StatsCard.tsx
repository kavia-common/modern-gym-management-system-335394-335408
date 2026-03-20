"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
}

/**
 * StatsCard - Dashboard analytics card showing a metric with optional trend.
 *
 * Contract:
 * - title: metric label
 * - value: metric value
 * - change: percentage change (positive = up, negative = down)
 * - icon: optional icon element
 */
// PUBLIC_INTERFACE
export default function StatsCard({ title, value, change, changeLabel, icon }: StatsCardProps) {
  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-[var(--color-text-secondary)]";
    return change > 0 ? "text-[#16A34A]" : "text-[#EF4444]";
  };

  const TrendIcon = () => {
    if (change === undefined || change === 0) return <Minus size={14} />;
    return change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">{title}</p>
          <p className="text-2xl font-bold text-[var(--color-text)]">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${getTrendColor()}`}>
              <TrendIcon />
              <span>{change > 0 ? "+" : ""}{change}%</span>
              {changeLabel && <span className="text-[var(--color-text-secondary)] font-normal">• {changeLabel}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2.5 rounded-lg bg-[var(--color-hover)]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
