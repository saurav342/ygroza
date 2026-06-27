"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/search";
import { formatPrice } from "@/lib/utils";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function PromoCode() {
  const [code, setCode] = useState("");
  const { promoCode, applyPromo, removePromo } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);

  const handleApply = () => {
    if (promoCode) {
      removePromo();
      setCode("");
      return;
    }
    const success = applyPromo(code);
    if (success) {
      addToast("Promo code applied!");
    } else {
      addToast("Invalid promo code or minimum not met", "error");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-2 flex items-center gap-2">
        <Tag className="h-4 w-4 text-brand" />
        <span className="text-sm font-semibold text-charcoal dark:text-gray-100">Promo Code</span>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Enter code (e.g. GROZA10)"
          value={promoCode || code}
          onChange={(e) => setCode(e.target.value)}
          disabled={!!promoCode}
        />
        <Button variant={promoCode ? "outline" : "primary"} onClick={handleApply} className="shrink-0">
          {promoCode ? "Remove" : "Apply"}
        </Button>
      </div>
    </div>
  );
}

export function OrderSummary({ showCheckout = true }: { showCheckout?: boolean }) {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDeliveryFee = useCartStore((s) => s.getDeliveryFee);
  const getGST = useCartStore((s) => s.getGST);
  const getTotal = useCartStore((s) => s.getTotal);
  const promoDiscount = useCartStore((s) => s.promoDiscount);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const gst = getGST();
  const total = getTotal();

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold text-charcoal dark:text-gray-100">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {promoDiscount > 0 && (
          <div className="flex justify-between text-brand">
            <span>Promo discount</span>
            <span>-{formatPrice(promoDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Delivery fee</span>
          <span>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
        </div>
        {subtotal < FREE_DELIVERY_THRESHOLD && subtotal > 0 && (
          <p className="text-xs text-brand">
            Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery
          </p>
        )}
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>GST (10%)</span>
          <span>{formatPrice(gst)}</span>
        </div>
        <div className="border-t border-gray-100 pt-2 dark:border-gray-800">
          <div className="flex justify-between text-base font-bold text-charcoal dark:text-gray-100">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      {showCheckout && (
        <a href="/checkout" className="mt-4 block">
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </a>
      )}
    </div>
  );
}
