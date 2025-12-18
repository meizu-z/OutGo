/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#E8D1A7',      // Background
        espresso: '#442D1C',   // Text/Dark
        bronze: '#84592B',     // Borders
        rust: '#743014',       // Accents
      },
    },
  },
  plugins: [],
}
