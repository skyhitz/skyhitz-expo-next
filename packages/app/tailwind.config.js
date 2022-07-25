/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      opacity: {
        30: '.3',
        90: '.9',
      },
      screens: {
        phone: { min: '0px', max: '640px' },
        tablet: { min: '640px', max: '768px' },
        medium: { max: '1000px' },
      },
      colors: {
        blue: {
          DEFAULT: '#1eaeff',
          dark: '#1A1B20',
          field: 'rgb(41, 43, 51)',
        },
        red: {
          DEFAULT: '#d9544f',
        },
        white: {
          DEFAULT: '#ffffff',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
}
