export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  weight: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  deliveryMinutes: number;
  categoryId: string;
  collectionIds: string[];
  image: string;
  images: string[];
  inStock: boolean;
  nutrition?: Record<string, string>;
  ingredients?: string[];
  isOrganic?: boolean;
  isAustralian?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered";
  total: number;
  createdAt: string;
  deliveryAddress: Address;
  estimatedDelivery: string;
}

export interface DeliverySlot {
  id: string;
  label: string;
  time: string;
  available: boolean;
  fee: number;
}

export interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "apple_pay" | "google_pay" | "paypal";
  last4?: string;
  expiry?: string;
  isDefault: boolean;
}

export interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  referralCode: string;
}

export interface FlashDeal {
  id: string;
  productId: string;
  endsAt: string;
  discount: number;
}
