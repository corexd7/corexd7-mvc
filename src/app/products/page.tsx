import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import { productsHero } from "@/constants/hero";
import { products } from "@/constants/products";

export const metadata: Metadata = {
  title: "Products",
};

interface ProductsPageProps {
  searchParams: { category?: string };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams.category;
  const filteredProducts =
    category && category !== "all"
      ? products.filter((p) => p.category === category)
      : products;

  return (
    <>
      <Hero config={productsHero} />
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-text-muted">
              No products found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
