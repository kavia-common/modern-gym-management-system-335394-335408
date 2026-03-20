"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";
import { Menu, Sun, Moon, Bell, LogOut, ChevronDown, PanelLeftClose, PanelLeft } from "lucide-react";
import Link from "next/link";
import { MOCK_NOTIFICATIONS } from "@/data/mockData";

/**
 * Topbar - Persistent top navigation bar.
 *
 * Contract:
 * - Provides sidebar toggle (mobile hamburger + desktop collapse)
 * - Theme toggle (light/dark)
 * - Notification bell with unread count
 * - User dropdown with logout
 */
// PUBLIC_INTERFACE
export default function Topbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toggleCollapse, toggleMobile, isCollapsed } = useSidebar();
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!user) return null;

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 flex items-center gap-3">
      {/* Mobile menu toggle */}
      <button
        onClick={toggleMobile}
        className="p-2 rounded-lg hover:bg-[var(--color-hover)] lg:hidden transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu size={20} className="text-[var(--color-text)]" />
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={toggleCollapse}
        className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--color-hover)] transition-colors"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <PanelLeft size={20} className="text-[var(--color-text)]" />
        ) : (
          <PanelLeftClose size={20} className="text-[var(--color-text)]" />
        )}
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-[var(--color-hover)] transition-colors"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <Moon size={18} className="text-[var(--color-text-secondary)]" />
        ) : (
          <Sun size={18} className="text-[var(--color-text-secondary)]" />
        )}
      </button>

      {/* Notifications */}
      <Link
        href="/notifications"
        className="relative p-2 rounded-lg hover:bg-[var(--color-hover)] transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
      >
        <Bell size={18} className="text-[var(--color-text-secondary)]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Link>

      {/* User menu */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--color-hover)] transition-colors"
          aria-expanded={showUserMenu}
          aria-haspopup="true"
        >
          <div className="w-8 h-8 rounded-full bg-[#16A34A]/20 flex items-center justify-center text-[#16A34A] text-sm font-bold">
            {user.name.charAt(0)}
          </div>
          <span className="hidden sm:block text-sm font-medium text-[var(--color-text)]">{user.name}</span>
          <ChevronDown size={14} className="hidden sm:block text-[var(--color-text-secondary)]" />
        </button>

        {showUserMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} aria-hidden="true" />
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg z-50 py-1">
              <div className="px-3 py-2 border-b border-[var(--color-border)]">
                <p className="text-sm font-medium text-[var(--color-text)]">{user.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{user.email}</p>
              </div>
              <Link
                href="/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors"
              >
                Profile & Settings
              </Link>
              <button
                onClick={() => { logout(); setShowUserMenu(false); }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#EF4444] hover:bg-[var(--color-hover)] transition-colors"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
