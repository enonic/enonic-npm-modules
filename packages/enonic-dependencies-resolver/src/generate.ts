import * as fs from 'fs';
import {FileData} from './resolve';

export interface Dependencies {
  depOn: string[];
  depFor: string[];
}

const createEnrtyRegExp = name =>
  new RegExp(`([^\\w]${name}[^\\w])|(^${name}[^\\w])|(^${name}$)`);

export default function generate(files: string[], entries: Map<string, FileData>): Map<string, Dependencies> {
  const map: Map<string, Dependencies> = new Map();

  entries.forEach((v, filePath) =>
    map.set(filePath, { depOn: [], depFor: [] })
  );

  files.forEach(file => {
    const code = fs.readFileSync(file, 'utf8');

    entries.forEach((data: FileData, filePath: string) => {
      if (file !== filePath) {

        const isDependency = data.exports.some(
          exp => code.search(createEnrtyRegExp(exp)) >= 0
        );
        if (isDependency) {
          if (map.has(filePath)) {
            (<Dependencies>map.get(filePath)).depFor.push(file);
          }
          if (map.has(file)) {
            (<Dependencies>map.get(file)).depOn.push(filePath);
          }
        }
      }
    });
  });

  return map;
};
