const { pipe } = require('../../../utils/pipes');
const { createChat } = require('../../direct/direct-helpers');

exports.threadDirectPagesMixin = (service) => ({
  ...service,

  async _getThreadItems({ thread, isDeserialized }) {
    const items = createChat(await thread.items());
    const state = thread.serialize();
    if (!isDeserialized) {
      return ({ items: [], state });
    }
    return ({ items, state });
  },

  _deserialize: (state) => (thread) => {
    let isDeserialized = false;
    try {
      if (typeof state === 'string') {
        thread.deserialize(state);
      } else {
        thread.deserialize(JSON.parse(state));
      };
      isDeserialized = true;
    } catch (error) {
      console.log('\x1b[36m', error);
    };
    return { thread, isDeserialized };
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