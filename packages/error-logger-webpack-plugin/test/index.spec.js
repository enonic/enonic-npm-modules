const ErrorLogger = require('../index');

describe('ErrorLogger', () => {
  test('should crete new options, not modify passed', () => {
    const options = {};
    const logger = new ErrorLogger(options);

    expect(options).not.toHaveProperty('verbose');
    expect(logger).toHaveProperty('options.verbose', false);
  });

  test('should set options', () => {
    const logger = new ErrorLogger({ verbose: true });
    expect(logger).toHaveProperty('options.verbose', true);
  });
});
