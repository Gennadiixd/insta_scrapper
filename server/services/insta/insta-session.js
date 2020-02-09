const { getSession, getConnectSettings, startInstaFlow, subscriptionManager } = require('./utils');
const { logEvent } = require('../../helpers/utils');

const generateIg = ((ig) => async (account, password) => {
  if (ig) return ig;
  ig = await getSession(account, password);

  const subscribe = subscriptionManager(ig);
  subscribe.on('direct', logEvent('direct'));
  subscribe.on('message', logEvent('messageWrapper'));

  const connectSettings = await getConnectSettings(ig);
  await ig.realtime.connect(connectSettings);
  startInstaFlow(ig);
  return ig;
})();

module.exports = { generateIg };