const path = require('path');

const formatPath = file => (file ? path.normalize(file) : '');
const formatLocation = (location, showColumn = true) => {
  const valid = location && location.line && location.character;
  if (!valid) {
    return '';
  }

  return showColumn
    ? `:${location.line}:${location.character}`
    : `:${location.line}`;
};

const isTSLoaderError = err =>
  !!(err.loaderSource === 'ts-loader' && err.message && !err.rawMessage);
const isWebpackError = err => !!(err.name && err.message && err.details);
const isCompilerError = err =>
  !!(err.rawMessage && err.location && err.module && err.module.resource);
const isFileError = err => !!(err.rawMessage && err.location && err.file);

const formatError = (error, showStacktrace = false, showColumn = true) => {
  if (showStacktrace) {
    return error;
  }
  if (isTSLoaderError(error)) {
    const { location, message, module, file } = error;
    const formattedLocation = formatLocation(location, showColumn);
    const rawLocation = `(${location.line},${location.character})`;
    const filePath = (module && module.resource) || file;
    const from = filePath ? message.indexOf(filePath) : 0;
    return message.replace(rawLocation, `${formattedLocation}`).substring(from);
  }
  if (isCompilerError(error) || isFileError(error)) {
    const { file, location, rawMessage } = error;
    const filePath = (error.module && error.module.resource) || file;
    const formattedLocation = formatLocation(location, showColumn);
    return `${formatPath(filePath)}${formattedLocation} ${rawMessage}`;
  }
  if (isWebpackError(error)) {
    return `${error.name}: ${error.message}`;
  }

  return error;
};

module.exports = {
  isTSLoaderError,
  isWebpackError,
  isCompilerError,
  isFileError,
  formatPath,
  formatLocation,
  formatError
};
