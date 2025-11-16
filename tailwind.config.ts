import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        discord: {
          dark: "#1e1f22",
          darker: "#111214",
          gray: "#2b2d31",
          lightgray: "#313338",
          blurple: "#5865f2",
          green: "#23a559",
          red: "#f23f43",
          yellow: "#f0b232",
        },
      },
    },
  },
  plugins: [],
};

export default config;
