import * as path from 'path';
import resolve from '../src/resolve';

describe('resolve()', () => {
  test(`Should be find only exported members`, () => {
    const file = path.join(__dirname, 'data/Resolve.ts');
    const result = resolve([file]);
    const expected = [
      'ArtType',
      'GameOfTheYear_2018_Edition',
      'WHType',
      'Warhammer',
      'Warhammer40k',
      'startCrusade'
    ];
    expect(result.size).toEqual(1);
    expect(result.has(file)).toBeTruthy();
    expect(result.get(file)!.exports).toBeTruthy();
    expect(result.get(file)!.exports).toEqual(expected);
  });
});
