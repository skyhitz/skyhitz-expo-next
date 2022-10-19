/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack5: true,
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "content-type", value: "application/json" }],
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
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
require("dotenv").config({
  path: "../../.env",
});

module.exports = withPlugins(
  [
    withBundleAnalyzer,
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
