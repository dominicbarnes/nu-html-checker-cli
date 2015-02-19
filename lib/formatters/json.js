
/**
 * Pipes the original result into a pretty-formatted JSON string.
 *
 * @param {Object} results
 * @returns {String}
 */

module.exports = function (results) {
  return JSON.stringify(results, null, 2);
};
