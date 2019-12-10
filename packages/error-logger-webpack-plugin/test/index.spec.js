const ErrorLogger = require('../index');
const { createCompiler, createStats } = require('./compiler');

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

  test('should apply settings to compiler', () => {
    const compiler = createCompiler();
    const logger = new ErrorLogger({ verbose: true });

    const tapSpy = jest.spyOn(compiler.hooks.done, 'tap');

    logger.apply(compiler);

    expect(tapSpy).toHaveBeenCalledTimes(1);
    expect(compiler.doneFn).not.toBeNull();
  });

  test('should log errors and warnings when done', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const ERROR_CODE = 1;

    const compiler = createCompiler();
    const logger = new ErrorLogger({ verbose: true });

    logger.apply(compiler);

    const { doneFn } = compiler;
    expect(doneFn).not.toBeNull();

    let stats = createStats(true);
    let warningsSpy = jest.spyOn(stats.compilation.warnings, 'forEach');
    let errorsSpy = jest.spyOn(stats.compilation.errors, 'forEach');

    doneFn(stats);
    expect(warningsSpy).toHaveBeenCalledTimes(1);
    expect(errorsSpy).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);

    warningsSpy.mockRestore();
    errorsSpy.mockRestore();

    stats = createStats(false);
    warningsSpy = jest.spyOn(stats.compilation.warnings, 'forEach');
    errorsSpy = jest.spyOn(stats.compilation.errors, 'forEach');

    doneFn(createStats(false));
    expect(warningsSpy).not.toHaveBeenCalled();
    expect(errorsSpy).not.toHaveBeenCalled();

    warningsSpy.mockRestore();
    errorsSpy.mockRestore();
    mockExit.mockRestore();
  });
});
