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
        primary: "#4B2E83",
        secondary: "#5E3AA1",
        gold: "#C9A227",
        light: "#F5F5F7",
        dark: "#2E1A47",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      letterSpacing: {
        widest: ".1em",
      },
    },
  },
  plugins: [],
};
export default config;
