import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-text-dark";

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <div className={cn("leading-none", textColor)}>
        <div className="flex items-end gap-0.5">
          <div>
            <span className="block text-lg font-black uppercase tracking-tight sm:text-xl">
              Core
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] sm:text-xs">
              Labs
            </span>
          </div>
          <span className="mb-0.5 text-2xl font-black sm:text-3xl">X</span>
        </div>
      </div>
    </Link>
  );
}
