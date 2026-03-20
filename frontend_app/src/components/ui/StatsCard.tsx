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
    if (change === undefined || change === 0) return "text-[var(--color-text-muted)]";
    return change > 0 ? "text-[var(--color-accent)]" : "text-[var(--color-error)]";
  };

  const getTrendBg = () => {
    if (change === undefined || change === 0) return "bg-[var(--color-hover)]";
    return change > 0 ? "bg-[var(--color-accent)]/10" : "bg-[var(--color-error)]/10";
  };

  const TrendIcon = () => {
    if (change === undefined || change === 0) return <Minus size={12} />;
    return change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />;
  };

  return (
    <div className="card-elevated p-5 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)] mb-2">{title}</p>
          <p className="text-2xl font-bold text-[var(--color-text)] tracking-tight">{value}</p>
          {change !== undefined && (
            <div className={`inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-lg text-[11px] font-semibold ${getTrendColor()} ${getTrendBg()}`}>
              <TrendIcon />
              <span>{change > 0 ? "+" : ""}{change}%</span>
              {changeLabel && <span className="text-[var(--color-text-muted)] font-normal ml-0.5">{changeLabel}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-[var(--color-accent)]/8 text-[var(--color-accent)] transition-transform duration-200 group-hover:scale-110">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
