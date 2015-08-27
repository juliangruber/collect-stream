import { default as concat } from 'concat-stream';
import { default as once } from 'once';

export default function collect(stream, fn) {
  fn = once(fn);
  stream.on('error', fn);
  stream.pipe(concat(data => {
    fn(null, data);
  }));
};

