const path = require('path');

import find from './src/find';
import resolve, {resolveExports} from './src/resolve';
import generate from './src/generate';
import print from './src/print';
import modify from './src/modify';
import clean from './src/clean';

const FILES_ALL = './**/*.ts';
const FILES_MODULE = './**/_module*.ts';

export interface ListFlags {
  prefix: string;
  file: string;
  level: number;
  internal: boolean;
  reversed: boolean;
}

export async function list(
  pattern: string = FILES_ALL,
  { prefix, file, level = Number.MAX_SAFE_INTEGER, internal, reversed }: ListFlags
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
  const exports = resolveExports(files);

  console.log('Creating dependencies graph...');
  const dependencies = generate(baseFiles, exports);

  console.log('Parsing graph...\n');
  print(dependencies, file, level, !!internal, !!reversed);
};

export async function migrate() {
  const filesPath = path.resolve(FILES_ALL);
  console.log('Finding files...');
  const files: string[] = await find(filesPath);
  console.log(`Found ${files.length} files.`);
  const filesData = resolve(files);
  modify(filesData);
  clean(FILES_MODULE);
};
