import { makeTheme } from "dripsy";
import { Platform } from "react-native";

import { fontFamily, textSizes } from "app/design-system/typography";

const webFont = (font: string) => {
  return Platform.select({
    web: `"${fontFamily(
      font
    )}", Arial, Helvetica Neue, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    default: font,
  });
};

const theme = makeTheme({
  space: [],
  fontSizes: [],
  customFonts: {
    "Raleway-Light": {
      default: webFont("Raleway-Light"),
      600: webFont("Raleway-SemiBold"),
      bold: webFont("Raleway-Bold"),
      500: webFont("Raleway-Medium"),
    },
  },
  fonts: {
    raleway: "Raleway-Light",
  },
  text: {
    a: {
      color: "white",
    },
    body: {
      fontWeight: "normal",
      ...textSizes["text-base"],
      color: "white",
    },
    "text-xs": {
      fontWeight: "normal",
      ...textSizes["text-xs"],
      color: "white",
    },
    "text-sm": {
      fontWeight: "normal",
      ...textSizes["text-sm"],
      color: "white",
    },
    "text-base": {
      fontWeight: "normal",
      ...textSizes["text-base"],
      color: "white",
    },
    "text-lg": {
      fontWeight: "normal",
      ...textSizes["text-lg"],
      color: "white",
    },
    "text-xl": {
      fontWeight: "normal",
      ...textSizes["text-xl"],
      color: "white",
    },
    "text-2xl": {
      fontWeight: "normal",
      ...textSizes["text-2xl"],
      color: "white",
    },
    "text-3xl": {
      fontWeight: "normal",
      ...textSizes["text-3xl"],
      color: "white",
    },
    "text-4xl": {
      fontWeight: "normal",
      ...textSizes["text-4xl"],
      color: "white",
    },
  },
});

export { theme };
