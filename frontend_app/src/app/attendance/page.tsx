"use client";

import React, { useState } from "react";
import { MOCK_ATTENDANCE, MOCK_MEMBERS, AttendanceRecord } from "@/data/mockData";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";
import { LogIn, UserCheck } from "lucide-react";

/**
 * AttendancePage - Member check-in/check-out tracking.
 *
 * Contract:
 * - Displays today's attendance records
 * - Quick check-in by member search
 * - Check-out for currently checked-in members
 */
// PUBLIC_INTERFACE
export default function AttendancePage() {
  const { addToast } = useToast();
  const [records, setRecords] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [searchMember, setSearchMember] = useState("");

  const handleCheckIn = () => {
    if (!searchMember.trim()) {
      addToast("error", "Please enter a member name or ID");
      return;
    }
    const member = MOCK_MEMBERS.find((m) =>
      m.name.toLowerCase().includes(searchMember.toLowerCase())
    );
    if (!member) {
      addToast("error", "Member not found");
      return;
    }
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const newRecord: AttendanceRecord = {
      id: `a-${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      date: now.toISOString().split("T")[0],
      checkIn: timeStr,
      checkOut: null,
      type: "gym",
    };
    setRecords((prev) => [newRecord, ...prev]);
    setSearchMember("");
    addToast("success", `${member.name} checked in at ${timeStr}`);
  };

  const handleCheckOut = (record: AttendanceRecord) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setRecords((prev) =>
      prev.map((r) => (r.id === record.id ? { ...r, checkOut: timeStr } : r))
    );
    addToast("success", `${record.memberName} checked out at ${timeStr}`);
  };

  const columns = [
    {
      key: "memberName",
      label: "Member",
      sortable: true,
      render: (r: AttendanceRecord) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
            <UserCheck size={14} className="text-[var(--color-accent)]" />
          </div>
          <span className="font-semibold">{r.memberName}</span>
        </div>
      ),
    },
    { key: "date", label: "Date", sortable: true },
    { key: "checkIn", label: "Check In" },
    {
      key: "checkOut",
      label: "Check Out",
      render: (r: AttendanceRecord) => r.checkOut || (
        <Button size="sm" variant="outline" onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleCheckOut(r); }}>
          Check Out
        </Button>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (r: AttendanceRecord) => (
        <Badge variant={r.type === "class" ? "info" : "default"}>
          {r.type === "class" ? r.className || "Class" : "Gym"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-[var(--color-text)] tracking-tight">Attendance</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Track member check-ins and check-outs</p>
      </div>

      {/* Quick Check-in */}
      <div className="card-elevated p-5 sm:p-6">
        <h2 className="text-[var(--color-text)] mb-4">Quick Check-in</h2>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search member name..."
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheckIn()}
            />
          </div>
          <Button onClick={handleCheckIn} className="self-end">
            <LogIn size={16} />
            Check In
          </Button>
        </div>
      </div>

      <DataTable
        data={records as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; label: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode }[]}
        searchKey="memberName"
      />
    </div>
  );
}
