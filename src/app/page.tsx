import { Hero } from "@/components/home/Hero";
import { CategoryScroll } from "@/components/home/CategoryScroll";
import { CollectionScroll, SectionHeader } from "@/components/home/CollectionScroll";
import { FlashDeals } from "@/components/home/FlashDeals";
import { SeasonalPromo } from "@/components/home/SeasonalPromo";
import { ProductCard } from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import {
  getFeaturedProducts,
  getTrendingProducts,
} from "@/data/products";
import { RecentlyViewedSection } from "@/components/home/RecentlyViewed";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const trending = getTrendingProducts();

  return (
    <div className="space-y-8">
      <Hero />

      <section>
        <SectionHeader title="Shop by Category" href="/categories" />
        <CategoryScroll categories={categories} />
      </section>

      <FlashDeals />

      <section>
        <SectionHeader title="Featured Products" subtitle="Top deals for you" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Popular Collections" />
        <CollectionScroll collections={collections} />
      </section>

      <SeasonalPromo />

      <section>
        <SectionHeader title="Trending Now" subtitle="What everyone is buying" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:gap-4">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <RecentlyViewedSection />
    </div>
  );
}
