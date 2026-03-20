"use client";

import React, { useState } from "react";
import { MOCK_NOTIFICATIONS, Notification } from "@/data/mockData";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CheckCircle, AlertTriangle, Info, XCircle, Check, Trash2 } from "lucide-react";

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const colorMap = {
  success: "text-[#16A34A]",
  warning: "text-[#F59E0B]",
  info: "text-[#3B82F6]",
  error: "text-[#EF4444]",
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
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Notifications</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
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

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-16 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <Info size={40} className="mx-auto text-[var(--color-text-secondary)] mb-3" />
            <p className="text-sm text-[var(--color-text-secondary)]">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-4 rounded-xl border bg-[var(--color-surface)] transition-colors
                  ${notification.read ? "border-[var(--color-border)]" : "border-[#16A34A]/30 bg-[#16A34A]/[0.02]"}`}
              >
                <Icon size={20} className={`mt-0.5 flex-shrink-0 ${colorMap[notification.type]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[var(--color-text)]">{notification.title}</h3>
                    {!notification.read && <Badge variant="success">New</Badge>}
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{notification.message}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">{notification.date} at {notification.time}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors"
                      aria-label="Mark as read"
                      title="Mark as read"
                    >
                      <Check size={14} className="text-[var(--color-text-secondary)]" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors"
                    aria-label="Delete notification"
                    title="Delete"
                  >
                    <Trash2 size={14} className="text-[var(--color-text-secondary)]" />
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
