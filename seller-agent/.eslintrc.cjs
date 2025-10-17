/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['apps/admin/**/*.{ts,tsx}'],
      extends: [
        'next/core-web-vitals',
      ],
    },
  ],
  ignorePatterns: [
    'dist',
    'build',
    'node_modules',
  ],
};
