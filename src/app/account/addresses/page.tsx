"use client";

import { MapPin, Plus } from "lucide-react";
import { useUserStore } from "@/store/user";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Button } from "@/components/ui/Button";

export default function AddressesPage() {
  const addresses = useUserStore((s) => s.addresses);

  return (
    <AccountLayout>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-charcoal dark:text-gray-100">Saved Addresses</h2>
        <Button size="sm" variant="outline" className="gap-1">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
      <div className="space-y-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-charcoal dark:text-gray-100">{addr.label}</span>
                {addr.isDefault && (
                  <span className="rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-medium text-brand">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {addr.street}, {addr.suburb} {addr.state} {addr.postcode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
