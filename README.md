# Groza

A modern, premium, mobile-first instant grocery delivery web application for the Australian market.

## Features

- **Homepage** — Hero, categories, featured products, flash deals, collections, trending items
- **Search** — Live suggestions, recent/popular searches, category filters, voice search UI, infinite scroll
- **Product pages** — Image gallery, nutrition, ingredients, reviews, related products, sticky add-to-cart
- **Cart & Checkout** — Promo codes, GST calculation, multi-step checkout (address → delivery → payment → confirm)
- **Account** — Dashboard, orders with tracking, addresses, wishlist, payments, rewards, referrals, notifications, settings
- **Mobile bottom navigation** — Home, Categories, Search, Cart, Account
- **Dark mode** — Light, dark, and system preference
- **PWA-ready** — Web manifest, theme color, installable structure
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, WCAG AA contrast

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand (state management)
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Promo Codes (Demo)

- `GROZA10` — 10% off orders over $30
- `FRESH5` — $5 off orders over $25
- `WELCOME15` — 15% off first order over $40

## Project Structure

```
src/
├── app/              # Pages (App Router)
├── components/       # Reusable UI components
│   ├── account/
│   ├── cart/
│   ├── checkout/
│   ├── home/
│   ├── layout/
│   ├── product/
│   ├── search/
│   └── ui/
├── data/             # Mock data (products, categories, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utilities and constants
├── store/            # Zustand stores
└── types/            # TypeScript types
```

## Admin-Ready Architecture

Components and stores are structured for future backend integration:

- Authentication (`useUserStore`)
- Product management (`src/data/products.ts` → API)
- Inventory (product `inStock` field)
- Orders (`useUserStore.orders`, checkout flow)
- Delivery tracking (order status pipeline)
- Customer management (account section)
- Coupons (`src/data/promotions.ts`)
- Analytics (event hooks ready to wire)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
# ygroza
