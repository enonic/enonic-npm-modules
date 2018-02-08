<h1 align="center">enonic npm</h1>
<p align="center">Basic rules, styles and data shared across apps and libs.<p/>
<p align="center">
[![Travis Build Status][travis-image]][travis-url]
[![AppVeyor Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
<br/>
[![Dependency Status][dep-image]][dep-url]
[![devDependency Status][devdep-image]][devdep-url]
<p/>

## Usage ##

`enonic npm` is a monorepo, that contains several developer tools to help building:

* [`browserslist-config-enonic`](packages/browserslist-config-enonic#readme) — Browserslist config with the list of browsers, supported by enonic products.
* [`error-logger-webpack-plugin`](packages/error-logger-webpack-plugin#readme) — A webpack logger, primarily for logging to IntelliJ IDEA terminal.

## Publishing ##

Before publishing the changes in any package, read the [manual](PUBLISH.md).

## License ##

[GPL-3.0](LICENSE) © [enonic](https://enonic.com)

[travis-url]: https://travis-ci.org/enonic/enonic-npm
[travis-image]: https://travis-ci.org/enonic/enonic-npm.svg?branch=master "Linux build"

[appveyor-url]: https://ci.appveyor.com/project/edloidas/enonic-npm/branch/master
[appveyor-image]: https://ci.appveyor.com/api/projects/status/3pow16si5ia797at/branch/master?svg=true "Windows build"

[coveralls-url]: https://coveralls.io/github/enonic/enonic-npm?branch=master
[coveralls-image]: https://coveralls.io/repos/github/enonic/enonic-npm/badge.svg?branch=master

[dep-url]: https://david-dm.org/enonic/enonic-npm
[dep-image]: https://david-dm.org/enonic/enonic-npm.svg

[devdep-url]: https://david-dm.org/enonic/enonic-npm#info=devDependencies
[devdep-image]: https://david-dm.org/enonic/enonic-npm/dev-status.svg
