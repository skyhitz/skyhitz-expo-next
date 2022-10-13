/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack5: true,
  async redirects() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/api/.well-known/apple-app-site-association",
        permanent: false,
      },
    ];
  },
};

const { withExpo } = require("@expo/next-adapter");
const withFonts = require("next-fonts");
const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "solito",
  "dripsy",
  "@dripsy/core",
  "app",
  "twrnc",
]);
require("dotenv").config({
  path: "../../.env",
});

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
);
