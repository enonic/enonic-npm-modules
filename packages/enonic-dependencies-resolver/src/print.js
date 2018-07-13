const path = require('path');
const fs = require('fs');

function createMarker(external, recursive) {
  if (external) {
    return '   E ';
  } else if (recursive) {
    return '   r ';
  }
  return '   - ';
}

function createLogger(fileName) {
  const file = fileName ? path.resolve(fileName) : null;
  if (file) {
    return text => fs.writeFileSync(file, text, 'utf8');
  }
  return text => console.log(text);
}

/*
--first, --closest
Display items in the chain only if they were not present in other chains
A - B - C
B - C
C
D - B - C
to
A - B - C
D -

or numerate them
[1] A - 2
[2] B - 3
[3] C
[4] D - 2

*/
function printGroup(map, entry, logger, maxLevel, level = 0, chain = []) {
  try {
    if (level > maxLevel) {
      return;
    }
    const external = !map.has(entry);
    const recursive = chain.includes(entry);
    const marker = createMarker(external, recursive);
    const indent = level > 0 ? '    '.repeat(level - 1).concat(marker) : '';
    logger(`${indent}${entry}`);
    const { depFor } = map.get(entry) || {};
    if (depFor && !recursive) {
      depFor.forEach(dep =>
        printGroup(map, dep, logger, maxLevel, level + 1, chain.concat(entry))
      );
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = function print(map, fileName, maxLevel) {
  const logger = createLogger(fileName);
  map.forEach(({ depOn }, entry) => {
    if (!depOn || depOn.length < 1) {
      printGroup(map, entry, logger, maxLevel);
    }
  });
};
