"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { CartItemRow } from "@/components/cart/CartItem";
import { PromoCode, OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="mb-2 text-xl font-bold text-charcoal dark:text-gray-100">
          Your cart is empty
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Add some groceries to get started
        </p>
        <Link href="/">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-charcoal dark:text-gray-100">
        Your Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)
      </h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => (
            <CartItemRow key={item.product.id} productId={item.product.id} />
          ))}
        </div>

        <div className="space-y-4">
          <PromoCode />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
