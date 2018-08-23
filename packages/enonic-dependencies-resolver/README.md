<h1 align="center">enonic-dependencies-resolver</h1>

A CLI tool to generate dependencies graph for selected files.

## Install ##

```
npm install -g enonic-dependencies-resolver
```

## Usage ##

Use it from CLI by running:
```
$ edr [options] [<path>]
```

#### Examples ####

Analyze files `./content/**/*.ts` and shows the graphs, with files, that don't have dependencies amoung the analyzable files, as root elements.

```
edr src/js/**/content/*.ts
```

<br/>

Analyze files `./content/**/*.ts` and show those graphs, files of which are used as internal dependencies (inside `./content/**/`) only. If there even one file, that is used outside ``./content/**/*.ts`, that graph will be hidden.

```
edr ./content/**/*.ts --internal
```

<br/>

Analyze files `./content/**/*.ts` and show graphs, where the root files has no usage, but depends on other files.
Internal flag works just like iin the previous example. Level flag limits the depth of the graph to be displayed.

```
edr ./content/**/*.ts --internal --reversed --level 0
```
