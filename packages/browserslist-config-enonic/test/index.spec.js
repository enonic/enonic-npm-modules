const browserslist = require('browserslist');
const config = require('../index');

describe('BrowsersList', () => {
  test('should resolve a list of browsers', () => {
    const browsers = browserslist(config);
    expect(browsers.length).toBeGreaterThan(0);
    console.log(`Resolved the following browsers:\n${browsers.join('\n')}`);
  });
});
