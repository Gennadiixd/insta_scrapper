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
  async asyncEither(onLeft, onRight, predicate) {
    return (!this.error && predicate(this.value))
      ? await asyncMonadEither(this.value).asyncOnRight(onRight)
      : await asyncMonadEither(this.value).asyncOnLeft(onLeft);
  },
  async asyncOnLeft(fn) {
    return await asyncPipe(
      fn,
      pipe(
        asyncMonadEither,
        this.switchErrorOn
      )
    )(this.value);
  },
  async asyncOnRight(fn) {
    return await asyncPipe(
      fn,
      asyncMonadEither
    )(this.value);
  },
});

const eitherMixin = (monad) => ({
  ...monad,
  either(onLeft, onRight, predicate) {
    return (!this.error && predicate(this.value))
      ? monadEither(this.value).onRight(onRight)
      : monadEither(this.value).onLeft(onLeft);
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