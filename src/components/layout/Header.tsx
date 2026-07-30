"use client";

import { useState } from "react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import Navbar, { AuthenticateButton } from "./Navbar";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isScrolled = useScrollHeader();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 bg-white transition-shadow duration-300",
          isScrolled && "shadow-header"
        )}
      >
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8 xl:max-w-[1400px]">
          <Logo className="relative z-10 shrink-0" />

          <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <Navbar />
          </div>

          <div className="flex items-center gap-3">
            <AuthenticateButton />
            <button
              className="inline-flex items-center justify-center rounded-lg p-2 text-text-dark transition-colors hover:bg-gray-100 lg:hidden"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
