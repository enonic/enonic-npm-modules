const path = require('path');

module.exports = {
  extends: path.join(__dirname, './vanilla.js'),
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: path.join(__dirname, './typescript.js'),
    },
  ],
};
