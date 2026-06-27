import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getCollectionBySlug } from "@/data/collections";
import { getProductsByCollection } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(collection.id);

  return (
    <div>
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>

      <div className="relative mb-6 h-40 overflow-hidden rounded-3xl sm:h-48">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 flex flex-col justify-end p-6"
          style={{ background: `linear-gradient(to top, ${collection.color}dd, transparent)` }}
        >
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{collection.name}</h1>
          <p className="text-sm text-white/80">{collection.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="py-12 text-center text-gray-500">No products in this collection yet.</p>
      )}
    </div>
  );
}
