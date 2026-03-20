"use client";

import React from "react";
import { MOCK_PAYMENTS, Payment } from "@/data/mockData";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import StatsCard from "@/components/ui/StatsCard";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";

/**
 * PaymentsPage - Payment tracking and invoice management.
 *
 * Contract:
 * - Displays payment summary cards
 * - Lists all payments in searchable table
 */
// PUBLIC_INTERFACE
export default function PaymentsPage() {
  const totalPaid = MOCK_PAYMENTS.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = MOCK_PAYMENTS.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalOverdue = MOCK_PAYMENTS.filter((p) => p.status === "overdue").reduce((s, p) => s + p.amount, 0);

  const columns = [
    { key: "invoiceNumber", label: "Invoice", sortable: true },
    {
      key: "memberName",
      label: "Member",
      sortable: true,
      render: (p: Payment) => <span className="font-semibold">{p.memberName}</span>,
    },
    { key: "plan", label: "Plan" },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (p: Payment) => <span className="font-bold">${p.amount.toFixed(2)}</span>,
    },
    { key: "method", label: "Method" },
    { key: "date", label: "Date", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (p: Payment) => (
        <Badge
          variant={
            p.status === "paid" ? "success" :
            p.status === "overdue" ? "error" :
            p.status === "pending" ? "warning" : "default"
          }
        >
          {p.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-[var(--color-text)] tracking-tight">Payments</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Track and manage all payment invoices</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <StatsCard title="Total Collected" value={`$${totalPaid.toFixed(2)}`} icon={<CheckCircle size={20} />} />
        <StatsCard title="Pending" value={`$${totalPending.toFixed(2)}`} icon={<Clock size={20} />} />
        <StatsCard title="Overdue" value={`$${totalOverdue.toFixed(2)}`} icon={<AlertTriangle size={20} />} />
      </div>

      <DataTable
        data={MOCK_PAYMENTS as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; label: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode }[]}
        searchKey="memberName"
      />
    </div>
  );
}
