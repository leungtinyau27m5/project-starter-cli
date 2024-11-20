import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // unicorn
      // ...eslintPluginUnicorn.configs.recommended.rules,
      'unicorn/numeric-separators-style': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/template-indent': 'error',
      'unicorn/import-style': [
        'error',
        {
          styles: {
            'node:path': {
              named: true,
            },
          },
        },
      ],
      'unicorn/prefer-structured-clone': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-module': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-empty-file': 'error',
      'unicorn/no-invalid-fetch-options': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',
      'unicorn/no-single-promise-in-promise-methods': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/consistent-existence-index-check': 'error',
      'unicorn/custom-error-definition': 'error',
      'unicorn/error-message': 'error',
      'unicorn/no-await-expression-member': 'error',

      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
)
