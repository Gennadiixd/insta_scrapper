const { asyncPipe, pipe, lensCreator } = require('./utils');

const protoMonadEither = (value) => ({
  error: false,
  value: value,
  flatten() {
    return value;
  },
  flatEither(onLeft, onRight, predicate) {
    return this.either(onLeft, onRight, predicate).flatten();
  },
  of(value) {
    return monadEither(value);
  },
  switchErrorOn: (store) => lensCreator('error').set(true, store),
});

const asyncEitherMixin = (monad) => ({
  ...monad,
  asyncEither(onLeft, onRight, predicate = (value) => !!value) {
    try {
      const condition = !this.error && predicate(this.value);
      if (condition) {
        return asyncMonadEither(this.value).asyncOnRight(onRight);
      } else {
        throw new Error('Turned left by condition');
      }
    } catch (e) {
      console.count(e);
      return asyncMonadEither(this.value).asyncOnLeft(onLeft);
    }
  },
  asyncOnLeft(fn) {
    console.trace('ATTENTION !!!')
    return asyncPipe(
      fn,
      pipe(
        asyncMonadEither,
        this.switchErrorOn
      )
    )(this.value);
  },
  asyncOnRight(fn) {
    return asyncPipe(
      fn,
      asyncMonadEither
    )(this.value);
  },
});

const eitherMixin = (monad) => ({
  ...monad,
  either(onLeft, onRight, predicate = (value) => !!value) {
    try {
      const condition = !this.error && predicate(this.value);
      if (condition) {
        return monadEither(this.value).onRight(onRight);
      } else {
        throw new Error('Turned left by condition');
      }
    } catch (e) {
      console.count(e);
      return monadEither(this.value).onLeft(onLeft);
    }
  },
  onLeft(fn) {
    return pipe(
      fn,
      monadEither,
      this.switchErrorOn
    )(this.value);
  },
  onRight(fn) {
    return monadEither(fn(this.value));
  },
});

const asyncMonadEither = pipe(protoMonadEither, asyncEitherMixin);
const monadEither = pipe(protoMonadEither, eitherMixin);

module.exports = { asyncMonadEither, monadEither };