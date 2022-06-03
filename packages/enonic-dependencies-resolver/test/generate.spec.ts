import {describe, expect, test} from '@jest/globals';
import * as path from 'path';

import generate from '../src/generate';
import {FileData} from '../src/resolve';

type FileDataExporter = (exports: string[]) => FileData;

describe('generate()', () => {
  test(`Should be find only exported members`, () => {
    const baseFiles = ['data/Dependant.ts', 'data/Dependency.ts'].map(f =>
      path.join(__dirname, f)
    );
    const createFileData: FileDataExporter =
      (exports: string[]) => ({ exports, module: '', imports: [], usages: [] });
    const exports: Map<string, FileData> = new Map();
    exports.set(baseFiles[0], createFileData(['Dependant']));
    exports.set(baseFiles[1], createFileData(['Dependency']));

    const dependencies = generate(baseFiles, exports);

    expect(dependencies.size).toEqual(2);

    expect(dependencies.has(baseFiles[0])).toBeTruthy();
    expect(dependencies.get(baseFiles[0])!.depFor.length).toEqual(0);
    expect(dependencies.get(baseFiles[0])!.depOn.length).toEqual(1);
    expect(dependencies.get(baseFiles[0])!.depOn[0]).toEqual(baseFiles[1]);

    expect(dependencies.has(baseFiles[1])).toBeTruthy();
    expect(dependencies.get(baseFiles[1])!.depOn.length).toEqual(0);
    expect(dependencies.get(baseFiles[1])!.depFor.length).toEqual(1);
    expect(dependencies.get(baseFiles[1])!.depFor[0]).toEqual(baseFiles[0]);
  });
});
