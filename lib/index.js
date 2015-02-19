
/**
 * Module dependencies.
 */

var async = require('async');
var clone = require('clone');
var isUrl = require('is-url');
var validate = require('./validate');

/**
 * Accepts either an array of files/urls or a single stream/buffer/string of
 * data to validate.
 *
 * @param {Array|String} list
 * @param {Object} options
 * @param {Function} callback
 */

module.exports = function (list, options, callback) {
  if (Array.isArray(list)) {
    async.map(list, function (item, done) {
      var o = clone(options);
      o[isUrl(item) ? 'url' : 'file'] = item;
      validate(o, done);
    }, callback);
  } else {
    var o = clone(options);
    o.data = list;
    validate(o, callback);
  }
};
