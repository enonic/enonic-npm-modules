#!/usr/bin/env node

process.title = 'edr';

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');

const { list, migrate } = require('../index.js');

(function cmd() {
  const { prefix, file, level, internal, reversed, update, help } = argv;
  const { p, f, l, i, r, u, h } = argv;
  if (help || h) {
    const helpPath = path.resolve(__dirname, './help.txt');
    fs.createReadStream(helpPath).pipe(process.stdout);
  } else if (update || u) {
    migrate(argv._[0]);
  } else {
    const flags = {
      prefix: prefix || p,
      file: file || f,
      level: level || l,
      internal: internal || i,
      reversed: reversed || r,
    };
    list(argv._[0], flags);
  }
})();
