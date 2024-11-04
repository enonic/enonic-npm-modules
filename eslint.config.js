// eslint.config.js for ESLint 9

const jsxA11y = require('eslint-plugin-jsx-a11y');
const { plugin: tsPlugin } = require('typescript-eslint');
const prettierPlugin = require('eslint-plugin-prettier/recommended');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  importPlugin.flatConfigs.recommended,
  prettierPlugin,
  {
    plugins: {
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
      'no-restricted-syntax': 'off',
      'object-property-newline': [
        'off',
        { allowMultiplePropertiesPerLine: true },
      ],
      'no-underscore-dangle': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'import/no-extraneous-dependencies': [
        'off',
        { devDependencies: ['util/', '**/*.test.js', '**/*.spec.js'] },
      ],
      'no-console': 'off',
      'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        typescript: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
      },
    },
    ignores: [
      'coverage/**',
      'node_modules',
      'packages/enonic-dependencies-resolver/index.js',
    ],
  },
];
