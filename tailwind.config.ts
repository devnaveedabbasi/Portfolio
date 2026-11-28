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
      spacing: {
        "5.5": "1.375rem",
        "18": "4.5rem",
        "22": "5.5rem",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      colors: {
        // single accent, supports opacity modifiers
        brand: {
          DEFAULT: "rgb(var(--brand-rgb) / <alpha-value>)",
          soft: "var(--brand-soft)",
        },
        // cool ink neutrals, replacing Tailwind's grey scale
        black: "#061429",
        neutral: {
          50: "#f5f8fc",
          100: "#ecf1f8",
          200: "#dde6f1",
          300: "#c3d0e2",
          400: "#96a8c2",
          500: "#647693",
          600: "#475874",
          700: "#2d3f5c",
          800: "#1b2b47",
          900: "#112038",
          950: "#091528",
        },
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
        sans: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-code)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
