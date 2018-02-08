<h1 align="center">enonic npm</h1>
<p align="center">Basic rules, styles and data shared across apps and libs.<p/>

[![Travis Build Status][travis-image]][travis-url]
[![AppVeyor Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependency Status][dep-image]][dep-url]
[![devDependency Status][devdep-image]][devdep-url]


## Usage ##

`enonic-npm` is a monorepo, that contains several developer tools to help building:

* [browserslist-config-enonic](packages/browserslist-config-enonic#readme) — Browserslist config with the list of browsers, supported by enonic products.
* [browserslist-main-artifacts](packages/browserslist-main-artifacts#readme) — Core rules and definitions for styles of enonic applications.
* [error-logger-webpack-plugin](packages/error-logger-webpack-plugin#readme) — A webpack logger, primarily for logging to IntelliJ IDEA terminal.

## Publishing ##

Before publishing the changes in any package, read the [manual](PUBLISH.md).

## License ##

[GPL-3.0](LICENSE) © [enonic](https://enonic.com)

[travis-url]: https://travis-ci.org/enonic/enonic-npm
[travis-image]: https://img.shields.io/travis/enonic/enonic-npm.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSItMTQyLjUgLTE0Mi41IDI4NSAyODUiPjxjaXJjbGUgcj0iMTQxLjciIGZpbGw9IiNERDQ4MTQiLz48ZyBpZD0iYSIgZmlsbD0iI0ZGRiI%2BPGNpcmNsZSBjeD0iLTk2LjQiIHI9IjE4LjkiLz48cGF0aCBkPSJNLTQ1LjYgNjguNGMtMTYuNi0xMS0yOS0yOC0zNC00Ny44IDYtNSA5LjgtMTIuMyA5LjgtMjAuNnMtMy44LTE1LjctOS44LTIwLjZjNS0xOS44IDE3LjQtMzYuNyAzNC00Ny44bDEzLjggMjMuMkMtNDYtMzUuMi01NS4zLTE4LjctNTUuMyAwYzAgMTguNyA5LjMgMzUuMiAyMy41IDQ1LjJ6Ii8%2BPC9nPjx1c2UgeGxpbms6aHJlZj0iI2EiIHRyYW5zZm9ybT0icm90YXRlKDEyMCkiLz48dXNlIHhsaW5rOmhyZWY9IiNhIiB0cmFuc2Zvcm09InJvdGF0ZSgyNDApIi8%2BPC9zdmc%2B "Linux build"

[appveyor-url]: https://ci.appveyor.com/project/edloidas/enonic-npm/branch/master
[appveyor-image]: https://img.shields.io/appveyor/ci/edloidas/enonic-npm.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48ZyBmaWxsPSIjMUJBMUUyIiB0cmFuc2Zvcm09InNjYWxlKDgpIj48cGF0aCBkPSJNMCAyLjI2NWw2LjUzOS0uODg4LjAwMyA2LjI4OC02LjUzNi4wMzd6Ii8%2BPHBhdGggZD0iTTYuNTM2IDguMzlsLjAwNSA2LjI5My02LjUzNi0uODk2di01LjQ0eiIvPjxwYXRoIGQ9Ik03LjMyOCAxLjI2MWw4LjY3LTEuMjYxdjcuNTg1bC04LjY3LjA2OXoiLz48cGF0aCBkPSJNMTYgOC40NDlsLS4wMDIgNy41NTEtOC42Ny0xLjIyLS4wMTItNi4zNDV6Ii8%2BPC9nPjwvc3ZnPg== "Windows build"

[coveralls-url]: https://coveralls.io/github/enonic/enonic-npm?branch=master
[coveralls-image]: https://coveralls.io/repos/github/enonic/enonic-npm/badge.svg?branch=master

[dep-url]: https://david-dm.org/enonic/enonic-npm
[dep-image]: https://david-dm.org/enonic/enonic-npm.svg

[devdep-url]: https://david-dm.org/enonic/enonic-npm#info=devDependencies
[devdep-image]: https://david-dm.org/enonic/enonic-npm/dev-status.svg
