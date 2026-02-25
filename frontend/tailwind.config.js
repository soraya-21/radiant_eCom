/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxe': {
          50: '#fdf8f3',
          100: '#fae9dd',
          200: '#f5d4bd',
          300: '#efb89c',
          400: '#e8956d',
          500: '#d97a3c',
          600: '#c4552b',
          700: '#a83d1f',
          800: '#8c2e16',
          900: '#6f2309',
          950: '#4a1505',
        },
        'gold': {
          50: '#fffbf0',
          100: '#fff7e6',
          200: '#ffedcc',
          300: '#ffe0b3',
          400: '#ffcc66',
          500: '#ffb84d',
          600: '#ff9d1a',
          700: '#e67e0d',
          800: '#bf6c0b',
          900: '#8c4f08',
        },
        'rose': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f8b4dd',
          400: '#f472b6',
          500: '#e01e5a',
          600: '#be185d',
          700: '#9d174d',
          800: '#831843',
          900: '#500724',
        },
      },
      fontFamily: {
        'serif': ['Garamond', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 179, 102, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 179, 102, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}