"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <motion.div whileTap={{ scale: 0.97 }} className={cn("shrink-0", className)}>
      <Link href={`/category/${category.slug}`}>
        <div
          className="flex w-[100px] flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:w-[120px]"
          style={{ backgroundColor: category.color + "40" }}
        >
          <span className="text-3xl" role="img" aria-label={category.name}>
            {category.icon}
          </span>
          <span className="text-center text-xs font-medium leading-tight text-charcoal dark:text-gray-200">
            {category.name}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

interface CategoryScrollProps {
  categories: Category[];
}

export function CategoryScroll({ categories }: CategoryScrollProps) {
  return (
    <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
