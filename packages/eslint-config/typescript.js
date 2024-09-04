const tsParser = require('@typescript-eslint/parser');
const vanillaConfig = require("./vanilla");
const { plugin: tsPlugin, configs: tsConfigs } = require("typescript-eslint");

module.exports = [
  ...vanillaConfig,
  // Include the TypeScript ESLint plugin configurations
  tsConfigs.eslintRecommended,
  ...tsConfigs.recommended,
  ...tsConfigs.recommendedTypeChecked,
  ...tsConfigs.stylistic,
  {
    // TypeScript specific configurations
    files: ['**/*.ts', '**/*.tsx'], // Target TypeScript files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      semi: 'off',
      'no-unused-vars': 'off',
      'constructor-super': ['error'],
      '@typescript-eslint/no-unused-vars': ['off'],
      quotes: 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: true },
      ],
      '@typescript-eslint/member-ordering': ['error'],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      '@typescript-eslint/no-unsafe-argument': ['off'],
    },
  },
];
