import * as rimraf from 'rimraf';
import * as pify from 'pify';

export default async function clean(globPath) {
  await pify(rimraf)(globPath);
}
