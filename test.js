var test = require('tape');
var through = require('through');
var collect = require('./');

test('string', function(t) {
  t.plan(2);
  
  var stream = through();
  
  process.nextTick(function() {
    stream.queue('foo');
    stream.queue('bar');
    stream.queue(null);
  });
  
  collect(stream, function(err, data) {
    t.error(err);
    t.deepEqual(data, 'foobar');
  });
});

test('buffer', function(t) {
  t.plan(3);

  var stream = through();

  process.nextTick(function() {
    stream.queue(new Buffer('foo'));
    stream.queue(new Buffer('bar'));
    stream.queue(null);
  });

  collect(stream, function(err, data) {
    t.error(err);
    t.ok(Buffer.isBuffer(data));
    t.equal(data.toString(), 'foobar');
  });
});

test('object', function(t) {
  t.plan(2);

  var stream = through();

  process.nextTick(function() {
    stream.queue({ foo: true });
    stream.queue({ bar: true });
    stream.queue(null);
  });

  collect(stream, function(err, data) {
    t.error(err);
    t.deepEqual(data, [
      { foo: true },
      { bar: true }
    ]);
  });
});

test('error', function(t) {
  t.plan(1);
  
  var stream = through();
  process.nextTick(function() {
    stream.emit('error', new Error);
  });
  
  collect(stream, function(err, data) {
    t.ok(err);
  });
});