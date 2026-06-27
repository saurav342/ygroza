"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/search";
import { AccountLayout } from "@/components/account/AccountLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <AccountLayout>
      <h2 className="mb-4 text-lg font-bold text-charcoal dark:text-gray-100">Wishlist</h2>
      {items.length === 0 ? (
        <div className="py-12 text-center">
          <Heart className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-gray-500">Your wishlist is empty</p>
          <Link href="/" className="mt-4 inline-block">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
