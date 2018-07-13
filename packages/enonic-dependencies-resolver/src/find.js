const glob = require('glob');
const pify = require('pify');

const EXCLUDES = ['d.ts', '_module.ts'];
const isValid = file => !EXCLUDES.some(exclude => file.endsWith(exclude));

module.exports = async function find(globPath) {
  const files = await pify(glob)(globPath);
  return files.filter(isValid);
};
