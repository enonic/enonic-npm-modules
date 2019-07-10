/* eslint-disable import/prefer-default-export */
import glob from 'glob';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'; // Supports ECMAScript2015

const dict = arr => Object.assign(...arr.map(([k, v]) => ({ [k]: v })));
// const toStr = v => JSON.stringify(v, null, 4);

const SRC_DIR = 'src/main/resources';
const SRC_ASSETS_DIR = `${SRC_DIR}/assets`;
const DST_DIR = 'build/resources/main';

export function webpackServerSideJs(params) {
  const { __dirname } = params;
  if (!__dirname) {
    throw new Error('webpackStyleAssets: __dirname is a required parameter');
  }
  const {
    context = path.resolve(__dirname, SRC_DIR),

    extensions = ['es', 'es6', 'js'],
    extensionsGlob = `{${extensions.join(',')}}`,
    assetsGlob = `${SRC_ASSETS_DIR}/**/*.${extensionsGlob}`,
    serverSideFiles = glob.sync(`${SRC_DIR}/**/*.${extensionsGlob}`, {
      ignore: assetsGlob
    }),
    entry = dict(
      serverSideFiles.map(k => [
        k.replace(`${SRC_DIR}/`, '').replace(/\.[^.]*$/, ''), // name
        `.${k.replace(SRC_DIR, '')}` // source relative to context
      ])
    ),

    externals = [/^\//],

    devtool = false,

    mode = 'production',

    outputFilename = '[name].js',
    outputPath = path.join(__dirname, DST_DIR),
    /* output = {
      filename: outputFilename,
      path: outputPath,
    },*/

    performanceHints = false,
    /* performance = {
      hints: performanceHints
    },*/

    plugins = [],

    resolveAlias,
    resolveExtensions = [
      'mjs',
      'jsx',
      'esm',
      'es',
      'es6',
      'ts',
      'tsx',
      'js',
      'json'
    ],
    resolve = {
      alias: resolveAlias,
      extensions: resolveExtensions.map(ext => `.${ext}`)
    },

    stats = {
      colors: true,
      hash: false,
      maxModules: 0,
      modules: false,
      moduleTrace: false,
      timings: false,
      version: false
    }
  } = params;
  /* console.log(toStr({
    __dirname,
    context,
    extensions,
    extensionsGlob,
    assetsGlob,
    serverSideFiles,
    entry,
    externals,
    devtool,
    mode,
    plugins,
    resolve
  }));*/

  if (!serverSideFiles.length) {
    console.error('Webpack did not find any files to process!');
    process.exit();
  }

  const serverSideWebpackConfig = {
    context,
    entry,
    externals,
    devtool,
    mode,
    module: {
      rules: [
        {
          test: /\.(es6?|tsx?|js)$/, // Will need js for node module depenencies
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false, // The .babelrc file should only be used to transpile config files.
                comments: false,
                compact: false,
                minified: false,
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-export-default-from',
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-syntax-throw-expressions',
                  '@babel/plugin-transform-modules-commonjs',
                  '@babel/plugin-transform-object-assign',
                  'array-includes',
                  'transform-es2017-object-entries'
                ],
                presets: [
                  '@babel/preset-typescript',
                  [
                    '@babel/preset-env',
                    {
                      // Enables all transformation plugins and as a result,
                      // your code is fully compiled to ES5
                      forceAllTransforms: true,
                      useBuiltIns: false // false means polyfill not required runtime
                    }
                  ]
                ]
              } // options
            }
          ]
        }
      ]
    }, // module
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          sourceMap: false
        })
      ]
    },
    output: {
      path: outputPath,
      filename: outputFilename,
      libraryTarget: 'commonjs'
    },
    performance: {
      hints: performanceHints
    },
    plugins,
    resolve,
    stats
  };
  // console.log(toStr({ serverSideWebpackConfig }));
  return serverSideWebpackConfig;
} // function webpackEsmAssets
