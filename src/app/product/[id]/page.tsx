import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Leaf } from "lucide-react";
import { getProductById, getRelatedProducts, getFrequentlyBoughtTogether } from "@/data/products";
import { getCategoryById } from "@/data/categories";
import { ProductGallery, Reviews } from "@/components/product/ProductDetails";
import { StickyAddToCart } from "@/components/product/StickyAddToCart";
import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { DeliveryTimer } from "@/components/ui/DeliveryTimer";
import { formatPrice } from "@/lib/utils";
import { ProductViewTracker } from "@/components/product/ProductViewTracker";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = getCategoryById(product.categoryId);
  const related = getRelatedProducts(product.id);
  const boughtTogether = getFrequentlyBoughtTogether(product.id);

  return (
    <div className="pb-24">
      <ProductViewTracker product={product} />

      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {product.discount && <Badge variant="discount">{product.discount}% OFF</Badge>}
            {product.isOrganic && <Badge variant="organic">Organic</Badge>}
            {product.isAustralian && <Badge variant="aussie">Australian Made</Badge>}
          </div>

          <h1 className="text-2xl font-bold text-charcoal dark:text-gray-100 sm:text-3xl">
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">{product.weight}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-charcoal dark:text-gray-100">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <DeliveryTimer minutes={product.deliveryMinutes} />

          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
            >
              {category.icon} {category.name}
            </Link>
          )}

          <div className="hidden md:block">
            <StickyAddToCart product={product} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {product.nutrition && (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-charcoal dark:text-gray-100">
              <Leaf className="h-4 w-4 text-brand" /> Nutrition (per serving)
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(product.nutrition).map(([key, value]) => (
                <div key={key} className="flex justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm dark:bg-gray-800">
                  <span className="text-gray-500">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.ingredients && (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-3 font-semibold text-charcoal dark:text-gray-100">Ingredients</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {product.ingredients.join(", ")}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Reviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      {boughtTogether.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-charcoal dark:text-gray-100">
            Frequently Bought Together
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {boughtTogether.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-charcoal dark:text-gray-100">
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="md:hidden">
        <StickyAddToCart product={product} />
      </div>
    </div>
  );
}
