"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Mic, X, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { categories } from "@/data/categories";
import { searchProducts } from "@/data/products";
import { POPULAR_SEARCHES } from "@/lib/constants";
import { useSearchStore } from "@/store/search";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [allResults, setAllResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { recentSearches, addRecentSearch, clearRecentSearches } = useSearchStore();

  const performSearch = useCallback(
    (q: string, categoryId?: string | null) => {
      setLoading(true);
      setPage(1);
      setTimeout(() => {
        let filtered = searchProducts(q);
        if (categoryId) {
          filtered = filtered.filter((p) => p.categoryId === categoryId);
        }
        setAllResults(filtered);
        setResults(filtered.slice(0, PAGE_SIZE));
        setLoading(false);
      }, 300);
    },
    []
  );

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const nextResults = allResults.slice(0, nextPage * PAGE_SIZE);
    if (nextResults.length > results.length) {
      setResults(nextResults);
      setPage(nextPage);
    }
  }, [page, allResults, results.length]);

  const hasMore = results.length < allResults.length;
  const loadMoreRef = useInfiniteScroll({ hasMore, onLoadMore: loadMore });

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, selectedCategory);
    }
  }, [initialQuery, selectedCategory, performSearch]);

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    addRecentSearch(q);
    router.replace(`/search?q=${encodeURIComponent(q)}`);
    performSearch(q, selectedCategory);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
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
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setQuery("");
              setResults([]);
              router.replace("/search");
            }}
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            !selectedCategory
              ? "bg-brand text-white"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              selectedCategory === cat.id
                ? "bg-brand text-white"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            )}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {!query && (
        <>
          {recentSearches.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-charcoal dark:text-gray-200">
                  <Clock className="h-4 w-4" /> Recent Searches
                </p>
                <button onClick={clearRecentSearches} className="text-xs text-brand">
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-sm dark:bg-gray-800"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-charcoal dark:text-gray-200">
              <TrendingUp className="h-4 w-4" /> Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSearch(s)}
                  className="rounded-full bg-brand-light px-3 py-1.5 text-sm font-medium text-brand-dark dark:bg-brand/20 dark:text-brand"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <p className="mb-3 text-sm text-gray-500">{allResults.length} results for &ldquo;{query}&rdquo;</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {hasMore && (
            <div ref={loadMoreRef} className="mt-4 flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            </div>
          )}
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg font-semibold text-charcoal dark:text-gray-200">No results found</p>
          <p className="text-sm text-gray-500">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
