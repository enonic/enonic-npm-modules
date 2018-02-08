<h1 align="center">error-logger-webpack-plugin</h1>

Log webpack errors in readable format, suitable for navigation.

## Install

```
npm install --save-dev error-logger-webpack-plugin
```

## Usage ##

##### webpack.config.js #####
```js
const ErrorLoggerPlugin = require('error-logger-webpack-plugin');
// ...

const config = {
  // ...
  plugins: [
    new ErrorLoggerPlugin({verbose: false})
  ]
};

module.exports = config;
```

See the official webpack [documentation](https://webpack.js.org/concepts/plugins/#usage) for a deeper explanation of plugin usage.

## Configuration ##

You can pass a hash of configuration options to `ErrorLoggerPlugin`, such as:
* `verbose`: `true | false` If `false` (default) try to minimize the error message.
