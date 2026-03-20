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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-[var(--color-text)] tracking-tight">Class Schedule</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">{MOCK_CLASSES.length} classes available this week</p>
      </div>

      {/* Day filter - scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
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
            className="whitespace-nowrap"
          >
            {day.slice(0, 3)}
          </Button>
        ))}
      </div>

      {/* Class cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredClasses.map((cls) => {
          const isFull = cls.enrolled >= cls.capacity;
          const fillPercent = (cls.enrolled / cls.capacity) * 100;
          return (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className="text-left card-elevated p-5 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">{cls.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{cls.trainer}</p>
                </div>
                <Badge variant={isFull ? "error" : "success"}>
                  {isFull ? "Full" : "Open"}
                </Badge>
              </div>
              <div className="flex flex-col gap-2 mt-3 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-2"><Clock size={13} />{cls.day} • {cls.time} • {cls.duration}min</span>
                <span className="flex items-center gap-2"><MapPin size={13} />{cls.room}</span>
                <span className="flex items-center gap-2"><Users size={13} />{cls.enrolled}/{cls.capacity} enrolled</span>
              </div>
              {/* Capacity bar */}
              <div className="mt-4 h-1.5 bg-[var(--color-hover)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${fillPercent}%`,
                    backgroundColor: isFull ? "var(--color-error)" : "var(--color-accent)",
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
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text)]">{selectedClass.name}</h3>
              <Badge variant="info">{selectedClass.category}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Instructor</p><p className="text-[var(--color-text)] font-medium mt-1">{selectedClass.trainer}</p></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Schedule</p><p className="text-[var(--color-text)] mt-1">{selectedClass.day} at {selectedClass.time}</p></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Duration</p><p className="text-[var(--color-text)] mt-1">{selectedClass.duration} minutes</p></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Room</p><p className="text-[var(--color-text)] mt-1">{selectedClass.room}</p></div>
              <div className="p-3 rounded-xl bg-[var(--color-hover)]"><p className="text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Capacity</p><p className="text-[var(--color-text)] mt-1">{selectedClass.enrolled}/{selectedClass.capacity}</p></div>
            </div>
            <div className="flex gap-3 justify-end pt-2">
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
