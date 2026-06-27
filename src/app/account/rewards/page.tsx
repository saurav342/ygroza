"use client";

import { Gift, Star } from "lucide-react";
import { useUserStore } from "@/store/user";
import { AccountLayout } from "@/components/account/AccountLayout";

const rewards = [
  { title: "Free Delivery", points: 500, description: "Free delivery on your next order" },
  { title: "$5 Off", points: 1000, description: "$5 discount on orders over $30" },
  { title: "$10 Off", points: 2000, description: "$10 discount on orders over $50" },
  { title: "Premium Box", points: 5000, description: "Curated premium grocery box" },
];

export default function RewardsPage() {
  const user = useUserStore((s) => s.user);

  return (
    <AccountLayout>
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-brand to-green-600 p-6 text-white">
        <Gift className="mb-2 h-6 w-6" />
        <p className="text-3xl font-bold">{user.loyaltyPoints.toLocaleString()}</p>
        <p className="text-sm text-white/80">Available Points</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${Math.min((user.loyaltyPoints / 5000) * 100, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-white/70">
          {5000 - user.loyaltyPoints > 0
            ? `${(5000 - user.loyaltyPoints).toLocaleString()} points to Premium Box`
            : "You've unlocked all rewards!"}
        </p>
      </div>

      <h2 className="mb-4 text-lg font-bold text-charcoal dark:text-gray-100">Redeem Rewards</h2>
      <div className="space-y-3">
        {rewards.map((reward) => (
          <div
            key={reward.title}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-amber-400" />
              <div>
                <p className="font-semibold text-charcoal dark:text-gray-100">{reward.title}</p>
                <p className="text-xs text-gray-500">{reward.description}</p>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                user.loyaltyPoints >= reward.points
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800"
              }`}
            >
              {reward.points.toLocaleString()} pts
            </span>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
