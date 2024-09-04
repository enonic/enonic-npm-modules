module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['prettier', 'import'],
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
  settings: {
    'import/resolver': {
      typescript: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  // ...
};
