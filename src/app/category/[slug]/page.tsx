import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return { title: category.name, description: `Shop ${category.name} on Groza` };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);

  return (
    <div>
      <Link
        href="/categories"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" /> Categories
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-charcoal dark:text-gray-100">{category.name}</h1>
          <p className="text-sm text-gray-500">{products.length} products</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="py-12 text-center text-gray-500">No products in this category yet.</p>
      )}
    </div>
  );
}
