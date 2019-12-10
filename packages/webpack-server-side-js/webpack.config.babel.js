/* eslint-disable */
/* prettier-ignore */

import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

const WEBPACK_CONFIG = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './index.es'
    },
    externals: [
        'fs',
        'glob',
        'path',
        'uglifyjs-webpack-plugin'
    ],
    devtool: false,
    mode: 'production',
    module: {
        rules: [{
            test: /\.(es6?|js)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false, // The .babelrc file should only be used to transpile config files.
                    comments: false,
                    compact: false,
                    minified: false,
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-transform-object-assign',
                        'array-includes'
                    ],
                    presets: ['@babel/preset-env']
                } // options
            }]
        }]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
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
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs'
    }
};
//console.log(`WEBPACK_CONFIG:${toStr(WEBPACK_CONFIG)}`);

export {WEBPACK_CONFIG as default};
