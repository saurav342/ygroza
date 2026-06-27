"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { flashDeals } from "@/data/promotions";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { SectionHeader } from "@/components/home/CollectionScroll";

function Countdown({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Ended");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  return <span className="font-mono text-xs font-bold text-red-600">{timeLeft}</span>;
}

export function FlashDeals() {
  const deals = flashDeals
    .map((deal) => ({ deal, product: getProductById(deal.productId) }))
    .filter((d) => d.product);

  return (
    <section>
      <SectionHeader title="Flash Deals" subtitle="Limited time offers — hurry!" />
      <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {deals.map(({ deal, product }) => (
          <motion.div
            key={deal.id}
            whileHover={{ scale: 1.02 }}
            className="shrink-0"
          >
            <Link href={`/product/${product!.id}`}>
              <div className="flex w-64 items-center gap-3 rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 to-orange-50 p-3 dark:border-red-900/30 dark:from-red-950/30 dark:to-orange-950/30">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={product!.image}
                    alt={product!.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-1">
                    <Zap className="h-3 w-3 text-red-500" />
                    <span className="text-[10px] font-bold uppercase text-red-500">
                      {deal.discount}% OFF
                    </span>
                  </div>
                  <p className="truncate text-sm font-semibold text-charcoal dark:text-gray-100">
                    {product!.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-brand">
                      {formatPrice(product!.price)}
                    </span>
                    <Countdown endsAt={deal.endsAt} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
