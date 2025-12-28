import js from '@eslint/js';
import globals from 'globals';
import cypress from 'eslint-plugin-cypress/flat';
import vitest from 'eslint-plugin-vitest/config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  {
    ...cypress,
    files: ['cypress/**/*.{js,mjs,cjs}'],
  },
  {
    ...vitest.configs.recommended,
    files: ['tests/**/*.{js,mjs,cjs}'],
  },
]);
