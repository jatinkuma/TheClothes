/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          yellow: '#EA9B1B',
          mustard: '#F4B41A',
          amber: '#D97706',
          deepAmber: '#B45309',
          gold: '#C89332',
          goldLight: '#F3DFB2',
          ruby: '#991B1B',
          rubyDark: '#7F1D1D',
          dark: '#1F1610',
          darkest: '#140D08',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 20px 50px -10px rgba(31, 22, 16, 0.25)',
        'royal-gold': '0 10px 30px -5px rgba(200, 147, 50, 0.35)',
      }
    },
  },
  plugins: [],
}

