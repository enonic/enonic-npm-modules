import {glob} from 'glob';

const EXCLUDES = [/\.d\.ts$/, /_module.*\.ts$/];
const isValid = file => !EXCLUDES.some(exclude => exclude.test(file));

export default async function find(globPath): Promise<string[]> {
  const files = await glob(globPath);
  return files.filter(isValid);
};
