const createPullsCollection = require('./create-pulls-collection');
const PullCollection = createPullsCollection();

function wsHandler(ws, req) {
  id = req.query.uuid;
  const pullId = req.auth.userId;

  PullCollection.addConnection(pullId, id, ws)

  ws.on('message', (message) => {
    PullCollection.mapPull(pullId, 'send', message);
  });

  ws.on('close', (code) => {
    PullCollection.removeConnection(pullId, id);
  });

  wsHandler._WSSend = (pullId, message) => {
    PullCollection.mapPull(pullId, 'send', message);
  };
};

const WSSendMessage = (pullId) => (message) => {
  wsHandler._WSSend(pullId, message);
};

module.exports = { wsHandler, WSSendMessage };