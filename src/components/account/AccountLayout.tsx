"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Heart,
  CreditCard,
  Gift,
  Bell,
  Settings,
  Users,
  ChevronRight,
} from "lucide-react";
import { useUserStore } from "@/store/user";
import { cn } from "@/lib/utils";

const accountLinks = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/addresses", label: "Saved Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/payments", label: "Payment Methods", icon: CreditCard },
  { href: "/account/rewards", label: "Rewards", icon: Gift },
  { href: "/account/referral", label: "Referral Program", icon: Users },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1" aria-label="Account navigation">
      {accountLinks.map(({ href, label, icon: Icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-light text-brand-dark dark:bg-brand/20 dark:text-brand"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
            <ChevronRight className="ml-auto h-4 w-4 opacity-40" />
          </Link>
        );
      })}
    </nav>
  );
}

export function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-white">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-charcoal dark:text-gray-100">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>
        <div className="lg:col-span-3">{children}</div>
      </div>

      <div className="mt-6 lg:hidden">
        <AccountNav />
      </div>
    </div>
  );
}
