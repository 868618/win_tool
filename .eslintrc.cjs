const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  env: {
    node: true,
    es6: true,
    commonjs: true,
  },

  extends: [
    // "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],

  overrides: [
    {
      files: ["*.vue"],

      parser: "vue-eslint-parser",

      parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module",
      },
    },

    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
    },
  ],

  plugins: ["@typescript-eslint"],

  root: true,

  rules: {
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 3,
        },
      },
    ],

    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "never",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
        img: "always",
      },
    ],

    "prettier/prettier": "error",
  },
});
