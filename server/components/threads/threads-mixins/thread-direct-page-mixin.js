const { monadEither } = require('../../../utils/monad-either');

class RuntimeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RuntimeError';
  }
}

exports.threadDirectPagesMixin = (service) => ({
  ...service,

  async _getThreadItems(thread) {
    const items = await thread.items();
    const state = thread.serialize();
    return ({ items, state });
  },

  _deserialize: (thread) => (state) => {
    thread.deserialize(JSON.parse(state));
    return thread;
  },

  _deserializeState(state) {
    const _that = this;
    return (thread) => {
      return monadEither(state)
        .flatEither(
          () => thread,
          _that._deserialize(thread)
        )
    };
  },

  _getThreadById(thread_id) {
    return this._ig.feed.directThread({ thread_id });
  },

  async getThreadDirectPage(threadId, state) {
    return monadEither(this._getThreadById(threadId))
      .either(
        () => { throw new RuntimeError(); },
        this._deserializeState(state)
      ).flatEither(
        () => console.trace('can not get items'),
        this._getThreadItems,
      )
  },
})