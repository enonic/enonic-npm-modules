const { formatError } = require('./src/formatter');

const printError = (error, showStacktrace, showColumn) => {
  console.error(formatError(error, showStacktrace, showColumn));
};

const printWarning = (warning, showStacktrace, showColumn) => {
  console.warn(formatError(warning, showStacktrace, showColumn));
};

const defaultOptions = {
  verbose: false,
  showColumn: true,
};

function ErrorLogger(options) {
  this.options = { ...defaultOptions, ...options };
}

// Use regular function on top level to save context
ErrorLogger.prototype.apply = function apply(compiler) {
  const doneFn = (stats) => {
    const { errors, warnings } = stats.compilation;
    const { verbose, showColumn } = this.options;

    if (stats.hasWarnings()) {
      warnings.forEach((warning) => printWarning(warning, verbose, showColumn));
    }

    if (stats.hasErrors()) {
      errors.forEach((error) => printError(error, verbose, showColumn));
      process.exit(1);
    }
  };

  compiler.hooks.done.tap('ErrorLoggerPlugin', doneFn);
};

module.exports = ErrorLogger;
