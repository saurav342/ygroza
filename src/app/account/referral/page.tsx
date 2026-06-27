"use client";

import { Users, Copy, Share2 } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useToastStore } from "@/store/search";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/Button";

export default function ReferralPage() {
  const user = useUserStore((s) => s.user);
  const addToast = useToastStore((s) => s.addToast);

  const copyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    addToast("Referral code copied!");
  };

  return (
    <AccountLayout>
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <Users className="mb-2 h-6 w-6" />
        <h2 className="mb-1 text-xl font-bold">Refer & Earn $10</h2>
        <p className="mb-4 text-sm text-white/80">
          Share your code with friends. You both get $10 off when they place their first order.
        </p>
        <div className="flex items-center gap-2 rounded-xl bg-white/20 p-3 backdrop-blur-sm">
          <code className="flex-1 text-lg font-bold tracking-wider">{user.referralCode}</code>
          <Button
            size="sm"
            variant="secondary"
            onClick={copyCode}
            className="gap-1 bg-white text-indigo-600 hover:bg-white/90"
          >
            <Copy className="h-4 w-4" /> Copy
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 font-semibold text-charcoal dark:text-gray-100">How it works</h3>
        <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand">1</span>
            Share your referral code with friends
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand">2</span>
            They sign up and place their first order
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand">3</span>
            You both receive $10 credit instantly
          </li>
        </ol>
        <Button className="mt-4 gap-2" variant="outline">
          <Share2 className="h-4 w-4" /> Share via Message
        </Button>
      </div>
    </AccountLayout>
  );
}
