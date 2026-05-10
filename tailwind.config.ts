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
        pitchBlack: "#050505",
        boneWhite: "#EAE6D7",
        raiyasBurgundy: "#2A0800",
        artTerracotta: "#A64214",
        pilatesSand: "#C8BCA7",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:    ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
