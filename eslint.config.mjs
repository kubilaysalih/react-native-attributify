import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{mjs,ts}']
  },
  { ignores: ['**/node_modules/**', 'dist/'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'semi': ['warn', 'never'],
      'quotes': ['warn', 'single'],
      'comma-dangle': ['warn', 'never'],
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-multiple-empty-lines': ['warn', { 'max': 1 }],
      'object-curly-spacing': ['warn', 'always']
    }
  }
]