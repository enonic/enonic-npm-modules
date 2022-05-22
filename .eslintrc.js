module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
    'no-restricted-syntax': ['off'],
    'object-property-newline': [
      'off',
      { allowMultiplePropertiesPerLine: true },
    ],
    'no-underscore-dangle': ['off'],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-extraneous-dependencies': [
      'off',
      { devDependencies: ['util/', '**/*.test.js', '**/*.spec.js'] },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    'no-console': ['off'],
  },
  env: {
    node: true,
    jest: true,
  },
};
