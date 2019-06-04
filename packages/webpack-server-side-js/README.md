# Webpack server-side javascript

## Install

```
npm install --save-dev @enonic/webpack-server-side-js
```

## Usage

```
import {webpackServerSideJs} from '@enonic/webpack-server-side-js';

const SERVER_SIDE_JS_CONFIG = webpackServerSideJs({
	__dirname
});

const WEBPACK_CONFIG = [
  SERVER_SIDE_JS_CONFIG
];

export { WEBPACK_CONFIG as default };
```

## What does it do

It compiles these:
```
./src/main/resources/**/*.es
./src/main/resources/**/*.es6
./src/main/resources/**/*.js
```

Except these:
```
./src/main/resources/assets/**/*.es
./src/main/resources/assets/**/*.es6
./src/main/resources/assets/**/*.js
```

Into:
```
./build/resources/main/**/*.js
```
