const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand greens — primary surface identity
        forest: { DEFAULT: "#1A3C2B", 800: "#1A3C2B", 700: "#234D38" },
        mint: { DEFAULT: "#E8F5EC", 100: "#E8F5EC", 200: "#D4EDDA" },
        leaf: { DEFAULT: "#2D6A4F" }, // mid-tone for tags, icons

        // Action — used ONLY for CTAs and interactive highlights
        paw: { DEFAULT: "#F97316", hover: "#EA6C0A" }, // orange

        // Neutrals
        ink: { DEFAULT: "#111827" }, // headings
        muted: { DEFAULT: "#6B7280" }, // subtext, metadata
        line: { DEFAULT: "#E5E7EB" }, // dividers, borders
        surface: { DEFAULT: "#FFFFFF" }, // cards

        // Star / rating
        star: { DEFAULT: "#F59E0B" },

        // WhatsApp green
        wa: { DEFAULT: "#25D366", hover: "#1EBE5A" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
