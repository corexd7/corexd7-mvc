"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems, authenticateHref } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href.split("?")[0]);

  if (item.children) {
    return <ProductsDropdown item={item} isActive={isActive} onNavigate={onNavigate} />;
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn("nav-link whitespace-nowrap", isActive && "nav-link-active")}
    >
      {item.label}
    </Link>
  );
}

function ProductsDropdown({
  item,
  isActive,
  onNavigate,
}: {
  item: NavItem;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "nav-link inline-flex items-center gap-1 whitespace-nowrap",
          isActive && "nav-link-active"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <svg
          className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-50 mt-2 w-48 -translate-x-1/2 rounded-xl bg-white py-2 shadow-soft-lg"
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.();
                }}
                className="block px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-text-dark transition-colors hover:bg-gray-50 hover:text-primary"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface NavbarProps {
  onNavigate?: () => void;
  className?: string;
}

export default function Navbar({ onNavigate, className }: NavbarProps) {
  return (
    <nav className={cn("hidden items-center gap-6 lg:flex xl:gap-8", className)} aria-label="Main navigation">
      {navigationItems.map((item) => (
        <NavLink key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}

export function AuthenticateButton({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href={authenticateHref}
      onClick={onNavigate}
      className="btn-outline hidden shrink-0 sm:inline-flex"
      aria-label="Authenticate your product"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      Authenticate
    </Link>
  );
}
