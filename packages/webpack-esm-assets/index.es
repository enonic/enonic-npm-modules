import glob from 'glob';
import path from 'path';
import EsmWebpackPlugin from '@purtuga/esm-webpack-plugin';


const dict = arr => Object.assign(...arr.map(([k, v]) => ({ [k]: v })));


const SRC_ASSETS_DIR = 'src/main/resources/assets';
const DST_ASSETS_DIR = 'build/resources/main/assets';


export function webpackEsmAssets({
  __dirname,
  extensions = ['mjs', 'jsx', 'esm', 'es', 'es6', 'js', '.json'],
  extensionsGlob = `{${extensions.join(',')}}`,
  assetsGlob = `${SRC_ASSETS_DIR}/**/*.${extensionsGlob}`,
  assetFiles = glob.sync(assetsGlob),
  context = path.resolve(__dirname, SRC_ASSETS_DIR),
  entry = dict(assetFiles.map(k => [
  	k.replace(`${SRC_ASSETS_DIR}/`, '').replace(/\.[^.]*$/, ''), // name
  	`.${k.replace(SRC_ASSETS_DIR, '')}` // source relative to context
  ]));,
  mode = 'production',
  output = {
    filename: outputFilename = '[name].esm.js',
    path: outputPath = path.join(__dirname, DST_ASSETS_DIR),
  },
  performance = {
		hints: performanceHints = false
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
}) {
  return {
    context,
    entry,
    mode,
    module: {
  		rules: [{
  			test: /\.(es6?|m?jsx?)$/, // Will need js for node module depenencies
  			use: [{
  				loader: 'babel-loader',
  				options: {
  					babelrc: false, // The .babelrc file should only be used to transpile config files.
  					comments: false,
  					compact: false,
  					minified: false,
  					plugins: [
  						'@babel/plugin-proposal-class-properties',
  						'@babel/plugin-proposal-object-rest-spread',
  						'@babel/plugin-syntax-dynamic-import',
  						'@babel/plugin-syntax-throw-expressions',
  						'@babel/plugin-transform-object-assign',
  						/*['@babel/plugin-transform-runtime', { // This destroys esm.
  				      		regenerator: true
  				    	}],*/
  						'array-includes'
  					],
  					presets: [
  						[
  							'@babel/preset-env',
  							{
  								useBuiltIns: false // false means polyfill not required runtime
  							}
  						],
  						'@babel/preset-react'
  					]
  				} // options
  			}]
  		}]
  	}, // module
    /*optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          sourceMap: false
        })
      ]
    },*/
    output: {
  		path: outputPath,
  		filename: outputFilename,
  		library: 'LIB',
  		libraryTarget: 'var'
  	},
    performance: {
      hints: performanceHints
    },
    plugins: [
  		new EsmWebpackPlugin()
  	],
    resolve: {
  		extensions: extensions.map(ext => `.${ext}`)
    },
    stats
  };
} // function webpackEsmAssets
