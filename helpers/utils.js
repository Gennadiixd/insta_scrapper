const pipePromises = (...promises) => promises.reduceRight((f, g) => (x) => g(x).then(f));
const pipe = (...fns) => (x) => fns.reduce((accum, fn) => fn(accum), x);
const curry = (fn, arr = []) => (...args) =>
  (a => a.length === fn.length
    ? fn(...args)
    : curry(fn, a)
  )([...arr, ...args]);

const trace = (label) => (value) => {
  console.log(label + ' ===> ' + value);
  return value;
};

module.exports = { trace, pipePromises, pipe, curry };