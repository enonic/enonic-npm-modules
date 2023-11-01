import {rimraf} from 'rimraf';

export default async function clean(globPath): Promise<void> {
  await rimraf(globPath);
}
