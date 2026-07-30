"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import Button from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow duration-300 hover:shadow-soft-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          {product.category}
        </p>
        <h3 className="mt-1 text-base font-bold text-text-dark">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-text-muted">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-text-dark">
            ${product.price.toFixed(2)}
          </span>
          <Link href={`/products/${product.slug}`}>
            <Button variant="outline" className="px-4 py-2 text-[10px]">
              View
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
