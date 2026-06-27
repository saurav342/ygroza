"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Mic, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { searchProducts } from "@/data/products";
import { POPULAR_SEARCHES } from "@/lib/constants";
import { useSearchStore } from "@/store/search";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ReturnType<typeof searchProducts>>([]);
  const { recentSearches, addRecentSearch, clearRecentSearches } = useSearchStore();
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      setSuggestions(searchProducts(query).slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = useCallback(
    (q: string) => {
      if (!q.trim()) return;
      addRecentSearch(q);
      onClose();
      router.push(`/search?q=${encodeURIComponent(q)}`);
    },
    [addRecentSearch, onClose, router]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-1/2 top-4 z-[70] w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-2 border-b border-gray-100 p-3 dark:border-gray-800">
                <div className="flex-1">
                  <Input
                    icon={<Search className="h-4 w-4" />}
                    placeholder="Search groceries, fruits, snacks…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                    autoFocus
                  />
                </div>
                <Button variant="ghost" size="icon" aria-label="Voice search">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close search">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {query.length > 1 && suggestions.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Suggestions
                    </p>
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          onClose();
                          router.push(`/product/${product.id}`);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-charcoal dark:text-gray-200">
                          {product.name}
                        </span>
                        <span className="ml-auto text-xs text-gray-400">{product.weight}</span>
                      </button>
                    ))}
                  </div>
                )}

                {recentSearches.length > 0 && query.length <= 1 && (
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        <Clock className="h-3.5 w-3.5" />
                        Recent
                      </p>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-brand hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSearch(s)}
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-charcoal transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {query.length <= 1 && (
                  <div className="mb-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Popular
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSearch(s)}
                          className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-medium text-brand-dark transition-colors hover:bg-brand/20 dark:bg-brand/20 dark:text-brand"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onClose();
                          router.push(`/category/${cat.slug}`);
                        }}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                          "border border-gray-200 hover:border-brand hover:bg-brand-light dark:border-gray-700"
                        )}
                      >
                        <span>{cat.icon}</span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
