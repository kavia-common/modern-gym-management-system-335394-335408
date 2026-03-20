"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

/** User roles in the gym management system */
export type UserRole = "admin" | "trainer" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/** Mock user data per role */
const MOCK_USERS: Record<string, User> = {
  "admin@gym.com": { id: "u1", name: "Alex Admin", email: "admin@gym.com", role: "admin" },
  "trainer@gym.com": { id: "u2", name: "Taylor Trainer", email: "trainer@gym.com", role: "trainer" },
  "member@gym.com": { id: "u3", name: "Morgan Member", email: "member@gym.com", role: "member" },
};

/**
 * AuthProvider - Manages mock authentication state.
 *
 * Contract:
 * - login: accepts email/password, returns success boolean. Uses mock users.
 * - register: simulates registration, auto-assigns member role.
 * - logout: clears user state.
 * - forgotPassword: simulates password reset email.
 * - Side effects: localStorage for session persistence.
 */
// PUBLIC_INTERFACE
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("gym-user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    // Simulate network delay; password validated server-side in production
    void password;
    await new Promise((r) => setTimeout(r, 500));
    
    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (mockUser) {
      setUser(mockUser);
      localStorage.setItem("gym-user", JSON.stringify(mockUser));
      return true;
    }
    
    // Allow any email with a role selection for demo purposes
    if (role) {
      const newUser: User = {
        id: `u-${Date.now()}`,
        name: email.split("@")[0],
        email: email.toLowerCase(),
        role,
      };
      setUser(newUser);
      localStorage.setItem("gym-user", JSON.stringify(newUser));
      return true;
    }
    
    // Default to member role
    const defaultUser: User = {
      id: `u-${Date.now()}`,
      name: email.split("@")[0],
      email: email.toLowerCase(),
      role: "member",
    };
    setUser(defaultUser);
    localStorage.setItem("gym-user", JSON.stringify(defaultUser));
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    // Password would be hashed server-side in production
    void password;
    await new Promise((r) => setTimeout(r, 500));
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      role: "member",
    };
    setUser(newUser);
    localStorage.setItem("gym-user", JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("gym-user");
  }, []);

  const forgotPassword = useCallback(async (email: string): Promise<boolean> => {
    // Email would be sent to server in production
    void email;
    await new Promise((r) => setTimeout(r, 500));
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth - Hook to access authentication context.
 * Throws if used outside AuthProvider.
 */
// PUBLIC_INTERFACE
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
