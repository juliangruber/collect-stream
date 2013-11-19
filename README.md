
# collect-stream

Collect a readable stream's output and errors.

## Usage

```js
var collect = require('collect-stream');

collect(stringStream, function(err, data) {
  console.log(data); // one string
});

collect(bufferStream, function(err, data) {
  console.log(data); // one buffer
});

collect(objectStream, function(err, data) {
  console.log(data); // an array of objects
});
```

## Installation

```bash
$ npm install collect-stream
```

## License

  MIT