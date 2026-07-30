import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Core Labs",
  tagline: "X",
  description:
    "Unlocking human potential through science, technology, and precision performance.",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_URL ?? "https://corexd7-oe0qs827v-corexd.vercel.app",
};
