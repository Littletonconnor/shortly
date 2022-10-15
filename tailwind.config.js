/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-light": "hsl(231deg 89% 74% / 1)",
        primary: "hsl(231deg 84% 67% / 1)",
      },
    },
  },
  plugins: [],
};
