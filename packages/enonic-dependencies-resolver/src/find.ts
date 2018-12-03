import * as glob from 'glob';
import * as pify from 'pify';

const EXCLUDES = [/\.d\.ts$/, /_module.*\.ts$/];
const isValid = file => !EXCLUDES.some(exclude => exclude.test(file));

export default async function find(globPath): Promise<string[]> {
  const files = await pify(glob)(globPath);
  return files.filter(isValid);

};
