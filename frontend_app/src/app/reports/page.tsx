"use client";

import React, { useState } from "react";
import {
  REVENUE_CHART_DATA,
  WEEKLY_ATTENDANCE,
  HOURLY_TRAFFIC,
  MEMBERSHIP_DISTRIBUTION,
  DASHBOARD_STATS,
} from "@/data/mockData";
import StatsCard from "@/components/ui/StatsCard";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";

type ReportTab = "overview" | "revenue" | "attendance" | "membership";

/**
 * ReportsPage - Analytics and reporting dashboard with multiple chart views.
 *
 * Contract:
 * - Displays tabbed report sections: overview, revenue, attendance, membership
 * - Each tab shows relevant charts and statistics
 * - All data is mock/static
 */
// PUBLIC_INTERFACE
export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>("overview");

  const tabs: { key: ReportTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "revenue", label: "Revenue" },
    { key: "attendance", label: "Attendance" },
    { key: "membership", label: "Membership" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Reports</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Detailed analytics and insights</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--color-border)] pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
              ${activeTab === tab.key
                ? "border-[#16A34A] text-[#16A34A]"
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="Total Members" value={DASHBOARD_STATS.totalMembers} change={DASHBOARD_STATS.membershipGrowth} icon={<Users size={20} className="text-[var(--color-text-secondary)]" />} />
            <StatsCard title="Monthly Revenue" value={`$${DASHBOARD_STATS.monthlyRevenue.toLocaleString()}`} change={DASHBOARD_STATS.revenueGrowth} icon={<DollarSign size={20} className="text-[var(--color-text-secondary)]" />} />
            <StatsCard title="Attendance Rate" value={`${DASHBOARD_STATS.attendanceRate}%`} change={3.2} icon={<Activity size={20} className="text-[var(--color-text-secondary)]" />} />
            <StatsCard title="New Members" value={DASHBOARD_STATS.newMembersThisMonth} change={15} icon={<TrendingUp size={20} className="text-[var(--color-text-secondary)]" />} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Revenue Trend</h2>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text)" }} />
                    <Area type="monotone" dataKey="revenue" stroke="#16A34A" fill="#16A34A" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Weekly Attendance</h2>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WEEKLY_ATTENDANCE}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text)" }} />
                    <Bar dataKey="count" fill="#111827" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Monthly Revenue</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REVENUE_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text)" }} />
                  <Line type="monotone" dataKey="revenue" stroke="#16A34A" strokeWidth={2} dot={{ fill: "#16A34A", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Revenue by Plan</h2>
            <div className="space-y-3">
              {[
                { plan: "Premium", revenue: 5440, percentage: 44 },
                { plan: "Standard", revenue: 4400, percentage: 35 },
                { plan: "Basic", revenue: 2610, percentage: 21 },
              ].map((item) => (
                <div key={item.plan} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-[var(--color-text)] w-20">{item.plan}</span>
                  <div className="flex-1 h-2.5 bg-[var(--color-hover)] rounded-full overflow-hidden">
                    <div className="h-full bg-[#16A34A] rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-text)] w-20 text-right">${item.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Hourly Traffic</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HOURLY_TRAFFIC}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="hour" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text)" }} />
                  <Bar dataKey="visitors" fill="#16A34A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Weekly Attendance Pattern</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_ATTENDANCE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text)" }} />
                  <Area type="monotone" dataKey="count" stroke="#111827" fill="#111827" fillOpacity={0.08} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Membership Tab */}
      {activeTab === "membership" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Plan Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MEMBERSHIP_DISTRIBUTION} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                      {MEMBERSHIP_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {MEMBERSHIP_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-[var(--color-text-secondary)]">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Member Growth</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: "Jul", members: 120 },
                    { month: "Aug", members: 128 },
                    { month: "Sep", members: 135 },
                    { month: "Oct", members: 140 },
                    { month: "Nov", members: 148 },
                    { month: "Dec", members: 157 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                    <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-text)" }} />
                    <Line type="monotone" dataKey="members" stroke="#16A34A" strokeWidth={2} dot={{ fill: "#16A34A", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Retention Rate by Plan</h2>
            <div className="space-y-4">
              {[
                { plan: "Premium", rate: 92 },
                { plan: "Standard", rate: 85 },
                { plan: "Basic", rate: 68 },
              ].map((item) => (
                <div key={item.plan}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--color-text)]">{item.plan}</span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">{item.rate}%</span>
                  </div>
                  <div className="h-2 bg-[var(--color-hover)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.rate}%`,
                        backgroundColor: item.rate >= 90 ? "#16A34A" : item.rate >= 80 ? "#F59E0B" : "#EF4444",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
