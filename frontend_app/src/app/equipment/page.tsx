"use client";

import React, { useState } from "react";
import { MOCK_EQUIPMENT, Equipment } from "@/data/mockData";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";
import { Plus } from "lucide-react";

/**
 * EquipmentPage - Equipment inventory tracking.
 *
 * Contract:
 * - Lists all gym equipment with status
 * - Add new equipment via modal
 */
// PUBLIC_INTERFACE
export default function EquipmentPage() {
  const { addToast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>(MOCK_EQUIPMENT);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formLocation, setFormLocation] = useState("");

  const handleAdd = () => {
    if (!formName || !formCategory || !formLocation) {
      addToast("error", "Please fill in all fields");
      return;
    }
    const newEquip: Equipment = {
      id: `e-${Date.now()}`,
      name: formName,
      category: formCategory,
      status: "operational",
      purchaseDate: new Date().toISOString().split("T")[0],
      lastMaintenance: new Date().toISOString().split("T")[0],
      location: formLocation,
      quantity: 1,
    };
    setEquipment((prev) => [newEquip, ...prev]);
    setShowAddModal(false);
    setFormName("");
    setFormCategory("");
    setFormLocation("");
    addToast("success", `${formName} has been added to inventory`);
  };

  const columns = [
    { key: "name", label: "Equipment", sortable: true, render: (e: Equipment) => <span className="font-medium">{e.name}</span> },
    { key: "category", label: "Category", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (e: Equipment) => (
        <Badge variant={e.status === "operational" ? "success" : e.status === "maintenance" ? "warning" : "error"}>
          {e.status}
        </Badge>
      ),
    },
    { key: "location", label: "Location" },
    { key: "quantity", label: "Qty", sortable: true },
    { key: "lastMaintenance", label: "Last Maintenance", sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Equipment</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{equipment.length} items in inventory</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Equipment
        </Button>
      </div>

      <DataTable
        data={equipment as unknown as Record<string, unknown>[]}
        columns={columns as { key: string; label: string; sortable?: boolean; render?: (item: Record<string, unknown>) => React.ReactNode }[]}
        searchKey="name"
      />

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Equipment">
        <div className="flex flex-col gap-4">
          <Input label="Equipment Name" placeholder="e.g., Treadmill Pro" value={formName} onChange={(e) => setFormName(e.target.value)} />
          <Input label="Category" placeholder="e.g., Cardio, Weights" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} />
          <Input label="Location" placeholder="e.g., Main Floor" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} />
          <div className="flex gap-2 justify-end mt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Equipment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
