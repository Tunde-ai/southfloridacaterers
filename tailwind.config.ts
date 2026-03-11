import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#E8C840",
          dark: "#C9A800",
          light: "#FFF3A3",
        },
        burgundy: {
          DEFAULT: "#722F37",
          light: "#8B3A42",
        },
        charcoal: "#1C1614",
        linen: "#FAF7F0",
        stone: "#F2EDE3",
        "warm-black": "#1A1208",
        "warm-muted": "#6B5E4B",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
