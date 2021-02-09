import * as rimraf from 'rimraf';
import pify from 'pify';

export default async function clean(globPath) {
  await pify(rimraf)(globPath);
}
