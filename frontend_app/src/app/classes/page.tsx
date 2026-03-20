"use client";

import React, { useState } from "react";
import { MOCK_CLASSES, GymClass } from "@/data/mockData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";
import { Clock, MapPin, Users } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * ClassesPage - Class schedule view organized by day.
 *
 * Contract:
 * - Displays classes grouped by weekday in a grid schedule view
 * - Click a class for details
 * - Members can enroll/unenroll (mock)
 */
// PUBLIC_INTERFACE
export default function ClassesPage() {
  const { addToast } = useToast();
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("All");

  const filteredClasses = selectedDay === "All"
    ? MOCK_CLASSES
    : MOCK_CLASSES.filter((c) => c.day === selectedDay);

  const handleEnroll = (cls: GymClass) => {
    if (cls.enrolled >= cls.capacity) {
      addToast("warning", "This class is fully booked");
    } else {
      addToast("success", `Enrolled in ${cls.name}`);
    }
    setSelectedClass(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Class Schedule</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{MOCK_CLASSES.length} classes available this week</p>
      </div>

      {/* Day filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedDay === "All" ? "primary" : "outline"}
          size="sm"
          onClick={() => setSelectedDay("All")}
        >
          All
        </Button>
        {DAYS.map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedDay(day)}
          >
            {day.slice(0, 3)}
          </Button>
        ))}
      </div>

      {/* Class cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((cls) => {
          const isFull = cls.enrolled >= cls.capacity;
          return (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className="text-left rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-[var(--color-text)]">{cls.name}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">{cls.trainer}</p>
                </div>
                <Badge variant={isFull ? "error" : "success"}>
                  {isFull ? "Full" : "Open"}
                </Badge>
              </div>
              <div className="flex flex-col gap-1.5 mt-3 text-xs text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1.5"><Clock size={12} />{cls.day} • {cls.time} • {cls.duration}min</span>
                <span className="flex items-center gap-1.5"><MapPin size={12} />{cls.room}</span>
                <span className="flex items-center gap-1.5"><Users size={12} />{cls.enrolled}/{cls.capacity} enrolled</span>
              </div>
              {/* Capacity bar */}
              <div className="mt-3 h-1.5 bg-[var(--color-hover)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(cls.enrolled / cls.capacity) * 100}%`,
                    backgroundColor: isFull ? "#EF4444" : "#16A34A",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Class Detail Modal */}
      <Modal isOpen={!!selectedClass} onClose={() => setSelectedClass(null)} title="Class Details" size="md">
        {selectedClass && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">{selectedClass.name}</h3>
              <Badge variant="info">{selectedClass.category}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-[var(--color-text-secondary)]">Instructor</p><p className="text-[var(--color-text)] font-medium">{selectedClass.trainer}</p></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Schedule</p><p className="text-[var(--color-text)]">{selectedClass.day} at {selectedClass.time}</p></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Duration</p><p className="text-[var(--color-text)]">{selectedClass.duration} minutes</p></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Room</p><p className="text-[var(--color-text)]">{selectedClass.room}</p></div>
              <div><p className="text-xs text-[var(--color-text-secondary)]">Capacity</p><p className="text-[var(--color-text)]">{selectedClass.enrolled}/{selectedClass.capacity}</p></div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" onClick={() => setSelectedClass(null)}>Close</Button>
              <Button onClick={() => handleEnroll(selectedClass)}>
                {selectedClass.enrolled >= selectedClass.capacity ? "Join Waitlist" : "Enroll"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
