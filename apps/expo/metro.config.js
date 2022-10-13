// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// package aliases
const crypto = require.resolve("crypto-browserify");
const stream = require.resolve("readable-stream");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.extraNodeModules = {
  crypto,
  stream,
};

module.exports = config;
