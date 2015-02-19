# nu-html-checker

> A CLI interface for the [Nu HTML Checker](https://validator.nu/)

## Install

```sh
% npm install -g nu-html-checker
```

## CLI

```

  Usage: cli [options] <files/urls ...>

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -f, --formatter <formatter>  Choose the formatter to use. (stylish, json)

```

## API

```js
var validate = require('nu-html-checker');

validate([ 'test.html', 'http://google.com' ], function (err, results) {
  if (err) return console.error(err.stack);
  console.log(results);
});
```

### validate(list, options, callback)

When `list` is an array of strings, they can be either URLs or file paths. They
will all be processed in parallel.

If `list` is supplied as anything else, (such as a string, stream or buffer) it
will be validated as an individual item.

Available `options` include:

 * api `String` The root URL for the endpoint to use (default: https://validator.nu/)
 * level `Boolean` If set to `false`, then all messages will be returned (default: only errors)
 * formatter `String` Must correspond to a named formatter (see below)

## Formatters

There are currently only 2 formatters available: "stylish" and "json":

### stylish (default)

Formats as colored terminal text.

### json

Formats as pretty-printed JSON.
