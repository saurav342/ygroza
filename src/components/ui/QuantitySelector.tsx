"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { btn: "h-7 w-7", text: "text-sm w-6" },
  md: { btn: "h-8 w-8", text: "text-sm w-8" },
  lg: { btn: "h-10 w-10", text: "text-base w-10" },
};

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const s = sizes[size];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900",
        className
      )}
    >
      <button
        onClick={onDecrease}
        className={cn(
          "flex items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-charcoal dark:hover:bg-gray-800",
          s.btn
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className={cn("text-center font-semibold text-charcoal dark:text-gray-100", s.text)}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={cn(
          "flex items-center justify-center rounded-lg text-brand transition-colors hover:bg-brand-light dark:hover:bg-brand/20",
          s.btn
        )}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
