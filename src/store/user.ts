"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address, Order, PaymentMethod, User } from "@/types";

const mockUser: User = {
  id: "1",
  name: "Alex Thompson",
  email: "alex.thompson@email.com",
  phone: "+61 412 345 678",
  loyaltyPoints: 2450,
  referralCode: "ALEX2026",
};

const mockAddresses: Address[] = [
  {
    id: "1",
    label: "Home",
    street: "42 Collins Street",
    suburb: "Melbourne",
    state: "VIC",
    postcode: "3000",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    street: "100 King Street",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    isDefault: false,
  },
];

const mockPayments: PaymentMethod[] = [
  { id: "1", type: "visa", last4: "4242", expiry: "12/28", isDefault: true },
  { id: "2", type: "mastercard", last4: "8888", expiry: "06/27", isDefault: false },
];

const mockOrders: Order[] = [
  {
    id: "GRZ-2026-001",
    items: [],
    status: "delivered",
    total: 47.82,
    createdAt: "2026-06-20T14:30:00Z",
    deliveryAddress: mockAddresses[0],
    estimatedDelivery: "2026-06-20T15:00:00Z",
  },
  {
    id: "GRZ-2026-002",
    items: [],
    status: "out_for_delivery",
    total: 32.15,
    createdAt: "2026-06-27T10:15:00Z",
    deliveryAddress: mockAddresses[0],
    estimatedDelivery: "2026-06-27T10:45:00Z",
  },
];

interface UserState {
  user: User;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: mockUser,
      addresses: mockAddresses,
      paymentMethods: mockPayments,
      orders: mockOrders,
      selectedAddress: mockAddresses[0],
      setSelectedAddress: (address) => set({ selectedAddress: address }),
    }),
    { name: "groza-user" }
  )
);
