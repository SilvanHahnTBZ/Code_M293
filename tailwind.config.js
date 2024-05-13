/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme-50': '#E9E9E9',
        'theme-100': '#9B9B9B',
        'theme-200': '#A7B49F',
        'theme-300': '#527055',
        'theme-950': '#38533D'
      },
      fontFamily: {
        'primary': ['Archivo'],
        'secondary': ['Urbanist']
      }
    }
  },
  plugins: []
};
