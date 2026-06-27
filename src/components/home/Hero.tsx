"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeliveryTimer } from "@/components/ui/DeliveryTimer";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-light via-white to-green-50 p-6 dark:from-brand/10 dark:via-gray-900 dark:to-gray-900 sm:p-10">
      <div className="relative z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-brand shadow-sm backdrop-blur-sm dark:bg-gray-800/80">
            <Zap className="h-3.5 w-3.5" />
            Now delivering across Australia
          </div>
          <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-charcoal dark:text-white sm:text-4xl lg:text-5xl">
            Groceries delivered in{" "}
            <span className="text-brand">minutes</span>
          </h1>
          <p className="mb-6 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Fresh groceries, everyday essentials, and more delivered across Australia.
          </p>
          <div className="mb-6">
            <DeliveryTimer minutes={15} />
          </div>
          <Link href="/category/fruits-vegetables">
            <Button size="lg" className="gap-2">
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -right-4 -top-4 hidden h-full w-1/2 md:block">
        <div className="relative h-full w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute right-8 top-8 h-32 w-32 overflow-hidden rounded-3xl shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop"
              alt="Fresh vegetables"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-32 top-32 h-28 w-28 overflow-hidden rounded-3xl shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1610839634175-cdea9e670780?w=300&h=300&fit=crop"
              alt="Fresh fruits"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute right-4 top-48 h-24 w-24 overflow-hidden rounded-3xl shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop"
              alt="Fresh bakery"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
