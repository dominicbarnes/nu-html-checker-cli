
/**
 * Module dependencies.
 */

var Batch = require('batch');
var clone = require('clone');
var isUrl = require('is-url');
var validate = require('./validate');

/**
 * Accepts either an array of files/urls or a single stream/buffer/string of
 * data to validate.
 *
 * @param {Array|String} list
 * @param {Object} options
 */

exports.validate = function (list, options) {
  if (!options) options = {};

  var batch = new Batch();

  batch.throws(true);
  batch.concurrency(options.concurrency || 5);

  if (Array.isArray(list)) {
    list.forEach(function (item) {
      batch.push(function (done) {
        var o = clone(options);
        o[isUrl(item) ? 'url' : 'file'] = item;
        validate(o, done);
      });
    });
  } else {
    batch.push(function (done) {
      var o = clone(options);
      o.data = list;
      validate(o, done);
    });
  }

  return batch;
};

/**
 * Expose the formatters.
 */

exports.format = require('./formatters');
