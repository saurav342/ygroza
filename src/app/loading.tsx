import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div className="space-y-8">
      <div className="h-64 animate-pulse rounded-3xl bg-gray-100 dark:bg-gray-800" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 w-24 shrink-0 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
