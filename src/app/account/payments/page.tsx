"use client";

import { CreditCard, Plus } from "lucide-react";
import { useUserStore } from "@/store/user";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/Button";

const paymentLabels: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  apple_pay: "Apple Pay",
  google_pay: "Google Pay",
  paypal: "PayPal",
};

export default function PaymentsPage() {
  const paymentMethods = useUserStore((s) => s.paymentMethods);

  return (
    <AccountLayout>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-charcoal dark:text-gray-100">Payment Methods</h2>
        <Button size="sm" variant="outline" className="gap-1">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
      <div className="space-y-3">
        {paymentMethods.map((pm) => (
          <div
            key={pm.id}
            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              <CreditCard className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-charcoal dark:text-gray-100">
                {paymentLabels[pm.type]}
                {pm.last4 && ` •••• ${pm.last4}`}
              </p>
              {pm.expiry && <p className="text-xs text-gray-500">Expires {pm.expiry}</p>}
            </div>
            {pm.isDefault && (
              <span className="rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-medium text-brand">
                Default
              </span>
            )}
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
