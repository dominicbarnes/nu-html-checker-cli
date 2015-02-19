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
var checker = require('nu-html-checker');

var batch = checker.validate([ 'test.html', 'http://google.com' ]);

batch.on('progress', function (e) {
  console.log(checker.format('stylish', e.value), '\n');
});

batch.on('end', function (err) {
  if (err) console.error(err.stack);
})
```

### checker.validate(list, options)

When `list` is an array of strings, they can be either URLs or file paths. They
will all be processed in parallel.

If `list` is supplied as anything else, (such as a string, stream or buffer) it
will be validated as an individual item.

### Available `options`:

 * api `String` The root URL for the endpoint to use (default: https://validator.nu/)
 * level `Boolean` If set to `false`, then all messages will be returned (default: only errors)
 * formatter `String` Must correspond to a named formatter (see below)

### Returns

The object returned is an instance of [`Batch`](http://npmjs.com/package/batch)
which needs to be interacted with directly. You must *at least* call
`batch.end(callback)`, but you can optionally add a `batch.on('progress')`
handler.

## checker.format(name, results)

Formats the given `results` with the formatter matching the given `name`. (can
either be "stylish" or "json")

### stylish (default)

Formats as colored terminal text.

### json

Formats as pretty-printed JSON.
