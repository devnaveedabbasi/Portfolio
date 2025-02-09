import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'], 
        PoppinsHeading: ['PoppinsHeading', 'sans-serif'], 
        Open_Sans: ['Open_Sans', 'sans-serif'], 

      },
    },
  },
  plugins: [],
} satisfies Config;
