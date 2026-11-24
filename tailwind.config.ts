import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn semantic tokens
        background: "var(--bg-page)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--btn-primary-bg)",
          foreground: "var(--btn-primary-text)",
        },
        secondary: {
          DEFAULT: "var(--btn-secondary-bg)",
          foreground: "var(--btn-secondary-text)",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "var(--bg-muted)",
          foreground: "var(--text-primary)",
        },
        input: "var(--border-default)",
        ring: "var(--text-primary)",

        // Extended theme tokens
        page: "var(--bg-page)",
        card: "var(--bg-card)",
        "card-subtle": "var(--bg-card-subtle)",
        nav: "var(--bg-nav)",
        muted: "var(--bg-muted)",
        inverted: "var(--bg-inverted)",

        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-inverted": "var(--text-inverted)",

        "border-subtle": "var(--border-subtle)",
        "border-default": "var(--border-default)",
        "border-strong": "var(--border-strong)",

        "btn-primary": {
          bg: "var(--btn-primary-bg)",
          text: "var(--btn-primary-text)",
          hover: "var(--btn-primary-hover)",
        },
        "btn-secondary": {
          bg: "var(--btn-secondary-bg)",
          text: "var(--btn-secondary-text)",
          border: "var(--btn-secondary-border)",
          hover: "var(--btn-secondary-hover)",
        },

        ribbon: {
          bg: "var(--ribbon-bg)",
          text: "var(--ribbon-text)",
          border: "var(--ribbon-border)",
        },
        footer: {
          bg: "var(--footer-bg)",
          text: "var(--footer-text)",
          muted: "var(--footer-muted)",
          border: "var(--footer-border)",
          watermark: "var(--footer-watermark)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
