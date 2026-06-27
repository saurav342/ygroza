import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "weekly-specials",
    name: "Weekly Specials",
    slug: "weekly-specials",
    description: "This week's best deals on everyday essentials",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    color: "#16A34A",
  },
  {
    id: "fresh-today",
    name: "Fresh Today",
    slug: "fresh-today",
    description: "Farm-fresh produce delivered today",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    color: "#22C55E",
  },
  {
    id: "best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "Australia's most loved grocery picks",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop",
    color: "#15803D",
  },
  {
    id: "australian-favorites",
    name: "Australian Favorites",
    slug: "australian-favorites",
    description: "Locally sourced Aussie classics",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    color: "#CA8A04",
  },
  {
    id: "organic-picks",
    name: "Organic Picks",
    slug: "organic-picks",
    description: "Certified organic groceries",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    color: "#65A30D",
  },
  {
    id: "under-10",
    name: "Under $10",
    slug: "under-10",
    description: "Great value items under ten dollars",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop",
    color: "#0D9488",
  },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
