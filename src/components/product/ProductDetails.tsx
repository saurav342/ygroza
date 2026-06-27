"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-800">
        <Image
          src={images[activeIndex]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
                i === activeIndex ? "border-brand" : "border-transparent"
              )}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

import { getReviewsByProduct } from "@/data/reviews";
import type { Review } from "@/types";

export function Reviews({ productId, rating, reviewCount }: ReviewsProps) {
  const reviews = getReviewsByProduct(productId);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-3">
        <div className="text-center">
          <p className="text-3xl font-bold text-charcoal dark:text-gray-100">{rating}</p>
          <div className="flex justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">{reviewCount} reviews</p>
        </div>
      </div>
      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review: Review) => (
            <div key={review.id} className="border-t border-gray-100 pt-3 dark:border-gray-800">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-semibold text-charcoal dark:text-gray-200">
                  {review.author}
                </span>
                {review.verified && (
                  <span className="rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-medium text-brand">
                    Verified
                  </span>
                )}
              </div>
              <div className="mb-1 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
}
