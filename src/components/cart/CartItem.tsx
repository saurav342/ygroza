"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function CartItemRow({ productId }: { productId: string }) {
  const item = useCartStore((s) => s.items.find((i) => i.product.id === productId));
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!item) return null;
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <Link href={`/product/${product.id}`} className="shrink-0">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="80px" />
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="truncate text-sm font-semibold text-charcoal dark:text-gray-100">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-500">{product.weight}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-charcoal dark:text-gray-100">
            {formatPrice(product.price * quantity)}
          </span>
          <div className="flex items-center gap-2">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => updateQuantity(product.id, quantity + 1)}
              onDecrease={() => updateQuantity(product.id, quantity - 1)}
              size="sm"
            />
            <button
              onClick={() => removeItem(product.id)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label="Remove item"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
