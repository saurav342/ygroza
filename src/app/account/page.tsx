"use client";

import Link from "next/link";
import { Package, MapPin, Gift, Truck, ChevronRight } from "lucide-react";
import { useUserStore } from "@/store/user";
import { AccountLayout } from "@/components/account/AccountLayout";
import { DeliveryTimer } from "@/components/ui/DeliveryTimer";
import { formatPrice } from "@/lib/utils";

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  out_for_delivery: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  preparing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  confirmed: "bg-brand-light text-brand-dark",
  pending: "bg-gray-100 text-gray-600",
};

export default function AccountDashboard() {
  const { user, orders } = useUserStore();
  const activeOrder = orders.find((o) => o.status === "out_for_delivery");

  return (
    <AccountLayout>
      <div className="space-y-6">
        {activeOrder && (
          <div className="rounded-2xl border border-brand/20 bg-brand-light/50 p-4 dark:bg-brand/10">
            <div className="mb-2 flex items-center gap-2">
              <Truck className="h-5 w-5 text-brand" />
              <span className="font-semibold text-charcoal dark:text-gray-100">Order on the way!</span>
            </div>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              Order {activeOrder.id} is out for delivery
            </p>
            <DeliveryTimer minutes={12} />
            <Link
              href="/account/orders"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand"
            >
              Track order <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <Gift className="mb-2 h-5 w-5 text-brand" />
            <p className="text-2xl font-bold text-charcoal dark:text-gray-100">
              {user.loyaltyPoints.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">Loyalty Points</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <Package className="mb-2 h-5 w-5 text-brand" />
            <p className="text-2xl font-bold text-charcoal dark:text-gray-100">{orders.length}</p>
            <p className="text-xs text-gray-500">Total Orders</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <MapPin className="mb-2 h-5 w-5 text-brand" />
            <p className="text-2xl font-bold text-charcoal dark:text-gray-100">2</p>
            <p className="text-xs text-gray-500">Saved Addresses</p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-charcoal dark:text-gray-100">Recent Orders</h2>
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <div>
                  <p className="font-semibold text-charcoal dark:text-gray-100">{order.id}</p>
                  <p className="text-sm text-gray-500">{formatPrice(order.total)}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusColors[order.status]}`}
                >
                  {order.status.replace(/_/g, " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
