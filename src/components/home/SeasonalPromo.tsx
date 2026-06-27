"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, Users, Tag } from "lucide-react";

const promos = [
  {
    icon: Tag,
    title: "GROZA10",
    description: "10% off orders over $30",
    color: "from-brand to-green-600",
  },
  {
    icon: Gift,
    title: "Earn Rewards",
    description: "2,450 points available",
    color: "from-amber-500 to-orange-500",
    href: "/account/rewards",
  },
  {
    icon: Users,
    title: "Refer & Earn",
    description: "Get $10 for each friend",
    color: "from-blue-500 to-indigo-500",
    href: "/account/referral",
  },
];

export function SeasonalPromo() {
  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-3">
        {promos.map((promo, i) => (
          <motion.div
            key={promo.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {promo.href ? (
              <Link href={promo.href}>
                <PromoCard {...promo} />
              </Link>
            ) : (
              <PromoCard {...promo} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PromoCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl bg-gradient-to-r ${color} p-4 text-white shadow-sm`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-white/80">{description}</p>
      </div>
    </div>
  );
}
