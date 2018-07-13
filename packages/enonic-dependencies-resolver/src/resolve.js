const fs = require('fs');

function findExports(code) {
  const regex = /(?:export\s+)(?:abstract\s+)?(?:(?:type|interface|enum|class)\s+)([A-Za-z_\d]+)(?:\n|.+)/gi;
  const result = [];
  let match = regex.exec(code);
  while (match) {
    if (match[1]) {
      result.push(match[1]);
    }
    match = regex.exec(code);
  }
  return result;
}

module.exports = function resolve(files) {
  const map = new Map();

  files.forEach(file => {
    const code = fs.readFileSync(file, 'utf8');
    map.set(file, findExports(code));
  });

  return map;
};
