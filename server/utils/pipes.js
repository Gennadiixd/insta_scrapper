const asyncPipe = (...promises) => promises.reduceRight((f, g) => (x) => g(x).then(f));
const pipe = (...fns) => (x) => fns.reduce((accum, fn) => fn(accum), x);

module.exports = { asyncPipe, pipe };
