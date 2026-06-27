"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/lib/constants";
import { calculateGST } from "@/lib/utils";
import { coupons } from "@/data/promotions";

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getGST: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      applyPromo: (code) => {
        const coupon = coupons.find((c) => c.code.toLowerCase() === code.toLowerCase());
        if (!coupon) return false;
        const subtotal = get().getSubtotal();
        if (subtotal < coupon.minOrder) return false;
        const discount =
          coupon.type === "percentage"
            ? (subtotal * coupon.discount) / 100
            : coupon.discount;
        set({ promoCode: coupon.code, promoDiscount: discount });
        return true;
      },

      removePromo: () => set({ promoCode: null, promoDiscount: 0 }),

      getSubtotal: () => {
        return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
      },

      getGST: () => {
        const subtotal = get().getSubtotal() - get().promoDiscount;
        return calculateGST(Math.max(0, subtotal));
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().promoDiscount;
        const delivery = get().getDeliveryFee();
        const gst = get().getGST();
        return Math.max(0, subtotal - discount + delivery + gst);
      },

      getItemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: "groza-cart" }
  )
);
