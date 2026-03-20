"use client";

import React, { useState } from "react";
import { MOCK_NOTIFICATIONS, Notification } from "@/data/mockData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CheckCircle, AlertTriangle, Info, XCircle, Check, Trash2, BellOff } from "lucide-react";

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const colorMap = {
  success: "text-emerald-500",
  warning: "text-amber-500",
  info: "text-blue-500",
  error: "text-red-500",
};

const bgMap = {
  success: "bg-emerald-500/10",
  warning: "bg-amber-500/10",
  info: "bg-blue-500/10",
  error: "bg-red-500/10",
};

/**
 * NotificationsPage - Notification center for system messages and alerts.
 *
 * Contract:
 * - Displays all notifications with read/unread state
 * - Mark individual or all as read
 * - Delete individual notifications
 */
// PUBLIC_INTERFACE
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-[var(--color-text)] tracking-tight">Notifications</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check size={14} />
            Mark All Read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-20 card-elevated">
            <BellOff size={40} className="mx-auto text-[var(--color-text-muted)] mb-4 opacity-50" />
            <p className="text-sm text-[var(--color-text-muted)]">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 sm:p-5 rounded-2xl border bg-[var(--color-surface)] transition-all duration-200 hover:shadow-sm
                  ${notification.read ? "border-[var(--color-border)]" : "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.02]"}`}
              >
                <div className={`p-2 rounded-xl flex-shrink-0 ${bgMap[notification.type]}`}>
                  <Icon size={16} className={colorMap[notification.type]} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-[var(--color-text)]">{notification.title}</h3>
                    {!notification.read && <Badge variant="success">New</Badge>}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">{notification.message}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">{notification.date} at {notification.time}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 rounded-xl hover:bg-[var(--color-hover)] transition-all duration-200 active:scale-95"
                      aria-label="Mark as read"
                      title="Mark as read"
                    >
                      <Check size={14} className="text-[var(--color-text-muted)]" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 rounded-xl hover:bg-[var(--color-hover)] transition-all duration-200 active:scale-95"
                    aria-label="Delete notification"
                    title="Delete"
                  >
                    <Trash2 size={14} className="text-[var(--color-text-muted)]" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
