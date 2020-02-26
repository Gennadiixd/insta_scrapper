const createChat = (chat) => {
  if (!chat) return [];
  return chat.reduce((accum, item) => {
    accum.push({
      text: item.text,
      date: new Date(item.timestamp / 1000),
      userId: item.user_id
    });
    return accum;
  }, []).sort((a, b) => a.date - b.date)
};

const createConversation = (items) => {
  const companions = [];
  const threads_ids = [];
  const directInbox = items.reduce((accum, item) => {

    companions.push({
      username: item.users[0].username,
      full_name: item.users[0].full_name,
      profile_pic_url: item.users[0].profile_pic_url,
      thread_id: item.thread_id,
    });

    const conversation = {
      username: item.users[0].username,
      full_name: item.users[0].full_name,
      chat: createChat(item.items),
      thread_id: item.thread_id,
      // profile_pic_url: item.users[0].profile_pic_url,
      my_id: item.viewer_id,
    };
    threads_ids.push(item.thread_id);
    accum[item.thread_id] = conversation;
    return accum;
  }, {});

  return { directInbox, companions, threads_ids };
}

module.exports = { createChat, createConversation };