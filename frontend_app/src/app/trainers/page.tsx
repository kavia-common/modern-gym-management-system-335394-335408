"use client";

import React, { useState } from "react";
import { MOCK_TRAINERS, Trainer } from "@/data/mockData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";
import { Plus, Star, Users } from "lucide-react";

/**
 * TrainersPage - Trainer management with card grid view.
 *
 * Contract:
 * - Displays trainers in a card grid
 * - Add trainer via modal
 * - Click card for detail modal
 */
// PUBLIC_INTERFACE
export default function TrainersPage() {
  const { addToast } = useToast();
  const [trainers, setTrainers] = useState<Trainer[]>(MOCK_TRAINERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSpec, setFormSpec] = useState("");

  const handleAdd = () => {
    if (!formName || !formEmail || !formSpec) {
      addToast("error", "Please fill in all fields");
      return;
    }
    const newTrainer: Trainer = {
      id: `t-${Date.now()}`,
      name: formName,
      email: formEmail,
      phone: "(555) 000-0000",
      specialization: formSpec,
      status: "active",
      hireDate: new Date().toISOString().split("T")[0],
      clients: 0,
      rating: 0,
    };
    setTrainers((prev) => [newTrainer, ...prev]);
    setShowAddModal(false);
    setFormName("");
    setFormEmail("");
    setFormSpec("");
    addToast("success", `${formName} has been added as a trainer`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Trainers</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{trainers.length} trainers on staff</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Trainer
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {trainers.map((trainer) => (
          <button
            key={trainer.id}
            onClick={() => setSelectedTrainer(trainer)}
            className="text-left rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] font-bold text-lg">
                {trainer.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text)]">{trainer.name}</p>
                <Badge variant={trainer.status === "active" ? "success" : "warning"}>
                  {trainer.status}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">{trainer.specialization}</p>
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1"><Users size={12} />{trainer.clients} clients</span>
              <span className="flex items-center gap-1"><Star size={12} className="text-[#F59E0B]" />{trainer.rating}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Add Trainer Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Trainer">
        <div className="flex flex-col gap-4">
          <Input label="Full Name" placeholder="Trainer name" value={formName} onChange={(e) => setFormName(e.target.value)} />
          <Input label="Email" type="email" placeholder="trainer@gym.com" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
          <Input label="Specialization" placeholder="e.g., Strength Training" value={formSpec} onChange={(e) => setFormSpec(e.target.value)} />
          <div className="flex gap-2 justify-end mt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Trainer</Button>
          </div>
        </div>
      </Modal>

      {/* Trainer Detail Modal */}
      <Modal isOpen={!!selectedTrainer} onClose={() => setSelectedTrainer(null)} title="Trainer Profile" size="lg">
        {selectedTrainer && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] font-bold text-2xl">
                {selectedTrainer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)]">{selectedTrainer.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{selectedTrainer.specialization}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div><p className="text-xs text-[var(--color-text-secondary)]">Email</p><p className="text-sm text-[var(--color-text)]">{selectedTrainer.email}</p></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Phone</p><p className="text-sm text-[var(--color-text)]">{selectedTrainer.phone}</p></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Hire Date</p><p className="text-sm text-[var(--color-text)]">{selectedTrainer.hireDate}</p></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Status</p><Badge variant={selectedTrainer.status === "active" ? "success" : "warning"}>{selectedTrainer.status}</Badge></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Clients</p><p className="text-sm text-[var(--color-text)]">{selectedTrainer.clients}</p></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Rating</p><p className="text-sm text-[var(--color-text)] flex items-center gap-1"><Star size={14} className="text-[#F59E0B]" />{selectedTrainer.rating}</p></div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setSelectedTrainer(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
