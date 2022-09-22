module.exports = {
  plugins: ["unused-imports"],
  extends: ["next", "universe/native"],
  settings: {
    next: {
      rootDir: "apps/next/",
    },
  },
  root: true,
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "jsx-a11y/alt-text": [0],
  },
};
