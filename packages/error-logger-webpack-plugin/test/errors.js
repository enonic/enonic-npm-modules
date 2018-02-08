const webpackError = {
  name: 'EntryModuleNotFoundError',
  message: `Entry module not found: Error: Can't resolve 'sample-loader' in 'path/to/file'`,
  details: `Can't resolve 'sample-loader' in 'path/to/file \n./path/to/node_modules/sample-loader doesn't exist'`,
  error: {
    details: `Can't resolve 'sample-loader' in 'path/to/file \n./path/to/node_modules/sample-loader doesn't exist'`,
    missing: ['./path/to/node_modules', './path/to/node_modules/sample-loader']
  },
  dependencies: [
    {
      module: null,
      request: './src/path/to/caller.js',
      userRequest: './src/path/to/caller.js',
      loc: 'main'
    }
  ]
};

const compilerError = {
  rawMessage: "error number: '=' expected.",
  message: "error number: '=' expected.",
  loaderSource: 'sample-loader',
  location: { line: 5, character: 21 },
  file: undefined,
  module: {
    request: '',
    userRequest: 'absolute/path/to/file.js',
    rawRequest: './relative/path/to/file',
    parser: {
      _plugins: [{}]
    },
    resource: 'absolute/path/to/file.js',
    loaders: [[{}]],
    fileDependencies: [],
    contextDependencies: [],
    error: null,
    _source: {},
    assets: {},
    built: true,
    _cachedSource: { source: [{}], hash: '4e4eaf97b0cc6406b4edadc66642572c' },
    issuer: {},
    optional: false,
    useSourceMap: true,
    cacheable: true
  }
};

const fileError = {
  rawMessage: "error number: '=' expected.",
  message: "error number: '=' expected.",
  loaderSource: 'sample-loader',
  location: { line: 5, character: 21 },
  file: 'absolute/path/to/file.js'
};

const tsLoaderErrorLong = {
  message:
    "\u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in \u001b[39m\u001b[22m\u001b[1m\u001b[36mC:\\path\\to\\File.ts(15,15)\u001b[39m\u001b[22m\r\n\u001b[1m\u001b[31m      TS2559: Type 'string' has no properties in common with type 'ModalDialogConfig'.\u001b[39m\u001b[22m",
  location: { line: 15, character: 15 },
  file: undefined,
  loaderSource: 'ts-loader',
  module: {
    resource: 'C:\\path\\to\\File.ts'
  }
};

const tsLoaderErrorShort = {
  message:
    "\u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in \u001b[39m\u001b[22m\u001b[1m\u001b[36mC:\\path\\to\\File.ts(10,9)\u001b[39m\u001b[22m\r\n\u001b[1m\u001b[31m      TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.\u001b[39m\u001b[22m",
  location: { line: 10, character: 9 },
  file: 'C:\\path\\to\\File.ts',
  loaderSource: 'ts-loader'
};

module.exports = {
  webpackError,
  compilerError,
  fileError,
  tsLoaderErrorLong,
  tsLoaderErrorShort
};
