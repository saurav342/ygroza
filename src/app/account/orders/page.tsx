"use client";

import { Truck, CheckCircle, Package, Clock } from "lucide-react";
import { useUserStore } from "@/store/user";
import { AccountLayout } from "@/components/account/AccountLayout";
import { formatPrice, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusSteps = ["confirmed", "preparing", "out_for_delivery", "delivered"];

export default function OrdersPage() {
  const orders = useUserStore((s) => s.orders);

  return (
    <AccountLayout>
      <h2 className="mb-4 text-lg font-bold text-charcoal dark:text-gray-100">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => {
          const currentStep = statusSteps.indexOf(order.status);
          return (
            <div
              key={order.id}
              className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-charcoal dark:text-gray-100">{order.id}</p>
                  <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
                <p className="font-bold text-charcoal dark:text-gray-100">
                  {formatPrice(order.total)}
                </p>
              </div>

              {order.status !== "delivered" && (
                <div className="mb-4 flex items-center justify-between">
                  {statusSteps.map((step, i) => {
                    const icons = [Clock, Package, Truck, CheckCircle];
                    const Icon = icons[i];
                    return (
                      <div key={step} className="flex flex-col items-center gap-1">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full",
                            i <= currentStep
                              ? "bg-brand text-white"
                              : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="hidden text-[10px] capitalize text-gray-500 sm:block">
                          {step.replace(/_/g, " ")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="text-sm text-gray-500">
                Delivered to {order.deliveryAddress.street}, {order.deliveryAddress.suburb}
              </p>
            </div>
          );
        })}
      </div>
    </AccountLayout>
  );
}
