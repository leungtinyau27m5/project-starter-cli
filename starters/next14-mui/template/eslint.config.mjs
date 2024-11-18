import tslint from "typescript-eslint";
import eslint from "@eslint/js";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default tslint.config(
  {
    ignores: ["node_modules", ".yarn", "public", ".next", "dist", "build"],
  },
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: true,
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": reactHooksPlugin,
      react: reactPlugin,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],

      "react/display-name": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies

      "no-useless-escape": "off",
      "no-sparse-arrays": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],

      // unicorn
      // ...eslintPluginUnicorn.configs.recommended.rules,
      "unicorn/numeric-separators-style": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/template-indent": "error",
      "unicorn/import-style": [
        "error",
        {
          styles: {
            "node:path": {
              named: true,
            },
          },
        },
      ],
      "unicorn/prefer-structured-clone": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/prefer-module": "error",
      "unicorn/new-for-builtins": "error",
      "unicorn/no-new-buffer": "error",
      "unicorn/no-new-array": "error",
      "unicorn/no-instanceof-array": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-invalid-fetch-options": "error",
      "unicorn/no-invalid-remove-event-listener": "error",
      "unicorn/no-single-promise-in-promise-methods": "error",
      "unicorn/no-hex-escape": "error",
      "unicorn/consistent-existence-index-check": "error",
      "unicorn/custom-error-definition": "error",
      "unicorn/error-message": "error",
      "unicorn/no-await-expression-member": "error",

      "@typescript-eslint/no-unused-expressions": "off",
    },
  }
);
