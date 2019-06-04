/* eslint-disable import/prefer-default-export */
import glob from 'glob';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'; // Supports ECMAScript2015

const dict = arr => Object.assign(...arr.map(([k, v]) => ({ [k]: v })));
const toStr = v => JSON.stringify(v, null, 4);

const SRC_DIR = 'src/main/resources';
const SRC_ASSETS_DIR = `${SRC_DIR}/assets`;
const DST_DIR = 'build/resources/main';

export function webpackServerSideJs({
  __dirname,
  extensions = ['es', 'es6', 'js'],
  extensionsGlob = `{${extensions.join(',')}}`,
  assetsGlob = `${SRC_ASSETS_DIR}/**/*.${extensionsGlob}`,
  files = glob.sync(`${SRC_DIR}/**/*.${extensionsGlob}`, {
    ignore: assetsGlob
  }),
  context = path.resolve(__dirname, SRC_DIR),
  entry = dict(
    files.map(k => [
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
  resolveExtentions = ['mjs', 'jsx', 'esm', 'es', 'es6', 'js', 'json'],
  stats = {
    colors: true,
    hash: false,
    maxModules: 0,
    modules: false,
    moduleTrace: false,
    timings: false,
    version: false
  }
}) {
  // console.log(toStr({ files }));
  if (!files.length) {
    console.error('Webpack did not find any files to process!');
    process.exit();
  }
  return {
    context,
    entry,
    externals,
    devtool,
    mode,
    module: {
      rules: [
        {
          test: /\.(es6?|js)$/, // Will need js for node module depenencies
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
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-syntax-throw-expressions',
                  '@babel/plugin-transform-object-assign',
                  'array-includes' // ,
                  // 'transform-es2017-object-entries'
                ],
                presets: [
                  [
                    '@babel/preset-env',
                    {
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
    plugins: [],
    resolve: {
      extensions: resolveExtentions.map(ext => `.${ext}`)
    },
    stats
  };
} // function webpackEsmAssets
