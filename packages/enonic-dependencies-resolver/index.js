const path = require('path');
const find = require('./src/find');
const resolve = require('./src/resolve');
const generate = require('./src/generate');
const print = require('./src/print');

const GLOB_ALL = './**/*.ts';

module.exports = async function resolver(
  globPath = GLOB_ALL,
  prefix,
  file,
  maxLevel = Number.MAX_SAFE_INTEGER
) {
  const base = prefix || './';
  const basePath = path.join(base, GLOB_ALL);
  const filesPath = path.join(base, globPath);

  console.log('Finding files...');
  const files = await find(filesPath);
  const baseFiles = basePath === filesPath ? files : await find(basePath);

  console.log(
    `Resolving ${files.length} groups across ${baseFiles.length} files.`
  );

  console.log('Resolving exports...');
  const exports = resolve(files);

  console.log('Creating dependencies graph...');
  const dependencies = generate(baseFiles, exports);

  console.log('Parsing graph...');
  print(dependencies, file, maxLevel);
};
