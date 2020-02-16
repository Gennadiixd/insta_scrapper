const { asyncPipe, pipe } = require('./pipes');
const { lensCreator } = require('./lens');

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
  async asyncEither(onLeft, onRight, predicate = (value) => !!value) {
    try {
      const condition = !this.error && await predicate(this.value);
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
  asyncFlatEither(onLeft, onRight, predicate) {
    return this.asyncEither(onLeft, onRight, predicate).flatten();
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
  either(onLeft, onRight = (value) => value, predicate = (value) => !!value) {
    try {
      const condition = predicate(this.value);
      // const condition = !this.error && predicate(this.value);
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
  async asyncEither(onLeft, onRight, predicate = (value) => !!value) {
    this.value = await this.value;
    try {
      const condition = predicate(this.value);
      // const condition = !this.error && predicate(this.value);
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