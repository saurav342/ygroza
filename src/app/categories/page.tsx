import Link from "next/link";
import { categories } from "@/data/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all grocery categories on Groza",
};

export default function CategoriesPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-charcoal dark:text-gray-100">All Categories</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <div
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              style={{ backgroundColor: category.color + "30" }}
            >
              <span className="text-4xl">{category.icon}</span>
              <span className="text-center text-sm font-medium text-charcoal dark:text-gray-200">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
