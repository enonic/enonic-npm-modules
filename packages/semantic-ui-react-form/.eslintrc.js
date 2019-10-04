module.exports = {
  extends: [
    //'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended'//,
    //'airbnb-base',
    //'prettier'
  ], // extends
  globals: {
    React: false
  },
  parser: 'babel-eslint',
  plugins: [
    'jsx-a11y'//,
    //'react'//,
    //'prettier'
  ], // plugins
  rules: {
    'comma-dangle': [ 'error', {
        'arrays': 'never',
        'objects': 'never',
        'imports': 'never',
        'exports': 'never',
        'functions': 'ignore',
    }],
    'func-names': [ 'off' ],
    'import/prefer-default-export': [ 'off' ],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'prettier/prettier': [ 'off' ],
    'react/prop-types': [ 'off' ],
    'react/react-in-jsx-scope': [ 'off' ]
  }, // rules
  settings: {
    'import/extensions': [
      '.es',
      '.js',
      '.jsx'
    ],
    'import/resolver': {
      node: {
        extensions: [
          '.es',
          '.js',
          '.jsx'
        ]
      }
    }
  } // settings
} // module.exports
