"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { getNavItemsForRole } from "@/config/navigation";
import { X, Dumbbell, LogOut, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

/**
 * Sidebar - Modern navigation sidebar with collapsible and mobile overlay modes.
 *
 * Contract:
 * - Reads user role from AuthContext to filter nav items.
 * - Reads sidebar state from SidebarContext for collapse/mobile.
 * - Active link highlighted based on current pathname.
 * - Glassmorphism style on mobile overlay.
 */
// PUBLIC_INTERFACE
export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebar();

  if (!user) return null;

  const navItems = getNavItemsForRole(user.role);

  const getIcon = (iconName: string) => {
    const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>;
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  const sidebarContent = (
    <nav className="flex flex-col h-full" aria-label="Main navigation">
      {/* Logo area */}
      <div className="flex items-center gap-3 px-5 h-[var(--topbar-height)] border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-xl gradient-accent text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <Dumbbell size={18} />
        </div>
        {!isCollapsed && (
          <div className="flex items-center gap-1 overflow-hidden">
            <span className="font-bold text-lg tracking-tight text-[var(--color-text)] whitespace-nowrap">
              Gym
            </span>
            <span className="font-bold text-lg tracking-tight text-[var(--color-accent)] whitespace-nowrap">
              Pro
            </span>
          </div>
        )}
        {/* Mobile close button */}
        <button
          onClick={closeMobile}
          className="ml-auto p-2 rounded-xl hover:bg-[var(--color-hover)] lg:hidden transition-colors"
          aria-label="Close navigation"
        >
          <X size={18} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Section label */}
      {!isCollapsed && (
        <div className="px-5 pt-5 pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            Navigation
          </span>
        </div>
      )}

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto px-3 pb-4" style={{ paddingTop: isCollapsed ? '16px' : '0' }}>
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMobile}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative
                    ${isActive
                      ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
                    }
                    ${isCollapsed ? "justify-center px-0 mx-1" : ""}
                  `}
                  aria-current={isActive ? "page" : undefined}
                  title={isCollapsed ? item.label : undefined}
                >
                  {/* Active indicator bar */}
                  {isActive && !isCollapsed && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[var(--color-accent)]" />
                  )}
                  <span className={`flex-shrink-0 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}>
                    {getIcon(item.icon)}
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {isActive && (
                        <ChevronRight size={14} className="text-[var(--color-accent)] opacity-60" />
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User section at bottom */}
      <div className={`border-t border-[var(--color-border)] ${isCollapsed ? 'px-2 py-3' : 'px-4 py-4'}`}>
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] text-sm font-bold">
              {user.name.charAt(0)}
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl hover:bg-[var(--color-hover)] transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={16} className="text-[var(--color-text-secondary)]" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center text-[var(--color-accent)] text-sm font-bold flex-shrink-0 ring-1 ring-[var(--color-accent)]/10">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--color-text)] truncate">{user.name}</p>
              <p className="text-[11px] text-[var(--color-text-muted)] capitalize">{user.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl hover:bg-[var(--color-hover)] transition-colors flex-shrink-0"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={16} className="text-[var(--color-text-secondary)]" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[272px] z-50 bg-[var(--color-surface)] border-r border-[var(--color-border)] shadow-xl transition-transform duration-300 ease-out lg:hidden
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-all duration-300 ease-out
          ${isCollapsed ? "w-[72px]" : "w-[272px]"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
