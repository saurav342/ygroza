import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Groza — Groceries Delivered in Minutes",
    template: "%s | Groza",
  },
  description:
    "Fresh groceries, everyday essentials, and more delivered across Australia in minutes. Shop fruits, vegetables, dairy, bakery, and more.",
  keywords: ["grocery delivery", "Australia", "instant delivery", "fresh groceries", "online shopping"],
  authors: [{ name: "Groza" }],
  openGraph: {
    title: "Groza — Groceries Delivered in Minutes",
    description: "Fresh groceries delivered across Australia in minutes.",
    type: "website",
    locale: "en_AU",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Groza",
  },
};

export const viewport: Viewport = {
  themeColor: "#16A34A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-charcoal dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
