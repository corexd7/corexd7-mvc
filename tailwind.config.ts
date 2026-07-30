import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E11D2E",
          dark: "#B8161F",
          light: "#FF3B4D",
        },
        surface: "#FFFFFF",
        "text-dark": "#1A1A1A",
        "text-muted": "#666666",
        "text-light": "#999999",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 20px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 4px 30px rgba(0, 0, 0, 0.08)",
        header: "0 2px 12px rgba(0, 0, 0, 0.08)",
        input: "0 2px 8px rgba(0, 0, 0, 0.04)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(180deg, #E11D2E 0%, #B8161F 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
