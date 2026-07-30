import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Whey Protein Isolate",
    slug: "whey-protein-isolate",
    image: "/images/hero-fallback.jpeg",
    description:
      "Premium whey protein isolate for muscle recovery and lean mass development.",
    category: "supplements",
    price: 49.99,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Creatine Monohydrate",
    slug: "creatine-monohydrate",
    image: "/nutrition1.png",
    description:
      "Pharmaceutical-grade creatine for strength, power, and performance.",
    category: "supplements",
    price: 29.99,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Ostarine MK-2866",
    slug: "ostarine-mk-2866",
    image: "/images/hero-fallback.jpeg",
    description:
      "Research-grade SARM for lean muscle preservation and recovery.",
    category: "sarms",
    price: 59.99,
    isFeatured: false,
  },
  {
    id: "4",
    name: "Ligandrol LGD-4033",
    slug: "ligandrol-lgd-4033",
    image: "/nutrition1.png",
    description:
      "Advanced SARM compound for muscle mass and strength gains.",
    category: "sarms",
    price: 64.99,
    isFeatured: true,
  },
  {
    id: "5",
    name: "BPC-157 Peptide",
    slug: "bpc-157-peptide",
    image: "/images/hero-fallback.jpeg",
    description:
      "Recovery peptide for tissue repair and joint health support.",
    category: "peptides",
    price: 79.99,
    isFeatured: false,
  },
  {
    id: "6",
    name: "Pre-Workout Formula",
    slug: "pre-workout-formula",
    image: "/nutrition1.png",
    description:
      "Clinically dosed pre-workout for energy, focus, and endurance.",
    category: "supplements",
    price: 39.99,
    isFeatured: true,
  },
  {
    id: "7",
    name: "Cardarine GW-501516",
    slug: "cardarine-gw-501516",
    image: "/images/hero-fallback.jpeg",
    description:
      "Endurance-enhancing compound for cardiovascular performance.",
    category: "sarms",
    price: 54.99,
    isFeatured: false,
  },
  {
    id: "8",
    name: "TB-500 Peptide",
    slug: "tb-500-peptide",
    image: "/nutrition1.png",
    description:
      "Advanced recovery peptide for accelerated healing and mobility.",
    category: "peptides",
    price: 89.99,
    isFeatured: false,
  },
];

export const productCategories = [
  { label: "All Products", value: "all" },
  { label: "Supplements", value: "supplements" },
  { label: "SARMs", value: "sarms" },
  { label: "Peptides", value: "peptides" },
];
