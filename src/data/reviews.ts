import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    author: "Sarah M.",
    rating: 5,
    comment: "Always perfectly ripe! These avocados are the best I've had from any delivery service.",
    date: "2026-06-15",
    verified: true,
  },
  {
    id: "2",
    productId: "1",
    author: "James K.",
    rating: 4,
    comment: "Good quality, arrived fresh. One was slightly overripe but still usable.",
    date: "2026-06-10",
    verified: true,
  },
  {
    id: "3",
    productId: "2",
    author: "Emma L.",
    rating: 5,
    comment: "Tastes so fresh! Delivered cold and well before expiry date.",
    date: "2026-06-18",
    verified: true,
  },
  {
    id: "4",
    productId: "8",
    author: "Tom R.",
    rating: 5,
    comment: "Can't go wrong with Tim Tams. Arrived intact, not melted!",
    date: "2026-06-12",
    verified: true,
  },
  {
    id: "5",
    productId: "4",
    author: "Lisa W.",
    rating: 5,
    comment: "Beautiful orange yolks. You can tell these are truly free range.",
    date: "2026-06-08",
    verified: true,
  },
];

export function getReviewsByProduct(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}
