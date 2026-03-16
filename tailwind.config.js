/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(29,78,216,0.18), 0 18px 42px rgba(2,6,23,0.12)'
      }
    }
  },
  plugins: []
};

