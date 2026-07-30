import Image from "next/image";
import type { HeroConfig } from "@/types";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface HeroProps {
  config: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const {
    title,
    subtitle,
    backgroundImage,
    overlay = true,
    showLogo = false,
    cta,
    height = "full",
  } = config;

  const heightClass =
    height === "full" ? "min-h-[calc(100vh-72px)]" : "min-h-[280px] sm:min-h-[320px]";

  return (
    <section
      className={`relative flex w-full items-center justify-center overflow-hidden ${heightClass}`}
      aria-label={title ?? "Hero section"}
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {overlay && (
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {showLogo && (
          <div className="scale-150 sm:scale-[2] md:scale-[2.5]">
            <Logo variant="light" />
          </div>
        )}

        {title && (
          <h1 className="text-3xl font-bold uppercase tracking-wider text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="mt-3 max-w-lg text-base text-white/80 sm:text-lg">
            {subtitle}
          </p>
        )}

        {cta && (
          <Link href={cta.href} className="mt-8">
            <Button variant="primary" className="w-auto px-10">
              {cta.label}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
