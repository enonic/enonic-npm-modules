const less = require('less');
const path = require('path');
const fs = require('fs');

describe('Enonic Artifacts', () => {
  test('should be compiled to valid css', async () => {
    const result = await new Promise((resolve, reject) => {
      const file = path.join(__dirname, './index.spec.less');
      const data = fs.readFileSync(file, 'utf8');
      const options = { filename: path.resolve(file) };
      less.render(data, options, (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      });
    }).catch(err => {
      console.error(err);
    });
    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty('css.length');
    expect(result.css.length).toBeGreaterThan(0);
  });
});
