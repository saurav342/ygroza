import type { Category } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Fruits & Vegetables", slug: "fruits-vegetables", icon: "🥬", color: "#DCFCE7" },
  { id: "2", name: "Dairy & Eggs", slug: "dairy-eggs", icon: "🥛", color: "#FEF9C3" },
  { id: "3", name: "Bakery", slug: "bakery", icon: "🍞", color: "#FED7AA" },
  { id: "4", name: "Meat & Seafood", slug: "meat-seafood", icon: "🥩", color: "#FECACA" },
  { id: "5", name: "Frozen", slug: "frozen", icon: "🧊", color: "#DBEAFE" },
  { id: "6", name: "Snacks", slug: "snacks", icon: "🍿", color: "#FDE68A" },
  { id: "7", name: "Drinks", slug: "drinks", icon: "🥤", color: "#E0E7FF" },
  { id: "8", name: "Breakfast", slug: "breakfast", icon: "🥣", color: "#FCE7F3" },
  { id: "9", name: "Household", slug: "household", icon: "🧹", color: "#F3F4F6" },
  { id: "10", name: "Personal Care", slug: "personal-care", icon: "🧴", color: "#F5D0FE" },
  { id: "11", name: "Baby", slug: "baby", icon: "👶", color: "#BAE6FD" },
  { id: "12", name: "Pet Supplies", slug: "pet-supplies", icon: "🐾", color: "#D9F99D" },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
