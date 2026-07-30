import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import { aboutHero } from "@/constants/hero";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <Hero config={aboutHero} />
      <AboutSection />
    </>
  );
}
