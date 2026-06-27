"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Plus, Heart } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cart";
import { useWishlistStore, useToastStore } from "@/store/search";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const addToast = useToastStore((s) => s.addToast);
  const inWishlist = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    addToast(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast("Removed from wishlist", "info");
    } else {
      addToWishlist(product);
      addToast("Added to wishlist");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 45vw, 200px"
            />
            {product.discount && (
              <Badge variant="discount" className="absolute left-2 top-2">
                {product.discount}% OFF
              </Badge>
            )}
            <button
              onClick={handleWishlist}
              className={cn(
                "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-colors",
                inWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
              )}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </button>
          </div>

          <h3 className="mb-0.5 line-clamp-2 text-sm font-semibold text-charcoal dark:text-gray-100">
            {product.name}
          </h3>
          <p className="mb-2 text-xs text-gray-500">{product.weight}</p>

          <div className="mb-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-charcoal dark:text-gray-200">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{product.deliveryMinutes} min</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-charcoal dark:text-gray-100">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAdd}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-sm shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-md active:scale-95"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
