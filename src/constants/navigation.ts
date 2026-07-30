import type { NavItem } from "@/types";

export const navigationItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Supplements", href: "/products?category=supplements" },
      { label: "SARMs", href: "/products?category=sarms" },
      { label: "Peptides", href: "/products?category=peptides" },
    ],
  },
  { label: "FAQ", href: "/faq" },
  { label: "Redeem Your Reward", href: "/redeem" },
];

export const authenticateHref = "/authenticate";
