"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/search";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

interface StickyAddToCartProps {
  product: Product;
}

export function StickyAddToCart({ product }: StickyAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = () => {
    addItem(product, quantity);
    addToast(`${product.name} added to cart`);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 p-4 backdrop-blur-lg transition-transform duration-300 dark:border-gray-800 dark:bg-gray-950/95 md:bottom-auto md:static md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none ${
        visible ? "translate-y-0" : "translate-y-full md:translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <div className="hidden md:block">
          <p className="text-2xl font-bold text-charcoal dark:text-gray-100">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((q) => q + 1)}
          onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          size="lg"
          className="shrink-0"
        />
        <Button size="lg" className="flex-1 md:flex-none md:px-12" onClick={handleAdd}>
          Add to Cart — {formatPrice(product.price * quantity)}
        </Button>
      </div>
    </div>
  );
}
