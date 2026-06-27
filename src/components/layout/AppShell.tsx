"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { ToastContainer } from "@/components/ui/Toast";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearchClick = () => {
    if (window.innerWidth < 768) {
      router.push("/search");
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-subtle dark:bg-gray-950">
      <Header onSearchClick={handleSearchClick} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-4">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <ToastContainer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
