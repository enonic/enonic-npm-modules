module.exports = {
  root: true,
  extends: [
    '@enonic',
    '@enonic/eslint-config/browser',
    '@enonic/eslint-config/xp'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json'
  }
};
