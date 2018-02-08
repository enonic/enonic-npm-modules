<h1 align="center">browserslist-config-enonic</h1>

Shareable [Browserslist](https://github.com/ai/browserslist#shareable-configs) config for @enonic applications.

## Install

```
npm install --save-dev browserslist-config-enonic
```

## Usage

Choose the desired way to use Browserslist configuration. Additional information can be found in the official [documentation](https://github.com/ai/browserslist#shareable-configs).

###### package.json
```json
{
  "browserslist": [
    "extends browserslist-config-enonic"
  ]
}
```

###### Browserslist config (`.browserslistrc`)
```
extends browserslist-config-enonic
```

###### Babel config
In Babel configuration in `.js` format with [babel-preset-env](https://github.com/babel/babel/tree/master/experimental/babel-preset-env), requiring config will return the array of supported browsers.
```js
{
  presets: [
    [ 'env', {
      targets: {
        browsers: require('browserslist-config-enonic')
      }
    }]
  ]
}
```
