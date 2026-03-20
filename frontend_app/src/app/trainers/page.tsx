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
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-[var(--color-text)] tracking-tight">Trainers</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{trainers.length} trainers on staff</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Trainer
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {trainers.map((trainer) => (
          <button
            key={trainer.id}
            onClick={() => setSelectedTrainer(trainer)}
            className="text-left card-elevated p-5 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center text-[var(--color-accent)] font-bold text-lg ring-1 ring-[var(--color-accent)]/10 transition-transform duration-200 group-hover:scale-105">
                {trainer.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[var(--color-text)] truncate">{trainer.name}</p>
                <Badge variant={trainer.status === "active" ? "success" : "warning"}>
                  {trainer.status}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">{trainer.specialization}</p>
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5"><Users size={13} />{trainer.clients} clients</span>
              <span className="flex items-center gap-1.5"><Star size={13} className="text-amber-400" />{trainer.rating}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Add Trainer Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Trainer">
        <div className="flex flex-col gap-5">
          <Input label="Full Name" placeholder="Trainer name" value={formName} onChange={(e) => setFormName(e.target.value)} />
          <Input label="Email" type="email" placeholder="trainer@gym.com" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
          <Input label="Specialization" placeholder="e.g., Strength Training" value={formSpec} onChange={(e) => setFormSpec(e.target.value)} />
          <div className="flex gap-3 justify-end mt-2">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Trainer</Button>
          </div>
        </div>
      </Modal>

      {/* Trainer Detail Modal */}
      <Modal isOpen={!!selectedTrainer} onClose={() => setSelectedTrainer(null)} title="Trainer Profile" size="lg">
        {selectedTrainer && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center text-[var(--color-accent)] font-bold text-2xl ring-1 ring-[var(--color-accent)]/10">
                {selectedTrainer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)]">{selectedTrainer.name}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{selectedTrainer.specialization}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Email</p><p className="text-sm text-[var(--color-text)] mt-1">{selectedTrainer.email}</p></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Phone</p><p className="text-sm text-[var(--color-text)] mt-1">{selectedTrainer.phone}</p></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Hire Date</p><p className="text-sm text-[var(--color-text)] mt-1">{selectedTrainer.hireDate}</p></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Status</p><div className="mt-1"><Badge variant={selectedTrainer.status === "active" ? "success" : "warning"}>{selectedTrainer.status}</Badge></div></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Clients</p><p className="text-sm text-[var(--color-text)] mt-1">{selectedTrainer.clients}</p></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Rating</p><p className="text-sm text-[var(--color-text)] flex items-center gap-1.5 mt-1"><Star size={14} className="text-amber-400" />{selectedTrainer.rating}</p></div>
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
