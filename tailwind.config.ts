import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#f0f6fc",
          100: "#dce9f8",
          200: "#b9d2f0",
          300: "#8ab1e3",
          400: "#6394d6",
          500: "#3d76c6",
          600: "#20509b",
          700: "#12346e",
          800: "#08214e",
          900: "#041536",
        },
        primary: {
          50: "#f0f6fc",
          100: "#e0ebf8",
          200: "#c2daf3",
          300: "#94bfe9",
          400: "#5d9dde",
          500: "#327dd0",
          600: "#2060b4",
          700: "#1b4d93",
          800: "#1a4179",
          900: "#1b3765",
          950: "#112343",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Inter", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        card: "0 4px 12px 0 rgba(8, 33, 78, 0.05), 0 1px 3px 0 rgba(8, 33, 78, 0.03)",
        lift: "0 12px 30px -4px rgba(8, 33, 78, 0.08), 0 4px 10px -2px rgba(8, 33, 78, 0.04)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
