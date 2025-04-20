/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy': {
          700: '#192f59',
          800: '#0f1c38',
        }
      }
    },
  },
  plugins: [],
};