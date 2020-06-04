const asyncPipe = (...promises) => promises.reduceRight((f, g) => (x) => g(x).then(f));
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

const either = async (onLeft, onRight, expression) =>
  expression ? await onRight(expression) : await onLeft(expression);

const lensCreator = (prop) => ({
  view: (store) => store[prop],
  set: (value, store) => ({
    ...store,
    [prop]: value
  })
});

const logEvent = (name) => (data) => {
  console.log(name, data)
};

export { trace, asyncPipe, pipe, curry, either, lensCreator, logEvent };