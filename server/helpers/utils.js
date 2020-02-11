const fs = require('fs');

function saveToFile(type, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${type}.txt`, JSON.stringify(data), function (error, data) {
      if (!error) {
        console.log('\x1b[36m', type + ' Saved to fs');
        resolve('saved to fs');
      }
      reject(error);
    })
  });
};

function getFromFile(type) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${type}.txt`, "utf8", function (error, data) {
      if (error) resolve(false);
      resolve(data);
    })
  })
};

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

module.exports = { getFromFile, saveToFile, trace, asyncPipe, pipe, curry, either, lensCreator, logEvent };