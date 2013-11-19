var concat = require('concat-stream');
var once = require('once');

/**
 * Collect output and errors of `stream`.
 *
 * @param {Stream} stream
 * @param {Function} fn
 */

module.exports = function collect(stream, fn) {
  fn = once(fn);
  stream.on('error', fn);
  stream.pipe(concat(function(data) {
    fn(null, data);
  }));
};
