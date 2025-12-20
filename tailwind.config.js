/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        espresso: {
          DEFAULT: '#442D1C',
          light: '#5a3d28',
          dark: '#2e1f13',
        },
        cream: {
          DEFAULT: '#E8D1A7',
          light: '#f5e6cc',
          dark: '#d4bc8a',
        },
        bronze: {
          DEFAULT: '#84592B',
          light: '#9a6a35',
          dark: '#6e4a24',
        },
        rust: {
          DEFAULT: '#743014',
          light: '#8a3a1a',
          dark: '#5e280f',
        },
        // Legacy colors (for backward compatibility)
        bg: {
          DEFAULT: '#442D1C',
          surface: '#E8D1A7',
          alt: '#d4bc8a',
        },
        btn: {
          DEFAULT: '#84592B',
          hover: '#743014',
        },
        text: {
          DEFAULT: '#442D1C',
          light: '#5a3d28',
          inverse: '#E8D1A7',
        },
        border: '#d4bc8a',
        accent: '#743014',
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
        'soft': '0 4px 20px rgba(68, 45, 28, 0.08)',
        'soft-md': '0 8px 30px rgba(68, 45, 28, 0.12)',
        'soft-lg': '0 12px 40px rgba(68, 45, 28, 0.15)',
        'soft-xl': '0 20px 50px rgba(68, 45, 28, 0.18)',
        'card': '0 8px 32px rgba(68, 45, 28, 0.1)',
        'card-hover': '0 12px 40px rgba(68, 45, 28, 0.15)',
        'button': '0 4px 15px rgba(132, 89, 43, 0.3)',
        'button-hover': '0 6px 20px rgba(132, 89, 43, 0.4)',
        'float': '0 10px 40px rgba(68, 45, 28, 0.2)',
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
