"use client";

import type { Product } from "@/types";
import { useRecentlyViewedStore } from "@/store/search";
import { useEffect } from "react";

export function ProductViewTracker({ product }: { product: Product }) {
  const addProduct = useRecentlyViewedStore((s) => s.addProduct);

  useEffect(() => {
    addProduct(product);
  }, [product, addProduct]);

  return null;
}
