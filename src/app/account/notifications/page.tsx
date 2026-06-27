"use client";

import { Bell, Package, Tag, Truck } from "lucide-react";
import { AccountLayout } from "@/components/account/AccountLayout";

const notifications = [
  {
    id: "1",
    icon: Truck,
    title: "Order on the way",
    message: "Your order GRZ-2026-002 is out for delivery. ETA: 12 minutes.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: "2",
    icon: Tag,
    title: "Flash Deal Alert",
    message: "20% off Hass Avocados — ends in 2 hours!",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    icon: Package,
    title: "Order Delivered",
    message: "Your order GRZ-2026-001 has been delivered. Enjoy!",
    time: "Jun 20",
    unread: false,
  },
  {
    id: "4",
    icon: Bell,
    title: "Welcome to Groza!",
    message: "Use code WELCOME15 for 15% off your first order over $40.",
    time: "Jun 15",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <AccountLayout>
      <h2 className="mb-4 text-lg font-bold text-charcoal dark:text-gray-100">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <div
              key={notif.id}
              className={`flex gap-3 rounded-2xl border p-4 transition-colors ${
                notif.unread
                  ? "border-brand/20 bg-brand-light/30 dark:bg-brand/10"
                  : "border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-gray-800">
                <Icon className="h-5 w-5 text-brand" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-charcoal dark:text-gray-100">{notif.title}</p>
                  <span className="shrink-0 text-xs text-gray-400">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{notif.message}</p>
              </div>
              {notif.unread && (
                <div className="h-2 w-2 shrink-0 rounded-full bg-brand" />
              )}
            </div>
          );
        })}
      </div>
    </AccountLayout>
  );
}
