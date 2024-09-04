const vanillaConfig = require('./vanilla');
const tsConfig = require('./typescript');

module.exports = [
  ...vanillaConfig,
  ...tsConfig
]
