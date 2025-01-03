<h1 align="center">enonic npm modules</h1>
<p align="center">Basic rules, styles and data shared across apps and libs.<p/>

## Usage ##

`enonic-npm-modules` is a monorepo, that contains several developer tools to help building:

* [browserslist-config-enonic](packages/browserslist-config-enonic#readme) — Browserslist config with the list of browsers, supported by enonic products.
* [enonic-admin-artifacts](packages/enonic-admin-artifacts#readme) — Core rules and definitions for styles of enonic applications.
* [error-logger-webpack-plugin](packages/error-logger-webpack-plugin#readme) — A webpack logger, primarily for logging to IntelliJ IDEA terminal.
* [enonic-dependencies-resolver](packages/enonic-dependencies-resolver#readme) — A CLI tool to generate dependencies graph for selected files.
* [eslint-config](packages/eslint-config#readme) — A default Enonic's ESLint configuration for TypeScript and JavaScript projects for web and XP.
* [utility-types](packages/utility-types#readme) — A set of commonly used advanced TypeScript types, allowing to follow the DRY principle.

To install all dependencies in all packages, simply run `npm install` (will run `lerna bootstrap` afterwards).

## Publishing ##

Before publishing the changes in any package, read the [manual](PUBLISH.md).

## License ##

[GPL-3.0](LICENSE) © [enonic](https://enonic.com)
