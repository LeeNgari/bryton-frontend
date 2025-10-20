/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'soft-white': '#F8F8F8',
        'soft-gray': '#E0E0E0',
        'soft-gray-dark': '#B0B0B0',
        'soft-black': '#333333',
      },
    },
  },
  plugins: [],
};
