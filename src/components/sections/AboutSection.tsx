"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutContent } from "@/constants/about";
import Container from "@/components/ui/Container";

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="about-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 id="about-heading" className="sr-only">
              About Core Labs
            </h2>
            <div className="space-y-6">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-text-muted sm:text-base sm:leading-7"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft-lg"
          >
            <Image
              src={aboutContent.image}
              alt={aboutContent.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
