const { monadEither } = require('../../../utils/monad-either');

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

  _getThreadById: (thread_id) => (ig) => {
    return ig.feed.directThread({ thread_id });
  },

  // _getThreadById: (ig) => (thread_id) => {
  //   return ig.feed.directThread({ thread_id });
  // },

  async getThreadDirectPage(threadId, state, account) {
    return monadEither(await this._restoreSession(account))
      .either(
        () => console.trace('can not get thread'),
        this._getThreadById(threadId)
      ).either(
        () => console.trace('desiarialization failure'),
        this._deserializeState(state)
      ).flatEither(
        () => console.trace('can not get items'),
        this._getThreadItems,
      ).catch(console.trace)

    const ig = await this._restoreSession(account);

    return monadEither(threadId)
      .either(
        () => console.trace('can not get thread'),
        this._getThreadById(ig)
      ).either(
        () => console.trace('desiarialization failure'),
        this._deserializeState(state)
      ).flatEither(
        () => console.trace('can not get items'),
        this._getThreadItems,
      ).catch(console.log)
  },
})