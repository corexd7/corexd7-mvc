import Hero from "@/components/sections/Hero";
import { homeHero } from "@/constants/hero";

export default function HomePage() {
  return <Hero config={homeHero} />;
}
