/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      montseregular: ["montse-regular", "sans-serif"],
      montsebold: ["montse-bold", "sans-serif"],
      montselight: ["monste-light", "sans-serif"]
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),],
}

