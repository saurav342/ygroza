"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
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
    <>
      <Header onSearchClick={handleSearchClick} />
      <main className="mx-auto min-h-screen max-w-7xl flex-1 px-4 pb-24 pt-4 md:pb-8">
        {children}
      </main>
      <BottomNav />
      <ToastContainer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
