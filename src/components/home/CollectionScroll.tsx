"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Collection } from "@/types";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
  className?: string;
}

export function CollectionCard({ collection, className }: CollectionCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={cn("shrink-0", className)}>
      <Link href={`/collection/${collection.slug}`}>
        <div className="relative h-32 w-44 overflow-hidden rounded-2xl shadow-sm sm:h-36 sm:w-52">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover"
            sizes="200px"
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-3"
            style={{
              background: `linear-gradient(to top, ${collection.color}ee, transparent)`,
            }}
          >
            <h3 className="text-sm font-bold text-white">{collection.name}</h3>
            <p className="line-clamp-1 text-[10px] text-white/80">{collection.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface CollectionScrollProps {
  collections: Collection[];
}

export function CollectionScroll({ collections }: CollectionScrollProps) {
  return (
    <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

export function SectionHeader({ title, subtitle, href, linkText = "See all" }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 className="text-lg font-bold text-charcoal dark:text-gray-100 sm:text-xl">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
        >
          {linkText}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
