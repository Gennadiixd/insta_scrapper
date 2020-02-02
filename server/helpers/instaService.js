const { IgApiClient } = require('instagram-private-api');

const generateIg = (account) => {
  const ig = new IgApiClient();
  ig.state.generateDevice(account);
  return ig;
};

const createChat = (chat) => {
  return chat.items.reduce((accum, item) => {
    accum.push({
      text: item.text,
      date: new Date(item.timestamp / 1000),
      userId: item.user_id
    });
    return accum;
  }, []).sort((a, b) => a.date - b.date)
}

const createConversation = (items, loggedInUserId) => {
  return items.reduce((accum, item) => {
    const conversation = {
      username: item.users[0].username,
      full_name: item.users[0].full_name,
      chat: createChat(item),
      thread_id: item.thread_id,
      profile_pic_url: item.users[0].profile_pic_url,
      loggedInUserId,
    };
    accum.push(conversation);
    return accum;
  }, []);
}

module.exports = { generateIg, createChat, createConversation };
