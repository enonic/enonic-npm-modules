const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './main.ts',
  output: {
    path: path.resolve(__dirname),
    filename: './index.js',
    libraryTarget: 'commonjs',
    hotUpdateChunkFilename: 'hot/[name].hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  mode: isProd ? 'production' : 'development',
};
