import type { Coupon, FlashDeal } from "@/types";

export const coupons: Coupon[] = [
  {
    code: "GROZA10",
    discount: 10,
    type: "percentage",
    minOrder: 30,
    description: "10% off orders over $30",
  },
  {
    code: "FRESH5",
    discount: 5,
    type: "fixed",
    minOrder: 25,
    description: "$5 off fresh produce orders over $25",
  },
  {
    code: "WELCOME15",
    discount: 15,
    type: "percentage",
    minOrder: 40,
    description: "15% off your first order over $40",
  },
];

export const flashDeals: FlashDeal[] = [
  { id: "1", productId: "1", endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), discount: 20 },
  { id: "2", productId: "5", endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), discount: 19 },
  { id: "3", productId: "9", endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), discount: 21 },
  { id: "4", productId: "19", endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), discount: 25 },
];
