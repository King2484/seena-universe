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
        cream:      "#F5ECD7",
        sand:       "#EDE0C4",
        oak:        "#C4935A",
        charcoal:   "#1A1A18",
        gold:       "#D4AA70",
        moss:       "#2D4A2F",
        "off-white":"#FAF6F0",
        rust:       "#8B5E3C",
        "warm-dark":"#2C2016",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:    ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.4em",
      },
    },
  },
  plugins: [],
};

export default config;
