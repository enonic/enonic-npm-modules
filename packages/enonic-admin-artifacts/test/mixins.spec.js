const path = require('path');
const fs = require('fs');

const { render } = require('./utils');

const mixinsPath = path.join(__dirname, 'mixins');

function listLess(basePath) {
  return fs
    .readdirSync(basePath)
    .map((file) => {
      const filePath = path.join(basePath, file);
      const isDir = fs.statSync(filePath).isDirectory();
      if (isDir) {
        return listLess(filePath);
      }
      return filePath;
    })
    .reduce((a, b) => a.concat(b), []);
}

describe('Enonic Artifacts', () => {
  listLess(mixinsPath).forEach((filePath) => {
    const relativePath = path.relative(mixinsPath, filePath);
    test(`should be compiled (${relativePath})`, async () => {
      const result = await render(filePath, true);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('css.length');
      expect(result.css.length).toBeGreaterThan(0);
    });
  });
});
