import * as path from 'path';
import * as fs from 'fs';
import {Dependencies} from './generate';

function createMarker(external, recursive) {
  if (external) {
    return '   E ';
  }
  if (recursive) {
    return '   r ';
  }
  return '   - ';
}

function createLogger(fileName: string): (text: string) => void {
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

function isBranchInternal(map: Map<string, Dependencies>, entry: string, chain: string[] = [], reversed: boolean = false) {
  const recursive = chain.includes(entry);
  const dep = getDependency(map, entry, reversed);
  return (
    recursive ||
    (isInternal(map, entry) &&
      dep.every(v => isBranchInternal(map, v, chain.concat(entry))))
  );
}

function printGroup(
  map: Map<string, Dependencies>,
  entry: string,
  logger: (text: string) => void,
  maxLevel: number,
  reversed: boolean,
  level: number = 0,
  chain: string[] = []
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

export default function print(map: Map<string, Dependencies>, fileName: string, maxLevel: number, internal: boolean, reversed: boolean) {
  const logger = createLogger(fileName);
  map.forEach(({ depOn = [], depFor = [] }: Dependencies, entry: string) => {
    const dep = reversed ? depFor : depOn;
    if (dep.length < 1) {
      if (internal && !isBranchInternal(map, entry)) {
        return;
      }
      printGroup(map, entry, logger, maxLevel, reversed);
    }
  });
};
