import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/presentation/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#1E1B4C",
          light: "#2E2B6C",
          dark: "#15123A",
        },
        brand: {
          pink: "#FF2E97",
          yellow: "#FFD402",
          cyan: "#0ABDC6",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;