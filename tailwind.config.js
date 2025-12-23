/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-Contrast Color Palette
        white: '#FFFFFF',
        sand: '#EBCDAA',
        grey: '#4D4D4D',
        'sec-grey': '#2A2A2A',
        black: '#020202',
        
        // Semantic Color Assignments
        'bg-canvas': '#FFFFFF',
        'card-primary': {
          bg: '#020202',
          text: '#FFFFFF',
        },
        'card-secondary': {
          bg: '#2A2A2A',
          text: '#EBCDAA',
        },
        'text-body': '#4D4D4D',
        'text-heading': '#4D4D4D',
        'btn-action': {
          bg: '#EBCDAA',
          text: '#FFFFFF',
        },
      },
      fontSize: {
        display: '3rem',      // 48px
        h1: '1.5rem',         // 24px
        h2: '1.125rem',       // 18px
        body: '0.938rem',     // 15px
        small: '0.813rem',    // 13px
        tiny: '0.75rem',      // 12px
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(2, 2, 2, 0.08)',
        'soft-md': '0 8px 30px rgba(2, 2, 2, 0.12)',
        'soft-lg': '0 12px 40px rgba(2, 2, 2, 0.15)',
        'soft-xl': '0 20px 50px rgba(2, 2, 2, 0.18)',
        'card': '0 8px 32px rgba(2, 2, 2, 0.1)',
        'card-hover': '0 12px 40px rgba(2, 2, 2, 0.15)',
        'button': '0 4px 15px rgba(235, 205, 170, 0.3)',
        'button-hover': '0 6px 20px rgba(235, 205, 170, 0.4)',
        'float': '0 10px 40px rgba(2, 2, 2, 0.2)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        'content': '42rem',   // 672px - ideal reading width
        'wide': '56rem',      // 896px - for wider layouts
      },
    },
  },
  plugins: [],
}
