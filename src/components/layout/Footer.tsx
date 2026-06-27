"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Apple,
  Smartphone,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { categories } from "@/data/categories";

const shopLinks = [
  { label: "Weekly Specials", href: "/collection/weekly-specials" },
  { label: "Fresh Today", href: "/collection/fresh-today" },
  { label: "Best Sellers", href: "/collection/best-sellers" },
  { label: "Organic Picks", href: "/collection/organic-picks" },
  { label: "Under $10", href: "/collection/under-10" },
];

const companyLinks = [
  { label: "About Groza", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Partner with Us", href: "#" },
  { label: "Blog", href: "#" },
];

const supportLinks = [
  { label: "Help Centre", href: "#" },
  { label: "Track Order", href: "/account/orders" },
  { label: "Delivery Areas", href: "#" },
  { label: "Returns & Refunds", href: "#" },
  { label: "Contact Us", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const paymentMethods = ["Visa", "Mastercard", "Apple Pay", "Google Pay", "PayPal"];

export function Footer() {
  const pathname = usePathname();

  const hideOnPages = ["/checkout"];
  if (hideOnPages.some((p) => pathname.startsWith(p))) return null;

  return (
    <footer className="mt-auto border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 pb-28 md:pb-10">
        {/* Top CTA strip */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand px-6 py-6 text-white sm:flex-row sm:px-8">
          <div>
            <p className="text-lg font-bold">Get groceries in minutes</p>
            <p className="text-sm text-white/80">
              Download the Groza app for exclusive deals and faster checkout.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/25">
              <Apple className="h-5 w-5" />
              App Store
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/25">
              <Smartphone className="h-5 w-5" />
              Google Play
            </button>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-3 inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
                G
              </div>
              <span className="text-lg font-bold text-charcoal dark:text-white">{BRAND.name}</span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-gray-500">
              Fresh groceries, everyday essentials, and more — delivered across Australia in minutes.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand" />
                Melbourne, Sydney, Brisbane & more
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                hello@groza.com.au
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                1800 GROZA (476 92)
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-brand hover:text-brand dark:border-gray-700 dark:hover:border-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-charcoal dark:text-gray-100">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-charcoal dark:text-gray-100">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-500 transition-colors hover:text-brand"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/categories"
                  className="text-sm font-medium text-brand hover:underline"
                >
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-charcoal dark:text-gray-100">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-charcoal dark:text-gray-100">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {BRAND.name} Pty Ltd. ABN 12 345 678 901. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-gray-400 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-[10px] font-medium text-gray-500 dark:border-gray-700"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
