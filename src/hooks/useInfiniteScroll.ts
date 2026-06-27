"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({ hasMore, onLoadMore, threshold = 200 }: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node || !hasMore) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) onLoadMore();
        },
        { rootMargin: `${threshold}px` }
      );
      observerRef.current.observe(node);
    },
    [hasMore, onLoadMore, threshold]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return loadMoreRef;
}
