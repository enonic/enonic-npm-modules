const { formatError } = require('./src/formatter');

const printError = (error, showStacktrace) => {
  console.error(formatError(error, showStacktrace));
};

const printWarning = (warning, showStacktrace) => {
  console.warn(formatError(warning, showStacktrace));
};

const defaultOptions = {
  verbose: false
};

function ErrorLogger(options) {
  this.options = Object.assign({}, defaultOptions, options);
}

// Use regular function on top level to save context
ErrorLogger.prototype.apply = function apply(compiler) {
  compiler.plugin('done', stats => {
    const { errors, warnings } = stats.compilation;

    if (stats.hasWarnings()) {
      warnings.forEach(warning => printWarning(warning, this.options.verbose));
    }

    if (stats.hasErrors()) {
      errors.forEach(error => printError(error, this.options.verbose));
      process.exit(1);
    }
  });
};

module.exports = ErrorLogger;
