"use client";

import React, { useState } from "react";
import { MOCK_MEMBERS, Member } from "@/data/mockData";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";
import { Plus, Mail, Phone } from "lucide-react";

/**
 * MembersPage - Member management with list, add, and detail view.
 *
 * Contract:
 * - Displays all members in a searchable, sortable table
 * - Provides add/edit member modal
 * - Row click opens member detail view
 */
// PUBLIC_INTERFACE
export default function MembersPage() {
  const { addToast } = useToast();
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Add form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formPlan, setFormPlan] = useState("Basic");

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (m: Member) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] font-bold text-xs flex-shrink-0">
            {m.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-[var(--color-text)]">{m.name}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{m.email}</p>
          </div>
        </div>
      ),
    },
    { key: "plan", label: "Plan", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (m: Member) => (
        <Badge variant={m.status === "active" ? "success" : m.status === "expired" ? "error" : "warning"}>
          {m.status}
        </Badge>
      ),
    },
    { key: "joinDate", label: "Join Date", sortable: true },
    { key: "phone", label: "Phone" },
  ];

  const handleAdd = () => {
    if (!formName || !formEmail) {
      addToast("error", "Please fill in name and email");
      return;
    }
    const newMember: Member = {
      id: `m-${Date.now()}`,
      name: formName,
      email: formEmail,
      phone: formPhone || "(555) 000-0000",
      plan: formPlan,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      age: 25,
      gender: "Not specified",
    };
    setMembers((prev) => [newMember, ...prev]);
    setShowAddModal(false);
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormPlan("Basic");
    addToast("success", `${formName} has been added as a member`);
  };

  const handleRowClick = (member: Member) => {
    setSelectedMember(member);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Members</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{members.length} total members</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Member
        </Button>
      </div>

      <DataTable
        data={members as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; label: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode }[]}
        searchKey="name"
        onRowClick={(item) => handleRowClick(item as unknown as Member)}
      />

      {/* Add Member Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Member">
        <div className="flex flex-col gap-4">
          <Input label="Full Name" placeholder="Enter full name" value={formName} onChange={(e) => setFormName(e.target.value)} />
          <Input label="Email" type="email" placeholder="email@example.com" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
          <Input label="Phone" type="tel" placeholder="(555) 000-0000" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="plan-select" className="text-sm font-medium text-[var(--color-text)]">Plan</label>
            <select
              id="plan-select"
              value={formPlan}
              onChange={(e) => setFormPlan(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            >
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Member</Button>
          </div>
        </div>
      </Modal>

      {/* Member Detail Modal */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Member Profile" size="lg">
        {selectedMember && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] font-bold text-2xl">
                {selectedMember.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)]">{selectedMember.name}</h3>
                <Badge variant={selectedMember.status === "active" ? "success" : selectedMember.status === "expired" ? "error" : "warning"}>
                  {selectedMember.status}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">Email</p>
                <p className="text-sm text-[var(--color-text)] flex items-center gap-1.5"><Mail size={14} />{selectedMember.email}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">Phone</p>
                <p className="text-sm text-[var(--color-text)] flex items-center gap-1.5"><Phone size={14} />{selectedMember.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">Plan</p>
                <p className="text-sm font-medium text-[var(--color-text)]">{selectedMember.plan}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">Join Date</p>
                <p className="text-sm text-[var(--color-text)]">{selectedMember.joinDate}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">Age</p>
                <p className="text-sm text-[var(--color-text)]">{selectedMember.age}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">Gender</p>
                <p className="text-sm text-[var(--color-text)]">{selectedMember.gender}</p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setShowDetailModal(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
