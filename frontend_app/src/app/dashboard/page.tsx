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
    <div className="space-y-6 sm:space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-[var(--color-text)] tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Welcome back, {user?.name || "User"}! Here&apos;s your overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {role === "admin" && (
          <>
            <StatsCard
              title="Total Members"
              value={DASHBOARD_STATS.totalMembers}
              change={DASHBOARD_STATS.membershipGrowth}
              changeLabel="vs last month"
              icon={<Users size={20} />}
            />
            <StatsCard
              title="Monthly Revenue"
              value={`$${DASHBOARD_STATS.monthlyRevenue.toLocaleString()}`}
              change={DASHBOARD_STATS.revenueGrowth}
              changeLabel="vs last month"
              icon={<DollarSign size={20} />}
            />
            <StatsCard
              title="Today's Check-ins"
              value={DASHBOARD_STATS.todayCheckIns}
              change={5}
              changeLabel="vs yesterday"
              icon={<CalendarCheck size={20} />}
            />
            <StatsCard
              title="Active Trainers"
              value={DASHBOARD_STATS.totalTrainers}
              icon={<Dumbbell size={20} />}
            />
          </>
        )}
        {role === "trainer" && (
          <>
            <StatsCard title="My Clients" value={18} change={3} changeLabel="new this month" icon={<Users size={20} />} />
            <StatsCard title="Classes This Week" value={6} icon={<CalendarCheck size={20} />} />
            <StatsCard title="Avg. Attendance" value="85%" change={2} changeLabel="vs last week" icon={<Activity size={20} />} />
            <StatsCard title="Rating" value="4.8" icon={<TrendingUp size={20} />} />
          </>
        )}
        {role === "member" && (
          <>
            <StatsCard title="Workouts This Month" value={12} change={15} changeLabel="vs last month" icon={<Activity size={20} />} />
            <StatsCard title="Classes Attended" value={8} icon={<CalendarCheck size={20} />} />
            <StatsCard title="Current Streak" value="5 days" icon={<TrendingUp size={20} />} />
            <StatsCard title="Membership" value="Premium" icon={<Users size={20} />} />
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Revenue/Activity Chart */}
        <div className="lg:col-span-2 card-elevated p-5 sm:p-6">
          <h2 className="text-[var(--color-text)] mb-5">
            {role === "admin" ? "Revenue Trend" : "Weekly Activity"}
          </h2>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    color: "var(--color-text)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  fill="url(#revenueGradient)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Membership Distribution */}
        <div className="card-elevated p-5 sm:p-6">
          <h2 className="text-[var(--color-text)] mb-5">Membership Plans</h2>
          <div className="h-48 sm:h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MEMBERSHIP_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={78}
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
                    borderRadius: "12px",
                    color: "var(--color-text)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-3 flex-wrap">
            {MEMBERSHIP_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-[var(--color-text-muted)] font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Attendance */}
      <div className="card-elevated p-5 sm:p-6">
        <h2 className="text-[var(--color-text)] mb-5">Weekly Attendance</h2>
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_ATTENDANCE}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  color: "var(--color-text)",
                  boxShadow: "var(--shadow-lg)",
                }}
              />
              <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Recent Members */}
        <div className="card-elevated p-5 sm:p-6">
          <h2 className="text-[var(--color-text)] mb-5">Recent Members</h2>
          <div className="space-y-1">
            {MOCK_MEMBERS.slice(0, 5).map((member) => (
              <div key={member.id} className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-[var(--color-hover)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] font-bold text-sm flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text)] truncate">{member.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{member.plan} Plan</p>
                </div>
                <Badge variant={member.status === "active" ? "success" : member.status === "expired" ? "error" : "warning"}>
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="card-elevated p-5 sm:p-6">
          <h2 className="text-[var(--color-text)] mb-5">Recent Payments</h2>
          <div className="space-y-1">
            {MOCK_PAYMENTS.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-[var(--color-hover)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-hover)] flex items-center justify-center text-[var(--color-text-secondary)] font-bold text-sm flex-shrink-0">
                  $
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text)] truncate">{payment.memberName}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{payment.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-[var(--color-text)]">${payment.amount}</p>
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
