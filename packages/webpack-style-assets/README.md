# Webpack style assets

## Install

```
npm install --save-dev @enonic/webpack-style-assets
```

## Usage

```
import {webpackStyleAssets} from '@enonic/webpack-style-assets';

const STYLE_CONFIG = webpackStyleAssets({
	__dirname
});

const WEBPACK_CONFIG = [
  STYLE_CONFIG
];

export { WEBPACK_CONFIG as default };
```

## What does it do

It compiles these:
```
./src/main/resources/assets/style/main.sass
./src/main/resources/assets/style/main.scss
./src/main/resources/assets/style/main.less
./src/main/resources/assets/style/main.styl
./src/main/resources/assets/style/main.css
```

Into:
```
./build/resources/main/assets/style/bundle.css
```
