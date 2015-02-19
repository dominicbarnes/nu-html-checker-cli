var cache = {};

module.exports = function (formatter, results) {
  var fn = load(formatter);
  return fn(results);
};

function load(formatter) {
  if (!(formatter in cache)) cache[formatter] = require('./' + formatter);
  return cache[formatter];
}
