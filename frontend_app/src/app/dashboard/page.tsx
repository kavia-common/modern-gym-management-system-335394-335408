"use client";

import React from "react";
import {
  DASHBOARD_STATS,
  REVENUE_CHART_DATA,
  MEMBERSHIP_DISTRIBUTION,
  WEEKLY_ATTENDANCE,
  MOCK_MEMBERS,
  MOCK_PAYMENTS,
} from "@/data/mockData";
import StatsCard from "@/components/ui/StatsCard";
import Badge from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { Users, DollarSign, CalendarCheck, TrendingUp, Activity, Dumbbell } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

/**
 * DashboardPage - Main analytics dashboard with stats cards and charts.
 *
 * Contract:
 * - Displays role-specific dashboard views
 * - Admin: full analytics with revenue, members, attendance charts
 * - Trainer: class and client focused metrics
 * - Member: personal activity summary
 */
// PUBLIC_INTERFACE
export default function DashboardPage() {
  const { user } = useAuth();

  const role = user?.role || "member";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Dashboard</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Welcome back, {user?.name || "User"}! Here&apos;s your overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === "admin" && (
          <>
            <StatsCard
              title="Total Members"
              value={DASHBOARD_STATS.totalMembers}
              change={DASHBOARD_STATS.membershipGrowth}
              changeLabel="vs last month"
              icon={<Users size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Monthly Revenue"
              value={`$${DASHBOARD_STATS.monthlyRevenue.toLocaleString()}`}
              change={DASHBOARD_STATS.revenueGrowth}
              changeLabel="vs last month"
              icon={<DollarSign size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Today's Check-ins"
              value={DASHBOARD_STATS.todayCheckIns}
              change={5}
              changeLabel="vs yesterday"
              icon={<CalendarCheck size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Active Trainers"
              value={DASHBOARD_STATS.totalTrainers}
              icon={<Dumbbell size={20} className="text-[var(--color-text-secondary)]" />}
            />
          </>
        )}
        {role === "trainer" && (
          <>
            <StatsCard
              title="My Clients"
              value={18}
              change={3}
              changeLabel="new this month"
              icon={<Users size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Classes This Week"
              value={6}
              icon={<CalendarCheck size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Avg. Attendance"
              value="85%"
              change={2}
              changeLabel="vs last week"
              icon={<Activity size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Rating"
              value="4.8"
              icon={<TrendingUp size={20} className="text-[var(--color-text-secondary)]" />}
            />
          </>
        )}
        {role === "member" && (
          <>
            <StatsCard
              title="Workouts This Month"
              value={12}
              change={15}
              changeLabel="vs last month"
              icon={<Activity size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Classes Attended"
              value={8}
              icon={<CalendarCheck size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Current Streak"
              value="5 days"
              icon={<TrendingUp size={20} className="text-[var(--color-text-secondary)]" />}
            />
            <StatsCard
              title="Membership"
              value="Premium"
              icon={<Users size={20} className="text-[var(--color-text-secondary)]" />}
            />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart (Admin) or Attendance Chart */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">
            {role === "admin" ? "Revenue Trend" : "Weekly Activity"}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-text)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16A34A"
                  fill="#16A34A"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Membership Distribution */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Membership Plans</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MEMBERSHIP_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {MEMBERSHIP_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-text)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {MEMBERSHIP_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-[var(--color-text-secondary)]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Attendance Chart */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Weekly Attendance</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_ATTENDANCE}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-text)",
                }}
              />
              <Bar dataKey="count" fill="#111827" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Members */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Recent Members</h2>
          <div className="space-y-3">
            {MOCK_MEMBERS.slice(0, 5).map((member) => (
              <div key={member.id} className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] font-bold text-sm flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text)] truncate">{member.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{member.plan} Plan</p>
                </div>
                <Badge variant={member.status === "active" ? "success" : member.status === "expired" ? "error" : "warning"}>
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">Recent Payments</h2>
          <div className="space-y-3">
            {MOCK_PAYMENTS.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-full bg-[var(--color-hover)] flex items-center justify-center text-[var(--color-text-secondary)] font-bold text-sm flex-shrink-0">
                  $
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text)] truncate">{payment.memberName}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[var(--color-text)]">${payment.amount}</p>
                  <Badge
                    variant={
                      payment.status === "paid" ? "success" :
                      payment.status === "overdue" ? "error" :
                      payment.status === "pending" ? "warning" : "default"
                    }
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
