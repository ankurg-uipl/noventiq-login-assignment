import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import pluginImort from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

// https://github.com/promptfoo/promptfoo/blob/main/eslint.config.mjs
// all working example: https://github.com/nodejs/node/blob/main/eslint.config.mjs

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginImort.configs["recommended-alphabetical"],
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      "react-hooks": pluginReactHooks,
      "unused-imports": unusedImports
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // ESLint built-in rules
      'dot-notation': 'error',
      'eqeqeq': ['error', 'smart'],
      'no-lonely-if': 'error',
      "no-unused-vars": "off",
      "spaced-comment": ["error", "always", {
        "block": {
          "balanced": true,
          "exceptions": ["*"],
          "markers": ["!"]
        },
        "line": {
          "exceptions": ["-", "+"],
          "markers": ["/"]
        }
      }],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "args": "after-used",
          "argsIgnorePattern": "^_",
          "vars": "all",
          "varsIgnorePattern": "^_",
        },
      ]
    },
  }
];
