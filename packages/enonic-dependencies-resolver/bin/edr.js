#!/usr/bin/env node

process.title = 'edr';

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');

const resolve = require('../index');

(function cmd() {
  const { prefix, file, level, internal, help } = argv;
  if (help) {
    const helpPath = path.resolve(__dirname, './help.txt');
    fs.createReadStream(helpPath).pipe(process.stdout);
  } else {
    const flags = {
      prefix,
      file,
      level,
      internal
    };
    resolve(argv._[0], flags);
  }
})();
