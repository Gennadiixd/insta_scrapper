const { pipe } = require('../../../utils/pipes');

exports.threadDirectPagesMixin = (service) => ({
  ...service,

  async _getThreadItems(thread) {
    const items = await thread.items();
    const state = thread.serialize();
    return ({ items, state });
  },

  _deserialize: (state) => (thread) => {
    try {
      if (typeof state === 'string') {
        thread.deserialize(state);
      } else {
        thread.deserialize(JSON.parse(state));
      }
    } catch (error) {
      console.log('\x1b[36m', error);
    };
    return thread;
  },

  _getThreadById(thread_id) {
    return this._ig.feed.directThread({ thread_id });
  },

  async getThreadDirectPage(threadId, state) {
    return pipe(
      this._getThreadById.bind(this),
      this._deserialize(state),
      this._getThreadItems
    )(threadId);
  },
})