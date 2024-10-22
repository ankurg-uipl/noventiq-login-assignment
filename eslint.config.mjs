/* eslint-disable perfectionist/sort-objects */
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import pluginImort from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

// https://github.com/promptfoo/promptfoo/blob/main/eslint.config.mjs
// all working example: 
// https://github.com/nodejs/node/blob/main/eslint.config.mjs

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
      'array-callback-return': 'error',
      'capitalized-comments': ['error', 'always', {
        block: {
          ignorePattern: '.*',
        },
        line: {
          // Ignore all lines that have less characters than 20 and all lines
          ignoreConsecutiveComments: true,
          // That start with something that looks like a variable name or code.
          ignoreInlineComments: true,
          ignorePattern: '.{0,20}$|[a-z]+ ?[0-9A-Z_.(/=:[#-]|std|http|ssh|ftp|const|let',
        },
      }],
      'dot-notation': 'error',
      'eqeqeq': ['error', 'smart'],
      'no-lonely-if': 'error',
      'no-proto': 'error',
      "no-restricted-syntax": [
        "error",
        {
          "message": "Function expressions are not allowed.",
          "selector": "FunctionExpression"
        },
        {
          "message": "setTimeout must always be invoked with two arguments.",
          "selector": "CallExpression[callee.name='setTimeout'][arguments.length!=2]"
        }
      ],
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-undef-init': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true }],
      "no-unused-vars": "off",
      'no-use-before-define': ['error', {
        classes: true,
        functions: false,
        variables: false,
      }],
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      // ESLint recommended rules that we disable.
      // eslint-disable-next-line perfectionist/sort-objects
      // 'no-inner-declarations': ['error'],
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
      ],
      // Stylistic rules.
      // '@stylistic/js/arrow-parens': ["error", "as-needed", { "requireForBlockBody": true }],
      '@stylistic/js/arrow-spacing': 'error',
    },
  }
];
