const { configs } = require('@eslint/js');
const globals = require('globals');

module.exports = [
  configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      'block-spacing': ['error', 'always'],
      'space-before-function-paren': [
        'error',
        { anonymous: 'always', named: 'never' },
      ],
      'space-in-parens': ['error', 'never'],
      'object-curly-spacing': ['error', 'never'],
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'template-curly-spacing': ['error', 'never'],
      'object-property-newline': [
        'off',
        { allowMultiplePropertiesPerLine: true },
      ],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
];
