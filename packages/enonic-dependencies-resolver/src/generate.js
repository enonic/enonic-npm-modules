const fs = require('fs');

const createEnrtyRegExp = name =>
  new RegExp(`([^\\w]${name}[^\\w])|(^${name}[^\\w])|(^${name}$)`);

module.exports = function generate(files, entries) {
  const map = new Map();

  entries.forEach((exports, filePath) =>
    map.set(filePath, { depOn: [], depFor: [] })
  );

  files.forEach(file => {
    const code = fs.readFileSync(file, 'utf8');
    entries.forEach((exports, filePath) => {
      if (file !== filePath) {
        const isDependency = exports.some(
          exp => code.search(createEnrtyRegExp(exp)) >= 0
        );
        if (isDependency) {
          map.get(filePath).depFor.push(file);
          if (map.has(file)) {
            map.get(file).depOn.push(filePath);
          }
        }
      }
    });
  });

  return map;
};
