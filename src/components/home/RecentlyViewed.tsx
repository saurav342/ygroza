"use client";

import { useRecentlyViewedStore } from "@/store/search";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/home/CollectionScroll";

export function RecentlyViewedSection() {
  const products = useRecentlyViewedStore((s) => s.products);

  if (products.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Recently Viewed" />
      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-4 lg:gap-4">
        {products.map((product) => (
          <div key={product.id} className="w-[160px] shrink-0 sm:w-auto">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
