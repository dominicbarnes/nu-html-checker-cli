
/**
 * Module dependencies.
 */

var chalk = require('chalk');
var table = require('text-table');

/**
 * Renders the results object as colored terminal text.
 *
 * @param {Object} results
 * @returns {String}
 */

module.exports = function (file) {
  return [ header(file), body(file) ].join('\n');
};

/**
 * Helper for generating the header for a single item's section.
 *
 * @param {Object} file
 * @returns {String}
 */

function header(file) {
  return chalk.underline(file.url || file.path || '<stdin>');
}

/**
 * Helper for generating the body of a single item's section.
 *
 * @param {Object} file
 * @returns {String}
 */

function body(file) {
  var list = file.messages;
  if (!list.length) return chalk.green('No validation errors found!');

  return table(list.map(function (msg) {
    return [ location(msg), type(msg), message(msg) ];
  }));
}

/**
 * Helper for generating the line/column location for a given message.
 *
 * @param {Object} msg
 * @returns {String}
 */

function location(msg) {
  if (msg.type === 'info') return chalk.magenta('n/a');

  var line = number(msg.firstLine, msg.lastLine);
  var column = number(msg.firstColumn, msg.lastColumn);

  return chalk.magenta([ line, column ].join(':'));
}

/**
 * Helper for generating either a single number. (or a range if applicable)
 *
 * @param {Number} first
 * @param {Number} last
 * @returns {String}
 */

function number(first, last) {
  return first ? [ first, last ].join('-') : last;
}

/**
 * Helper for generating the type for a given message.
 *
 * @param {Object} msg
 * @returns {String}
 */

function type(msg) {
  var str = msg.type;
  if (str === 'error') {
    return chalk.red(str);
  } else if (str === 'info') {
    return chalk.cyan(str);
  } else if (str === 'fatal') {
    return chalk.bgRed.bold.white(str);
  } else {
    return chalk.inverse(str);
  }
}

/**
 * Helper for generating the string content of a message.
 *
 * @param {Object} msg
 * @returns {String}
 */

function message(msg) {
  return chalk.gray(msg.message);
}
