import { default as concat } from 'concat-stream';
import { default as once } from 'once';

export default function collect(opts, stream, fn) {
  if (!fn) {
    fn = stream;
    stream = opts;
    opts = null;
  }
  fn = once(fn);
  stream.on('error', fn);
  stream.pipe(concat(opts, data => {
    fn(null, data);
  }));
};

