"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUserStore } from "@/store/user";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearchClick?: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const selectedAddress = useUserStore((s) => s.selectedAddress);

  const hideOnPages = ["/checkout", "/search"];
  if (hideOnPages.some((p) => pathname.startsWith(p))) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
              G
            </div>
            <span className="hidden text-lg font-bold text-charcoal dark:text-white sm:block">
              {BRAND.name}
            </span>
          </Link>

          <button
            className="hidden min-w-0 flex-1 items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex md:max-w-xs lg:max-w-sm"
            aria-label="Change delivery address"
          >
            <MapPin className="h-4 w-4 shrink-0 text-brand" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-charcoal dark:text-gray-200">
                {selectedAddress.label}
              </p>
              <p className="truncate text-[10px] text-gray-500">
                {selectedAddress.suburb}, {selectedAddress.state}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          </button>

          <button
            onClick={onSearchClick}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-400 transition-colors hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 md:max-w-md"
            aria-label="Search groceries"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">Search groceries, fruits, snacks…</span>
          </button>

          <Link
            href="/cart"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-charcoal transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label={`Cart with ${itemCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-charcoal transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 sm:flex"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>

        <button
          className="mt-2 flex w-full items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-2 text-left md:hidden dark:bg-gray-800"
          aria-label="Change delivery address"
        >
          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" />
          <span className="truncate text-xs text-gray-600 dark:text-gray-300">
            Deliver to <strong>{selectedAddress.label}</strong> — {selectedAddress.suburb}
          </span>
          <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
