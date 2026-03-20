"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useSidebar } from "@/context/SidebarContext";
import { Menu, Sun, Moon, Bell, LogOut, ChevronDown, PanelLeftClose, PanelLeft, Search, Settings } from "lucide-react";
import Link from "next/link";
import { MOCK_NOTIFICATIONS } from "@/data/mockData";

/**
 * Topbar - Persistent top navigation bar with glassmorphism effect.
 *
 * Contract:
 * - Provides sidebar toggle (mobile hamburger + desktop collapse)
 * - Theme toggle (light/dark)
 * - Search bar
 * - Notification bell with unread count
 * - User dropdown with profile and logout
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
    <header className="sticky top-0 z-30 h-[var(--topbar-height)] bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)] px-4 sm:px-6 flex items-center gap-2 sm:gap-4">
      {/* Mobile menu toggle */}
      <button
        onClick={toggleMobile}
        className="p-2.5 rounded-xl hover:bg-[var(--color-hover)] lg:hidden transition-all duration-200 active:scale-95"
        aria-label="Open navigation menu"
      >
        <Menu size={20} className="text-[var(--color-text)]" />
      </button>

      {/* Desktop collapse toggle */}
      <button
        onClick={toggleCollapse}
        className="hidden lg:flex p-2.5 rounded-xl hover:bg-[var(--color-hover)] transition-all duration-200 active:scale-95"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <PanelLeft size={18} className="text-[var(--color-text-secondary)]" />
        ) : (
          <PanelLeftClose size={18} className="text-[var(--color-text-secondary)]" />
        )}
      </button>

      {/* Search bar - hidden on very small screens */}
      <div className="hidden sm:flex flex-1 max-w-md items-center">
        <div className="relative w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-[var(--color-hover)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] border border-transparent focus:border-[var(--color-accent)]/30 focus:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all duration-200"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Spacer for mobile */}
      <div className="flex-1 sm:hidden" />

      {/* Right actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-[var(--color-hover)] transition-all duration-200 active:scale-95"
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
          className="relative p-2.5 rounded-xl hover:bg-[var(--color-hover)] transition-all duration-200 active:scale-95"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell size={18} className="text-[var(--color-text-secondary)]" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-[18px] h-[18px] rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[var(--color-surface)]">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* User menu */}
        <div className="relative ml-1">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 sm:pr-3 rounded-xl hover:bg-[var(--color-hover)] transition-all duration-200"
            aria-expanded={showUserMenu}
            aria-haspopup="true"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center text-[var(--color-accent)] text-sm font-bold ring-1 ring-[var(--color-accent)]/10">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[var(--color-text)] leading-tight">{user.name}</p>
              <p className="text-[11px] text-[var(--color-text-muted)] capitalize leading-tight">{user.role}</p>
            </div>
            <ChevronDown size={14} className="hidden sm:block text-[var(--color-text-muted)]" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} aria-hidden="true" />
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl z-50 py-2 animate-scale-in">
                <div className="px-4 py-3 border-b border-[var(--color-divider)]">
                  <p className="text-sm font-semibold text-[var(--color-text)]">{user.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{user.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-hover)] transition-colors"
                  >
                    <Settings size={15} className="text-[var(--color-text-secondary)]" />
                    Settings
                  </Link>
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[var(--color-error)] hover:bg-[var(--color-hover)] transition-colors"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
