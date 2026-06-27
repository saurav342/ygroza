"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-charcoal dark:text-gray-100">Checkout</h1>
      <CheckoutFlow />
    </div>
  );
}
