const { getSession, getConnectSettings, startInstaFlow, subscriptionManager } = require('./utils');
const { logEvent } = require('../../helpers/utils');
const { monadEither } = require('../../helpers/monad-either');


const generateIg = ((ig) => async (account, password) => {
  if (ig) return ig;
  ig = await getSession(account, password);
  return ig;
})();

module.exports = { generateIg };