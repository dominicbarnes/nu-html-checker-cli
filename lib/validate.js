
/**
 * Module dependencies.
 */

var clone = require('clone');
var request = require('superagent');

/**
 * Validates a file/string/url against the Nu HTML Checker.
 *
 * @see https://wiki.whatwg.org/wiki/Validator.nu_Web_Service_Interface
 *
 * @param {Object} options
 * @param {Function} callback
 */

module.exports = function (options, callback) {
  var url = options.api || 'https://validator.nu/';

  var params = { out: 'json' };
  if (options.level !== false) params.level = 'error';

  var req;

  // @see https://wiki.whatwg.org/wiki/Validator.nu_GET_Input
  if (options.url) {
    req = request
      .get(url)
      .query(params)
      .query({ doc: options.url });

  // @see https://wiki.whatwg.org/wiki/Validator.nu_Form_Upload_Input
  } else if (options.file) {
    req = request
      .post(url)
      .field('out', params.out)
      .field('level', params.level)
      .attach('file', options.file);

  // @see https://wiki.whatwg.org/wiki/Validator.nu_POST_Body_Input
  } else if (options.data) {
    req = request
      .post(url)
      .query(params)
      .send(options.data);

  } else {
    return callback(new Error('unable to process request'));
  }

  req.end(function (err, res) {
    if (err) return callback(err);
    var results = clone(res.body);
    if (options.file) results.path = options.file;
    callback(null, results);
  });
};
