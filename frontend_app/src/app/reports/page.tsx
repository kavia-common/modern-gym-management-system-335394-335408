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

const chartTooltipStyle = {
  backgroundColor: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "12px",
  color: "var(--color-text)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-[var(--color-text)] tracking-tight">Reports</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Detailed analytics and insights</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap
              ${activeTab === tab.key
                ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-hover)]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <StatsCard title="Total Members" value={DASHBOARD_STATS.totalMembers} change={DASHBOARD_STATS.membershipGrowth} icon={<Users size={20} />} />
            <StatsCard title="Monthly Revenue" value={`$${DASHBOARD_STATS.monthlyRevenue.toLocaleString()}`} change={DASHBOARD_STATS.revenueGrowth} icon={<DollarSign size={20} />} />
            <StatsCard title="Attendance Rate" value={`${DASHBOARD_STATS.attendanceRate}%`} change={3.2} icon={<Activity size={20} />} />
            <StatsCard title="New Members" value={DASHBOARD_STATS.newMembersThisMonth} change={15} icon={<TrendingUp size={20} />} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <div className="card-elevated p-5 sm:p-6">
              <h2 className="text-[var(--color-text)] mb-5">Revenue Trend</h2>
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_CHART_DATA}>
                    <defs><linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="url(#rg1)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card-elevated p-5 sm:p-6">
              <h2 className="text-[var(--color-text)] mb-5">Weekly Attendance</h2>
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WEEKLY_ATTENDANCE}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === "revenue" && (
        <div className="space-y-5 sm:space-y-6">
          <div className="card-elevated p-5 sm:p-6">
            <h2 className="text-[var(--color-text)] mb-5">Monthly Revenue</h2>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={REVENUE_CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2.5} dot={{ fill: "#10B981", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card-elevated p-5 sm:p-6">
            <h2 className="text-[var(--color-text)] mb-5">Revenue by Plan</h2>
            <div className="space-y-4">
              {[
                { plan: "Premium", revenue: 5440, percentage: 44 },
                { plan: "Standard", revenue: 4400, percentage: 35 },
                { plan: "Basic", revenue: 2610, percentage: 21 },
              ].map((item) => (
                <div key={item.plan} className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-[var(--color-text)] w-20">{item.plan}</span>
                  <div className="flex-1 h-3 bg-[var(--color-hover)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-700" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="text-sm font-bold text-[var(--color-text)] w-20 text-right">${item.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === "attendance" && (
        <div className="space-y-5 sm:space-y-6">
          <div className="card-elevated p-5 sm:p-6">
            <h2 className="text-[var(--color-text)] mb-5">Hourly Traffic</h2>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HOURLY_TRAFFIC}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="visitors" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card-elevated p-5 sm:p-6">
            <h2 className="text-[var(--color-text)] mb-5">Weekly Attendance Pattern</h2>
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_ATTENDANCE}>
                  <defs><linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/><stop offset="95%" stopColor="#0F172A" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Area type="monotone" dataKey="count" stroke="#0F172A" fill="url(#ag1)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Membership Tab */}
      {activeTab === "membership" && (
        <div className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <div className="card-elevated p-5 sm:p-6">
              <h2 className="text-[var(--color-text)] mb-5">Plan Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={MEMBERSHIP_DISTRIBUTION} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                      {MEMBERSHIP_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={chartTooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-3 flex-wrap">
                {MEMBERSHIP_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-elevated p-5 sm:p-6">
              <h2 className="text-[var(--color-text)] mb-5">Member Growth</h2>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Line type="monotone" dataKey="members" stroke="#10B981" strokeWidth={2.5} dot={{ fill: "#10B981", r: 4, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="card-elevated p-5 sm:p-6">
            <h2 className="text-[var(--color-text)] mb-5">Retention Rate by Plan</h2>
            <div className="space-y-5">
              {[
                { plan: "Premium", rate: 92 },
                { plan: "Standard", rate: 85 },
                { plan: "Basic", rate: 68 },
              ].map((item) => (
                <div key={item.plan}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-text)]">{item.plan}</span>
                    <span className="text-sm font-bold text-[var(--color-text)]">{item.rate}%</span>
                  </div>
                  <div className="h-2.5 bg-[var(--color-hover)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${item.rate}%`,
                        backgroundColor: item.rate >= 90 ? "#10B981" : item.rate >= 80 ? "#F59E0B" : "#EF4444",
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
