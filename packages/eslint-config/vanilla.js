module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  rules: {
    indent: ['error', 4],
    quotes: ['error', 'single', { avoidEscape: true }],
    'block-spacing': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ],
    'space-in-parens': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ],
    'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'template-curly-spacing': ['error', 'never'],
    'object-property-newline': [
      'off',
      { allowMultiplePropertiesPerLine: true }
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
