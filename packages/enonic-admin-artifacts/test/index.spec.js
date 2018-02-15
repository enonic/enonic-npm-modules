const { render } = require('./utils');

describe('Enonic Artifacts', () => {
  test('should be compiled to valid css', async () => {
    const result = await render('../index.less');
    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty('css.length');
    expect(result.css.length).toBeGreaterThan(0);
  });
});
