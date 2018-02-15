const less = require('less');
const path = require('path');
const fs = require('fs');

module.exports = {
  render: function render(filePath, absolute = false) {
    return new Promise((resolve, reject) => {
      const file = absolute ? filePath : path.join(__dirname, filePath);
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
  }
};
