/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#503f37',
          surface: '#c5b98f',
          alt: '#aaa17a',
        },
        btn: {
          DEFAULT: '#997c5c',
          hover: '#784c33',
        },
        text: {
          DEFAULT: '#555555',
          light: '#503f37',
          inverse: '#c5b98f',
        },
        border: '#aaa17a',
        accent: '#784c33',
      },
      fontSize: {
        display: '3rem',      // 48px
        h1: '1.5rem',         // 24px
        h2: '1.125rem',       // 18px
        body: '0.938rem',     // 15px
        small: '0.813rem',    // 13px
        tiny: '0.75rem',      // 12px
      },
    },
  },
  plugins: [],
}
