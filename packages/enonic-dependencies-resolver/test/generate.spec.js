const path = require('path');
const generate = require('../src/generate');

describe('generate()', () => {
  test(`Should be find only exported members`, () => {
    const baseFiles = ['data/Dependant.ts', 'data/Dependency.ts'].map(f =>
      path.join(__dirname, f)
    );
    const exports = new Map();
    exports.set(baseFiles[0], ['Dependant']);
    exports.set(baseFiles[1], ['Dependency']);

    const dependencies = generate(baseFiles, exports);

    expect(dependencies.size).toEqual(2);

    expect(dependencies.get(baseFiles[0]).depFor.length).toEqual(0);
    expect(dependencies.get(baseFiles[0]).depOn.length).toEqual(1);
    expect(dependencies.get(baseFiles[0]).depOn[0]).toEqual(baseFiles[1]);

    expect(dependencies.get(baseFiles[1]).depOn.length).toEqual(0);
    expect(dependencies.get(baseFiles[1]).depFor.length).toEqual(1);
    expect(dependencies.get(baseFiles[1]).depFor[0]).toEqual(baseFiles[0]);
  });
});
