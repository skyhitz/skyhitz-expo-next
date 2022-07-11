/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        phone: { min: '0px', max: '640px' },
        tablet: { min: '640px', max: '768px' },
        medium: { max: '1000px' },
      },
      colors: {
        blue: {
          DEFAULT: '#1EAEFF',
          dark: '#1A1B20',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
}
