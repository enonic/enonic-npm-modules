const path = require('path');

module.exports = {
  extends: [
    path.join(__dirname, './vanilla.js'),
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 4],
    semi: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true }
    ],
    '@typescript-eslint/member-ordering': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true }
    ],
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    '@typescript-eslint/no-unsafe-argument': ['off'],
  },
};
