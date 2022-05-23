Enonic ESLint Config
===

## Install

1. Install the latest version of the config:

```sh
npm install --save-dev @enonic/eslint-config
```

2. Install the correct versions of each package, which are listed by the command:

```sh
npm info "@enonic/eslint-config@latest" peerDependencies
```

> If you __DON'T__ need to lint TypeScript, you should skip this step (see the [vanilla configuration](#vanilla-javascript)).

Make sure you intall the same version of `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` packages.


## Usage

`.eslintrc.json`
```
{
    "extends": "@enonic/eslint-config",
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "parserOptions": {
                "project": "./tsconfig.json"
            }
        }
    ]
}
```

Some of the rules require `parserServices` to be generated, therefore `project` property must be explicitly set. Take a note, that TypeScript configuration is isolated by the `*.ts`/`*.tsx` scope.

## Configuration

Aside from `@enonic/eslint-config`, this package contains four more configurations:

  __Standalone__
* `@enonic/eslint-config/vanilla` should replace default configuration in JavaScript-only projects.
* `@enonic/eslint-config/typescript` should replace default configuration in TypeScript-only projects.

__Helpers__
* `@enonic/eslint-config/browser` adds additional configuration for linting browser files (assets).
* `@enonic/eslint-config/xp` adds XP global variables and allows to lint files that will be used by XP.

Helpers must be combined with the default, vanilla, or typescript configuration.

### XP and Browser

Your project may contain both server-side and client-side files. In this case, it might be reasonable to use overrides, to prevent specific config to be applied for improper files:

`.eslintrc.json`
```diff
{
    "extends": "@enonic/eslint-config",
    "overrides": [
+       {
+           "files": [
+               "src/main/resources/assets/*.js",
+               "src/main/resources/assets/*.ts"
+           ],
+           "extends": "@enonic/eslint-config/browser"
+       },
+       {
+           "files": [
+               "src/main/resources/lib/*.js",
+               "src/main/resources/lib/*.ts"
+           ],
+           "extends": "@enonic/eslint-config/xp"
+       },
        {
            "files": ["*.ts", "*.tsx"],
            "parserOptions": {
                "project": "./tsconfig.json"
            }
        }
    ]
}
```

### Vanilla JavaScript

The default configuration will lint both TS and JS files. If your project doesn't use TypeScript, then `@enonic/eslint-config/vanilla` configuration can be used instead. `project` property must not be specified. No other TS-related peer dependencies must be installed either.

`.eslintrc.json`
```diff
{
-   "extends": "@enonic/eslint-config",
+   "extends": "@enonic/eslint-config/vanilla",
    "overrides": [
-       {
-           "files": ["*.ts", "*.tsx"],
-           "parserOptions": {
-               "project": "./tsconfig.json"
-           }
-       }
+       {
+           "files": ["src/main/resources/assets/*.js"],
+           "extends": "@enonic/eslint-config/browser"
+       },
+       {
+           "files": ["src/main/resources/lib/*.js"],
+           "extends": "@enonic/eslint-config/xp"
+       }
    ]
}
```

### TypeScript

When using the TypeScript configuration instead of the default one, `project` property must be moved to the `parserOptions` under the config's root. This configuration should be prefered over the default one, if you lint TypeScript files only. It simplifies the configuration file a bit.

`.eslintrc.json`
```diff
{
-   "extends": "@enonic/eslint-config",
+   "extends": "@enonic/eslint-config/typescript",
+   "parserOptions": {
+       "project": "./tsconfig.json"
+   }
    "overrides": [
-       {
-           "files": ["*.ts", "*.tsx"],
-           "parserOptions": {
-               "project": "./tsconfig.json"
-           }
-       }
+       {
+           "files": ["src/main/resources/assets/*.ts"],
+           "extends": "@enonic/eslint-config/browser"
+       },
+       {
+           "files": ["src/main/resources/lib/*.ts"],
+           "extends": "@enonic/eslint-config/xp"
+       }
    ]
}
```

## License

[MIT](LICENSE) © [Enonic](https://enonic.com)

