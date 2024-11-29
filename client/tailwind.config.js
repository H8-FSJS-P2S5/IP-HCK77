/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#FF7300", // Orange
        secondary: "#FFD700", // Gold
        background: "#3E2723", // Dark Brown
        text: "#FFFACD", // Light Yellow
        accent: "#FF4500", // Red
        orange: {
          custom: "#FF7300", // Adds `bg-orange-custom`
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
