const path = require('path');
const find = require('./src/find');
const resolve = require('./src/resolve');
const generate = require('./src/generate');
const print = require('./src/print');

const FILES_ALL = './**/*.ts';

module.exports = async function resolver(
  pattern = FILES_ALL,
  { prefix, file, level = Number.MAX_SAFE_INTEGER, internal }
) {
  const base = prefix || './';
  const basePath = path.join(base, FILES_ALL);
  const filesPath = path.join(base, pattern);

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

  console.log('Parsing graph...\n');
  print(dependencies, file, level, !!internal);
};
