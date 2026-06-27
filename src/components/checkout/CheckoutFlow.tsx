"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, CreditCard, CheckCircle, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUserStore } from "@/store/user";
import { useToastStore } from "@/store/search";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { cn } from "@/lib/utils";
import type { DeliverySlot } from "@/types";

const steps = [
  { id: "address", label: "Address", icon: MapPin },
  { id: "delivery", label: "Delivery", icon: Clock },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirm", label: "Confirm", icon: CheckCircle },
];

const deliverySlots: DeliverySlot[] = [
  { id: "1", label: "Express", time: "10-15 min", available: true, fee: 0 },
  { id: "2", label: "Standard", time: "30-45 min", available: true, fee: 0 },
  { id: "3", label: "Scheduled", time: "Today 6-8 PM", available: true, fee: 0 },
  { id: "4", label: "Tomorrow AM", time: "8-10 AM", available: true, fee: 0 },
];

const paymentOptions = [
  { id: "visa", label: "Visa", icon: "💳" },
  { id: "mastercard", label: "Mastercard", icon: "💳" },
  { id: "apple_pay", label: "Apple Pay", icon: "" },
  { id: "google_pay", label: "Google Pay", icon: "G" },
  { id: "paypal", label: "PayPal", icon: "P" },
];

export function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("1");
  const [selectedPayment, setSelectedPayment] = useState("visa");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const addresses = useUserStore((s) => s.addresses);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || "");
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotal = useCartStore((s) => s.getTotal);
  const addToast = useToastStore((s) => s.addToast);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    addToast("Order placed successfully!");
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-12 text-center"
      >
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-light">
          <CheckCircle className="h-10 w-10 text-brand" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-charcoal dark:text-gray-100">
          Order Confirmed!
        </h2>
        <p className="mb-1 text-gray-600 dark:text-gray-400">
          Your order <strong>GRZ-{Date.now().toString().slice(-6)}</strong> is on its way
        </p>
        <p className="mb-6 text-sm text-gray-500">Estimated delivery in 10-15 minutes</p>
        <a href="/account/orders">
          <Button>Track Order</Button>
        </a>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-6 flex items-center gap-2 overflow-x-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => i <= currentStep && setCurrentStep(i)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  i === currentStep
                    ? "bg-brand text-white"
                    : i < currentStep
                      ? "bg-brand-light text-brand-dark"
                      : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h2 className="text-lg font-bold text-charcoal dark:text-gray-100">
                Delivery Address
              </h2>
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition-colors",
                    selectedAddressId === addr.id
                      ? "border-brand bg-brand-light/50 dark:bg-brand/10"
                      : "border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-charcoal dark:text-gray-100">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-xs text-brand">Default</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {addr.street}, {addr.suburb} {addr.state} {addr.postcode}
                  </p>
                </button>
              ))}
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h2 className="text-lg font-bold text-charcoal dark:text-gray-100">
                Delivery Slot
              </h2>
              {deliverySlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border p-4 transition-colors",
                    selectedSlot === slot.id
                      ? "border-brand bg-brand-light/50 dark:bg-brand/10"
                      : "border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div>
                    <p className="font-semibold text-charcoal dark:text-gray-100">
                      {slot.label}
                    </p>
                    <p className="text-sm text-gray-500">{slot.time}</p>
                  </div>
                  <span className="text-sm font-medium text-brand">
                    {slot.fee === 0 ? "FREE" : formatPrice(slot.fee)}
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h2 className="text-lg font-bold text-charcoal dark:text-gray-100">
                Payment Method
              </h2>
              {paymentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedPayment(opt.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-4 transition-colors",
                    selectedPayment === opt.id
                      ? "border-brand bg-brand-light/50 dark:bg-brand/10"
                      : "border-gray-200 dark:border-gray-700"
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg dark:bg-gray-800">
                    {opt.icon}
                  </span>
                  <span className="font-semibold text-charcoal dark:text-gray-100">
                    {opt.label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <h2 className="mb-4 text-lg font-bold text-charcoal dark:text-gray-100">
                Review Order
              </h2>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Address:</strong>{" "}
                  {addresses.find((a) => a.id === selectedAddressId)?.street}
                </p>
                <p>
                  <strong>Delivery:</strong>{" "}
                  {deliverySlots.find((s) => s.id === selectedSlot)?.label} —{" "}
                  {deliverySlots.find((s) => s.id === selectedSlot)?.time}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  {paymentOptions.find((p) => p.id === selectedPayment)?.label}
                </p>
                <p className="text-lg font-bold text-charcoal dark:text-gray-100">
                  Total: {formatPrice(getTotal())}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={() => setCurrentStep((s) => s - 1)}>
              Back
            </Button>
          )}
          {currentStep < 3 ? (
            <Button className="flex-1 gap-2" onClick={() => setCurrentStep((s) => s + 1)}>
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="flex-1" size="lg" onClick={handlePlaceOrder}>
              Place Order — {formatPrice(getTotal())}
            </Button>
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <OrderSummary showCheckout={false} />
      </div>
    </div>
  );
}
