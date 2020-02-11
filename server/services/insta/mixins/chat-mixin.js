const { monadEither } = require('../../../helpers/monad-either');
const { userError } = require('../errors.js');


exports.chatMixin = (service) => ({
  ...service,

  async getDirectChatNextPage(threadId, pageNumber) {
    console.log('\x1b[36m', pageNumber);
    const ig = await this.getIg();
    const directThread = await ig.feed.directThread({ thread_id: threadId });
    const firstPage = await directThread.items();
    console.log(firstPage);
    return { threadId };
  },
})