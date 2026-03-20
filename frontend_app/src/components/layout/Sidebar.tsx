"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { getNavItemsForRole } from "@/config/navigation";
import { X, Dumbbell } from "lucide-react";
import * as LucideIcons from "lucide-react";

/**
 * Sidebar - Main navigation sidebar with collapsible and mobile overlay modes.
 *
 * Contract:
 * - Reads user role from AuthContext to filter nav items.
 * - Reads sidebar state from SidebarContext for collapse/mobile.
 * - Active link highlighted based on current pathname.
 */
// PUBLIC_INTERFACE
export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebar();

  if (!user) return null;

  const navItems = getNavItemsForRole(user.role);

  const getIcon = (iconName: string) => {
    const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>;
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  const sidebarContent = (
    <nav className="flex flex-col h-full" aria-label="Main navigation">
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-[var(--color-border)]">
        <div className="p-1.5 rounded-lg bg-[#16A34A] text-white flex-shrink-0">
          <Dumbbell size={20} />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-lg text-[var(--color-text)] whitespace-nowrap">
            GymPro
          </span>
        )}
        {/* Mobile close button */}
        <button
          onClick={closeMobile}
          className="ml-auto p-1.5 rounded-lg hover:bg-[var(--color-hover)] lg:hidden"
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMobile}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150
                    ${isActive
                      ? "bg-[#16A34A]/10 text-[#16A34A]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                  aria-current={isActive ? "page" : undefined}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="flex-shrink-0">{getIcon(item.icon)}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User section */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#16A34A]/20 flex items-center justify-center text-[#16A34A] text-sm font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-[var(--color-text)] truncate">{user.name}</p>
              <p className="text-xs text-[var(--color-text-secondary)] capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-transform duration-200 lg:hidden
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-all duration-200
          ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
