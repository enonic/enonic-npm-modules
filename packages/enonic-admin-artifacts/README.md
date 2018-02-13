<h1 align="center">enonic-admin-artifacts</h1>

Core rules and definitions for styles of enonic applications.

## Install ##

```
npm install --save-dev enonic-admin-artifacts
```

## Usage ##

Import the package from your `.less` file:

* [webpack](https://webpack.js.org/) (using [css-loader](https://github.com/webpack-contrib/css-loader)):
```less
@import '~enonic-admin-artifacts';
```
* Default [less](http://lesscss.org/usage/#programmatic-usage) or wrappers (like [gulp](https://www.npmjs.com/package/gulp-less)):
```less
@import '../node_modules/enonic-admin-artifacts/index';
```
Since less compiler can't manage links to node_modules, relative path to index file is needed.

## Main common variables ##

Among colors and mixins, `enonic-admin-artifacts` package defines an important property `@_COMMON_PREFIX` in [prefix.less](src/prefix.less) to set unique class names for some common classes from:
```less
.@{_COMMON_PREFIX}button {}; // => .xp-admin-common-button {}
```
