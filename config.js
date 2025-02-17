// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.ConfigFile} */
export default [
  // Configure TypeScript analysis
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Add recommended rules
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Configure React with recommended rules
  {
    plugins: {
      "react": react,
      // "react-hooks": reactHooks,
    },
    settings: { react: { version: "detect" } },
  },
  react.configs.flat["recommended"],
  react.configs.flat["jsx-runtime"],
  {
    // This object can be replaced by the following once 5.2 is released:
    //     reactHooks.configs["recommended-latest"],
    name: "react-hooks/recommended",
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  {
    // Specify rules.
    //
    // Regarding "warn" vs "error": we think almost everything here should just
    // be a warning. In many situations (e.g. webpack-dev-server), errors are
    // presented to the dev more directly and annoyingly than warnings. It is
    // important that the linter does not unnecessarily disrupt the dev
    // workflow. For example, an unused variable shouldn"t lead to a big popup
    // over your web app every time; unused variables exist temporarily during
    // development all the time. So nothing that can just happen temporarily
    // during development should be an error. We expect all downstream projects
    // to fail CI if any lint warning is produced anyway, and that"s the
    // important thing here.
    rules: {
      // ----- Disabling some rules ---------------------------------------------

      // Using emotion.js and a proper config, the JSX factory and the `css` prop
      // just come out of nowhere, so let"s tell ESLint not to complain about
      // it.
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": ["warn", { "ignore": ["css"] }],

      // We don"t use prop types, TypeScript fills that role for us.
      "react/prop-types": "off",

      // Would warn about anonymous functions definining components as React uses
      // that for debugging. But not that important for us.
      "react/display-name": "off",

      // The reasoning is that empty functions can be a sign of bug and are weird
      // enough to at least warrent a comment. But the comment could be a few
      // lines above and sometimes the purpose of the empty function (usually as
      // default) is evident from context.
      "@typescript-eslint/no-empty-function": "off",


      // ----- Style rules ------------------------------------------------------

      // Basic style/file properties
      "eol-last": ["warn", "always"],
      "linebreak-style": ["warn", "unix"],
      "max-len": ["warn", { "code": 120, "ignoreUrls": true }],
      "no-trailing-spaces": "warn",

      // Indentation
      "no-tabs": "warn",
      "indent": ["warn", 2, { "SwitchCase": 1, "MemberExpression": "off" }],

      // Spacing
      "array-bracket-spacing": "warn",
      "arrow-spacing": "warn",
      "block-spacing": ["warn", "always"],
      "comma-spacing": "warn",
      "computed-property-spacing": "warn",
      "func-call-spacing": ["warn", "never"],
      "key-spacing": "warn",
      "keyword-spacing": "warn",
      "no-multi-spaces": ["warn", { "ignoreEOLComments": true }],
      "object-curly-spacing": ["warn", "always"],
      "react/jsx-curly-spacing": "warn",
      "semi-spacing": "warn",
      "space-before-blocks": "warn",
      "space-before-function-paren": ["warn", {
        "named": "never",
        "anonymous": "always",
        "asyncArrow": "always",
      }],
      "space-in-parens": "warn",
      "space-infix-ops": "warn",
      "space-unary-ops": "warn",
      "spaced-comment": "warn",

      // Other style
      "arrow-parens": ["warn", "as-needed"],
      "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
      "camelcase": ["warn", { ignoreImports: true }],
      "comma-dangle": ["warn", "always-multiline"],
      "comma-style": "warn",
      "curly": "warn",
      "jsx-quotes": ["warn", "prefer-double"],
      "semi": ["warn", "always"],

      // There was a lot of back and forth regarding this one. At the time of
      // decision, Tobira uses double quotes, Studio uses single quotes
      // (except for JSX) and Editor uses both roughly equally often. Of course,
      // it"s fine for one of those projects to just override the rule. But we
      // still need to set some default.
      //
      // In the end, we decided for "double" due to a number of reasons:
      // - In JSX, double quotes are used almost all the time, as it mimics HTML.
      //   So using different quotes is weird.
      // - And while the JS ecosystem in general uses single quotes more often, in
      //   projects using React, this is not necessarily the case, due to the JSX
      //   reason mentioned above.
      // - Further, JSON only allows double quotes, so this makes it easier to
      //   copy and paste objects around.
      // - Finally, there are actually quite a few style guides recommending
      //   double quotes. So it"s not that uncommon.
      "quotes": ["warn", "double", { "avoidEscape": true }],


      // ----- Other rules ------------------------------------------------------
      "no-unused-expressions": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {
        args: "all",
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],
    },
  },

  // JS files should use the JS parser.
  {
    files: ["*.js", "*.mjs"],
    ...tseslint.configs.disableTypeChecked,
    // parser: "espree",
    // // parserOptions: {
    // //   ecmaVersion: 11,
    // // },

    // // Disable some TS specific rules. Unfortunately, I havn"t found a way to
    // // easily disable all at once. But luckily there seem to be only a small
    // // number of rules that can actually get triggered in JS files.
    // rules: {
    //   "@typescript-eslint/no-var-requires": "off",
    // },
  },
];
