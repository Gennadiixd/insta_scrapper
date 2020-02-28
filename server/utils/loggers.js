const { wsHandler } = require('../components/ws-chat/chat-controller');

const logEvent = (name) => (data) => {
  console.log('\x1b[36m', data);

  wsHandler.WSSend('29162819445', JSON.stringify(data))
  // console.log(name, data)
};

module.exports = { logEvent };