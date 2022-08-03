import { makeTheme } from 'dripsy'
import { Platform } from 'react-native'

import { fontFamily, textSizes } from 'app/design-system/typography'

const webFont = (font: string) => {
  return Platform.select({
    web: `"${fontFamily(
      font
    )}", Arial, Helvetica Neue, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    default: font,
  })
}

const theme = makeTheme({
  space: [],
  fontSizes: [],
  fonts: {
    root: 'Inter',
    inter: 'Inter',
  },
  customFonts: {
    Inter: {
      default: webFont('Inter-Regular'),
      normal: webFont('Inter-Regular'),
      regular: webFont('Inter-Regular'),
      400: webFont('Inter-Regular'),
      semibold: webFont('Inter-Semibold'),
      500: webFont('Inter-Semibold'),
      bold: webFont('Inter-Bold'),
      600: webFont('Inter-Bold'),
      700: webFont('Inter-Bold'),
    },
  },
  text: {
    a: {
      color: 'white'
    },
    body: {
      fontWeight: 'default',
      ...textSizes['text-base'],
      color: 'white',
    },
    'text-xs': {
      fontWeight: 'default',
      ...textSizes['text-xs'],
      color: 'white',
    },
    'text-sm': {
      fontWeight: 'default',
      ...textSizes['text-sm'],
      color: 'white',
    },
    'text-base': {
      fontWeight: 'default',
      ...textSizes['text-base'],
      color: 'white',
    },
    'text-lg': {
      fontWeight: 'default',
      ...textSizes['text-lg'],
      color: 'white',
    },
    'text-xl': {
      fontWeight: 'default',
      ...textSizes['text-xl'],
      color: 'white',
    },
    'text-2xl': {
      fontWeight: 'default',
      ...textSizes['text-2xl'],
      color: 'white',
    },
    'text-3xl': {
      fontWeight: 'default',
      ...textSizes['text-3xl'],
      color: 'white',
    },
    'text-4xl': {
      fontWeight: 'default',
      ...textSizes['text-4xl'],
      color: 'white',
    },
  },
})

type MyTheme = typeof theme

declare module 'dripsy' {
  interface DripsyCustomTheme extends MyTheme {}
}

export { theme }
