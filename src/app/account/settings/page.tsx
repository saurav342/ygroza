"use client";

import { Moon, Sun, Monitor, Bell, Shield, LogOut } from "lucide-react";
import { useThemeStore } from "@/store/theme";
import { useUserStore } from "@/store/user";
import { AccountLayout } from "@/components/account/AccountLayout";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const user = useUserStore((s) => s.user);

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <AccountLayout>
      <h2 className="mb-4 text-lg font-bold text-charcoal dark:text-gray-100">Settings</h2>

      <div className="space-y-6">
        <section className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-3 text-sm font-semibold text-charcoal dark:text-gray-100">Profile</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium">{user.phone}</span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-3 text-sm font-semibold text-charcoal dark:text-gray-100">Appearance</h3>
          <div className="flex gap-2">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-xl border p-3 text-xs font-medium transition-colors",
                  theme === value
                    ? "border-brand bg-brand-light text-brand-dark dark:bg-brand/20 dark:text-brand"
                    : "border-gray-200 text-gray-500 dark:border-gray-700"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
          {[
            { icon: Bell, label: "Push Notifications", desc: "Order updates & deals" },
            { icon: Shield, label: "Privacy & Security", desc: "Manage your data" },
          ].map(({ icon: Icon, label, desc }) => (
            <button
              key={label}
              className="flex w-full items-center gap-3 border-b border-gray-100 p-4 text-left last:border-0 dark:border-gray-800"
            >
              <Icon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-charcoal dark:text-gray-100">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </button>
          ))}
        </section>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 p-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </AccountLayout>
  );
}
