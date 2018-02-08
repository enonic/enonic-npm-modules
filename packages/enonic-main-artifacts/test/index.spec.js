const less = require('less');
const path = require('path');
const fs = require('fs');

describe('Enonic Artifacts', () => {
  test('should be compiled to valid css', async () => {
    const result = await new Promise((resolve, reject) => {
      const file = path.join(__dirname, '../index.less');
      const data = fs.readFileSync(file, 'utf8');
      const options = { filename: path.resolve(file) };
      less.render(data, options, (err, output) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(output);
        }
      });
    });
    expect(result).not.toBeNull();
    expect(result.css).toEqual('');
  });
});
