# Webpack ecmascript module assets

## Install

```
npm install --save-dev @enonic/webpack-esm-assets
```

## Usage

```
import {webpackEsmAssets} from '@enonic/webpack-esm-assets';

const ESM_CONFIG = webpackEsmAssets({
	__dirname
});

const WEBPACK_CONFIG = [
  ESM_CONFIG
];

export { WEBPACK_CONFIG as default };
```

## What does it do

It compiles these:
```
./src/main/resources/assets/**/*.mjs
./src/main/resources/assets/**/*.jsx
./src/main/resources/assets/**/*.esm
./src/main/resources/assets/**/*.es
./src/main/resources/assets/**/*.es6
./src/main/resources/assets/**/*.js
```

Into:
```
./build/resources/main/assets/**/*.esm.js
```
