/* eslint-disable import/prefer-default-export */

import glob from 'glob';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';

const dict = arr => Object.assign(...arr.map(([k, v]) => ({ [k]: v })));
// const toStr = v => JSON.stringify(v, null, 4);

export function webpackStyleAssets(params) {
  const { __dirname } = params;
  if (!__dirname) {
    throw new Error('webpackStyleAssets: __dirname is a required parameter');
  }
  const {
    srcStyleDir = 'src/main/resources/assets/style',
    dstStyleDir = 'build/resources/main/assets/style',

    context = path.resolve(__dirname, srcStyleDir),

    devtool = false,

    extensions = ['sass', 'scss', 'less', 'styl', 'css'],
    extensionsGlob = `{${extensions.join(',')}}`,
    filename = 'main',
    styleGlob = `${srcStyleDir}/${filename}.${extensionsGlob}`,
    styleFiles = glob.sync(styleGlob),
    entry = dict(
      styleFiles.map(k => [
        k.replace(`${srcStyleDir}/`, '').replace(/\.[^.]*$/, ''), // name
        `.${k.replace(srcStyleDir, '')}` // source relative to context
      ])
    ),

    externals,

    mode = 'production',

    styleUse = [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: { importLoaders: 1 }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [postcssPresetEnv()]
        }
      }
    ],

    module = {
      rules: [
        {
          test: /\.(c|le|sa|sc)ss$/,
          use: [
            ...styleUse,
            'less-loader', // compiles Less to CSS
            'sass-loader' // compiles Sass to CSS
          ]
        },
        {
          test: /\.styl$/,
          use: [
            ...styleUse,
            'stylus-loader' // compiles Stylus to CSS
          ]
        },
        {
          test: /\.svg/,
          use: {
            loader: 'svg-url-loader',
            options: {}
          }
        }
      ]
    },

    outputFilename = 'bundle',
    outputPath = path.join(__dirname, '.build'),
    output = {
      filename: 'styleBundle.js',
      path: outputPath
    },

    plugins = [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [outputPath],
        verbose: true
      }),
      new MiniCssExtractPlugin({
        filename: `../${dstStyleDir}/${outputFilename}.css`
      })
    ],

    resolveExtensions = ['sass', 'scss', 'less', 'styl', 'css'],
    resolve = {
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
  /* console.log(
    toStr({
      __dirname,
      srcStyleDir,
      dstStyleDir,
      context,
      extensions,
      extensionsGlob,
      styleGlob,
      styleFiles,
      entry,
      mode,
      styleUse,
      module,
      output,
      plugins,
      resolve,
      stats
    })
  );*/
  if (!styleFiles.length) {
    console.error('Webpack did not find any style files to process!');
    process.exit(); // Webpack makes process an export?
  }
  const styleWebpackConfig = {
    context,
    devtool,
    entry,
    externals,
    mode,
    module,
    output,
    plugins,
    resolve,
    stats
  };
  // console.log(toStr({ styleWebpackConfig }));
  return styleWebpackConfig;
}
