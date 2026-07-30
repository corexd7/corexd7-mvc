import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import FAQAccordion from "@/components/faq/FAQAccordion";
import { faqHero } from "@/constants/hero";
import { faqItems } from "@/constants/faq";

export const metadata: Metadata = {
  title: "FAQ",
};

export default function FAQPage() {
  return (
    <>
      <Hero config={faqHero} />
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-3xl">
          <FAQAccordion items={faqItems} />
        </Container>
      </section>
    </>
  );
}
