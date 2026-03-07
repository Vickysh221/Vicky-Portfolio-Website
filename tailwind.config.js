/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#c8a96e",
        "gold-dim": "#a09070",
        "gold-dark": "#9a8870",
        "gold-deep": "#6a5a40",
        "gold-shadow": "#4a3a28",
        cream: "#f0e8d8",
        "cream-dim": "#d4c4a0",
        "cream-muted": "#c0b090",
        "cream-dark": "#8a7a60",
        "bg-base": "#0e0c09",
        "bg-card": "#080604",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};
