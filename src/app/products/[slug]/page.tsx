import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { products } from "@/constants/products";

interface ProductDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found" };
  return { title: product.name, description: product.description };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-soft-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-text-dark sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-bold text-text-dark">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-6 text-base leading-relaxed text-text-muted">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/authenticate">
                <Button variant="primary" className="w-auto px-10">
                  Authenticate
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="px-8">
                  Back to Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
