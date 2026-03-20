"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Sun, Moon, Shield, User, Bell, Palette } from "lucide-react";

type SettingsTab = "profile" | "appearance" | "notifications" | "security";

/**
 * SettingsPage - User profile and application settings.
 *
 * Contract:
 * - Profile: edit name, email (mock save)
 * - Appearance: theme toggle
 * - Notifications: toggle preferences
 * - Security: password change form (mock)
 */
// PUBLIC_INTERFACE
export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const tabs: { key: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <User size={16} /> },
    { key: "appearance", label: "Appearance", icon: <Palette size={16} /> },
    { key: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { key: "security", label: "Security", icon: <Shield size={16} /> },
  ];

  const handleSaveProfile = () => {
    addToast("success", "Profile updated successfully");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      addToast("error", "Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      addToast("error", "New passwords do not match");
      return;
    }
    addToast("success", "Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-[var(--color-text)] tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar tabs */}
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible md:w-52 -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left whitespace-nowrap
                ${activeTab === tab.key
                  ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text)]"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Profile */}
          {activeTab === "profile" && (
            <div className="card-elevated p-6 sm:p-8 animate-fade-in">
              <h2 className="text-[var(--color-text)] mb-6">Profile Information</h2>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center text-[var(--color-accent)] font-bold text-3xl ring-1 ring-[var(--color-accent)]/10">
                  {profileName.charAt(0) || "?"}
                </div>
                <div>
                  <p className="font-semibold text-lg text-[var(--color-text)]">{profileName}</p>
                  <p className="text-sm text-[var(--color-text-muted)] capitalize">{user?.role || "Member"}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input label="Full Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                <Input label="Email" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
              </div>
              <div className="flex justify-end mt-8">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <div className="card-elevated p-6 sm:p-8 animate-fade-in">
              <h2 className="text-[var(--color-text)] mb-6">Appearance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-hover)]/30">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-[var(--color-hover)]">
                      {theme === "light" ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-blue-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text)]">Theme</p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Currently using {theme} mode
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${theme === "dark" ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"}`}
                    role="switch"
                    aria-checked={theme === "dark"}
                    aria-label="Toggle dark mode"
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="card-elevated p-6 sm:p-8 animate-fade-in">
              <h2 className="text-[var(--color-text)] mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Email Notifications", desc: "Receive updates via email", value: emailNotifs, toggle: () => setEmailNotifs(!emailNotifs) },
                  { label: "Push Notifications", desc: "Browser push notifications", value: pushNotifs, toggle: () => setPushNotifs(!pushNotifs) },
                  { label: "Marketing Emails", desc: "Promotions and announcements", value: marketingNotifs, toggle: () => setMarketingNotifs(!marketingNotifs) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-hover)]/30">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text)]">{item.label}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={item.toggle}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${item.value ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"}`}
                      role="switch"
                      aria-checked={item.value}
                      aria-label={item.label}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${item.value ? "translate-x-6" : "translate-x-0.5"}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <Button onClick={() => addToast("success", "Notification preferences saved")}>Save Preferences</Button>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="card-elevated p-6 sm:p-8 animate-fade-in">
              <h2 className="text-[var(--color-text)] mb-6">Change Password</h2>
              <div className="flex flex-col gap-5 max-w-md">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  helperText="At least 6 characters"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-8">
                <Button onClick={handleChangePassword}>Update Password</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
