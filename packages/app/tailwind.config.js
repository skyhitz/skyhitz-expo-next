const plugin = require("tailwindcss/plugin");

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
          light: "#00aeefe6",
          brand: "#1dadff",
        },
        red: {
          DEFAULT: "#d9544f",
          dark: "#241e22",
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
        tabIconDefault: "rgba(255,255,255, 0.65)",
        tabIconSelected: "#eee",
        tabBar: "#fefefe",
        valid: {
          DEFAULT: "rgba(15,172,141,.8)",
          dark: "#192225",
        },
        warningBackground: "#EAEB5E",
        warningText: "#666804",
        noticeText: "#fff",
        loadingScreenBackground: "#17191C",
        profileOverlayBackground: "rgba(0,0,0,0.3)",
        searchTextColor: "#000000",
        transparent: "rgba(0,0,0,0)",
        facebookBtnBackground: "#44619D",
        joinBtnBackground: "#00aeef",
        loginTextColor: "#000000",
        black: "black",
        beatmakerAvatarBackground: "#121316",
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
        title: `text-3xl mb-6 font-bold text-black`,
        "section-title": `text-2xl font-bold text-black mt-4`,
        paragraph: `mt-4 text-sm md:text-md text-black`,
      });
    }),
  ],
};
