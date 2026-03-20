/**
 * Navigation Configuration Module
 *
 * Single source of truth for all sidebar navigation items.
 * Each item has role-based visibility to support Admin, Trainer, and Member views.
 *
 * Contract:
 * - Input: UserRole
 * - Output: filtered array of NavItem
 * - Invariant: every NavItem has a unique `href`
 */

import { UserRole } from "@/context/AuthContext";

export interface NavItem {
  label: string;
  href: string;
  /** Icon name from lucide-react */
  icon: string;
  /** Which roles can see this item */
  roles: UserRole[];
  /** Optional badge count */
  badge?: number;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", roles: ["admin", "trainer", "member"] },
  { label: "Members", href: "/members", icon: "Users", roles: ["admin", "trainer"] },
  { label: "Trainers", href: "/trainers", icon: "Dumbbell", roles: ["admin"] },
  { label: "Classes", href: "/classes", icon: "Calendar", roles: ["admin", "trainer", "member"] },
  { label: "Attendance", href: "/attendance", icon: "ClipboardCheck", roles: ["admin", "trainer"] },
  { label: "Memberships", href: "/memberships", icon: "CreditCard", roles: ["admin", "member"] },
  { label: "Payments", href: "/payments", icon: "Receipt", roles: ["admin"] },
  { label: "Equipment", href: "/equipment", icon: "Wrench", roles: ["admin"] },
  { label: "Reports", href: "/reports", icon: "BarChart3", roles: ["admin"] },
  { label: "Notifications", href: "/notifications", icon: "Bell", roles: ["admin", "trainer", "member"] },
  { label: "Settings", href: "/settings", icon: "Settings", roles: ["admin", "trainer", "member"] },
];

/**
 * getNavItemsForRole - Returns navigation items visible to the given role.
 */
// PUBLIC_INTERFACE
export function getNavItemsForRole(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}
