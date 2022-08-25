/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack5: true,
  exportPathMap: async function () {
    return {
      '/home': { page: '/' },
    }
  },
}

const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'solito',
  'dripsy',
  '@dripsy/core',
  'moti',
  '@motify/core',
  '@motify/components',
  'app',
  'twrnc',
])

module.exports = withPlugins(
  [
    withTM,
    withFonts,
    [
      withImages,
      {
        images: {
          disableStaticImages: true,
        },
      },
    ],
    [withExpo, { projectRoot: __dirname }],
  ],
  nextConfig
)
