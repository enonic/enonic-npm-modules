import path from 'path';
import EsmWebpackPlugin from '@purtuga/esm-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

// ──────────────────────────────────────────────────────────────────────────────

const CONTEXT = path.resolve(__dirname, 'src');
const ENTRY = {
  index: './index.mjs'
};
const DEVTOOL = false;
const MODE = 'production';
const TEST = /\.(es6?|m?jsx?)$/;
const BABEL_PRESETS = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: false // false means polyfill not required runtime
    }
  ],
  '@babel/preset-react'
];
const OUTPUT_PATH = path.join(__dirname, 'dist');
const RESOLVE = {
  extensions: [
    '.js', // Or node_modules will fail to resolve
    '.jsx',
    '.mjs'
  ]
};

// ──────────────────────────────────────────────────────────────────────────────

const UMD_CONFIG = {
  context: CONTEXT,
  entry: ENTRY,
  devtool: DEVTOOL,
  mode: MODE,
  module: {
    rules: [
      {
        test: TEST,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false, // The .babelrc file should only be used to transpile config files.
              comments: false,
              compact: false,
              minified: false,
              plugins: [
                'array-includes',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-object-assign'
              ],
              presets: BABEL_PRESETS
            } // options
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        terserOptions: {
          compress: {
            drop_console: false
          },
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].umd.js',
    // library: 'LIB',
    libraryTarget: 'umd'
  },
  resolve: RESOLVE
};

// ──────────────────────────────────────────────────────────────────────────────

const CJS_CONFIG = {
  context: CONTEXT,
  devtool: DEVTOOL,
  entry: ENTRY,
  /* externals: [
    'formik',
    'semantic-ui-react'
  ],*/
  mode: MODE,
  module: {
    rules: [
      {
        test: TEST,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false, // The .babelrc file should only be used to transpile config files.
              comments: false,
              compact: false,
              minified: false,
              plugins: [
                'array-includes',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-object-assign'
              ],
              presets: BABEL_PRESETS
            } // options
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        terserOptions: {
          compress: {
            drop_console: false
          },
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].cjs.js',
    libraryTarget: 'commonjs'
  },
  resolve: RESOLVE
};

// ──────────────────────────────────────────────────────────────────────────────

const ESM_CONFIG = {
  context: CONTEXT,
  entry: ENTRY,
  devtool: DEVTOOL,
  mode: MODE,
  module: {
    rules: [
      {
        test: TEST,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false, // The .babelrc file should only be used to transpile config files.
              comments: false,
              compact: false,
              minified: false,
              plugins: [
                'array-includes',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-object-assign'
              ],
              presets: BABEL_PRESETS
            } // options
          }
        ]
      }
    ]
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].esm.js',
    library: 'LIB',
    libraryTarget: 'var'
  },
  plugins: [new EsmWebpackPlugin()],
  resolve: RESOLVE
};

// ──────────────────────────────────────────────────────────────────────────────

export default [UMD_CONFIG, CJS_CONFIG, ESM_CONFIG];
