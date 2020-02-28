const asyncPipe = (...promises) => promises.reduceRight((f, g) => (x) => g(x).then(f));

const pipe = (...fns) => (x) => fns.reduce((accum, fn) => fn(accum), x);

const pipeMiddleware = (...middlewares) => (req) => (
  middlewares.reduce(async (a, f) => {
    let resolvePromise;
    const accum = await a;
    if (accum) return accum;
    const result = new Promise((res, rej) => {
      resolvePromise = res;
    });
    f(req, {}, (err) => {
      if (err) resolvePromise(err);
      resolvePromise(null);
    });
    return await result;
  }, null)
);

module.exports = { asyncPipe, pipe, pipeMiddleware };
