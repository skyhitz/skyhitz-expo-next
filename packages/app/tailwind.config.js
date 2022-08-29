const { plugin } = require("twrnc");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      letterSpacing: {
        0.5: "2px",
      },
      fontFamily: {
        raleway: ["Raleway-Light"],
      },
      opacity: {
        30: ".3",
        90: ".9",
      },
      screens: {
        phone: { min: "0px", max: "640px" },
        tablet: { min: "640px", max: "768px" },
        medium: { max: "1000px" },
      },
      colors: {
        blue: {
          DEFAULT: "#1eaeff",
          dark: "#1A1B20",
          field: "#292b33",
          transparent: "#292b33e6",
          track: "#1e4aff4d",
        },
        red: {
          DEFAULT: "#d9544f",
        },
        white: {
          DEFAULT: "#ffffff",
        },
        grey: {
          DEFAULT: "#858586",
          dark: "#2B3033",
          light: "#dbdbdb",
        },
        lightGreen: "#5CE67E",
        lightBrandBlue: "#1dadff",
        tabIconDefault: "rgba(255,255,255, 0.65)",
        tabIconSelected: "#eee",
        tabBar: "#fefefe",
        valid: "rgba(15,172,141,.8)",
        warningBackground: "#EAEB5E",
        warningText: "#666804",
        noticeText: "#fff",
        loadingScreenBackground: "#17191C",
        profileOverlayBackground: "rgba(0,0,0,0.3)",
        lightBlueBtn: "rgba(0, 174, 239,0.9)",
        searchTextColor: "#000000",
        transparent: "rgba(0,0,0,0)",
        facebookBtnBackground: "#44619D",
        joinBtnBackground: "#00aeef",
        loginTextColor: "#000000",
        black: "black",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        btn: `bg-blue/95 flex flex-row items-center justify-center rounded-full h-12 px-4`,
      });
    }),
  ],
};
