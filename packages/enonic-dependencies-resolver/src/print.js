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

const isInternal = (map, entry) => map.has(entry);
const isExternal = (map, entry) => !isInternal(map, entry);

function isBranchInternal(map, entry, chain = []) {
  const recursive = chain.includes(entry);
  const { depFor = [] } = map.get(entry) || {};
  return (
    recursive ||
    (isInternal(map, entry) &&
      depFor.every(v => isBranchInternal(map, v, chain.concat(entry))))
  );
}

function printGroup(map, entry, logger, maxLevel, level = 0, chain = []) {
  try {
    if (level > maxLevel) {
      return;
    }
    const external = isExternal(map, entry);
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

module.exports = function print(map, fileName, maxLevel, internal) {
  const logger = createLogger(fileName);
  map.forEach(({ depOn }, entry) => {
    if (!depOn || depOn.length < 1) {
      if (internal && !isBranchInternal(map, entry)) {
        return;
      }
      printGroup(map, entry, logger, maxLevel);
    }
  });
};
