const path = require('path');
const fs = require('fs');

function createMarker(external, recursive) {
  if (external) {
    return '   E ';
  }
  if (recursive) {
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

function getDependency(map, entry, reversed) {
  const data = map.get(entry) || {};
  const { depFor = [], depOn = [] } = data;
  return reversed ? depOn : depFor;
}

const isInternal = (map, entry) => map.has(entry);
const isExternal = (map, entry) => !isInternal(map, entry);

function isBranchInternal(map, entry, chain = [], reversed) {
  const recursive = chain.includes(entry);
  const dep = getDependency(map, entry, reversed);
  return (
    recursive ||
    (isInternal(map, entry) &&
      dep.every(v => isBranchInternal(map, v, chain.concat(entry))))
  );
}

function printGroup(
  map,
  entry,
  logger,
  maxLevel,
  reversed,
  level = 0,
  chain = []
) {
  try {
    if (level > maxLevel) {
      return;
    }
    const external = isExternal(map, entry);
    const recursive = chain.includes(entry);
    const marker = createMarker(external, recursive);
    const indent = level > 0 ? '    '.repeat(level - 1).concat(marker) : '';
    logger(`${indent}${entry}`);
    const dep = getDependency(map, entry, reversed);
    if (dep && !recursive) {
      dep.forEach(v =>
        printGroup(
          map,
          v,
          logger,
          maxLevel,
          reversed,
          level + 1,
          chain.concat(entry)
        )
      );
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = function print(map, fileName, maxLevel, internal, reversed) {
  const logger = createLogger(fileName);
  map.forEach(({ depOn = [], depFor = [] }, entry) => {
    const dep = reversed ? depFor : depOn;
    if (dep.length < 1) {
      if (internal && !isBranchInternal(map, entry)) {
        return;
      }
      printGroup(map, entry, logger, maxLevel, reversed);
    }
  });
};
