const { SkywalkerSubscriptions, GraphQLSubscriptions } = require('instagram_mqtt/dist/realtime/subscriptions');
const { saveToFile, getFromFile } = require('../../helpers/utils');
const { IgApiClient } = require('instagram-private-api');
const { withRealtime } = require('instagram_mqtt');
const { monadEither } = require('../../helpers/monad-either');

const restoreSession = (service, session) => service.state.deserialize(session);

const loginUser = async (ig, account, password) => {
  console.trace('LOGIN');
  await ig.simulate.preLoginFlow();
  await ig.account.login(account, password);
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  await ig.request.end$.subscribe(async () => {
    const session = await ig.state.serialize();
    delete session.constants; 
    await saveToFile(`session_${account}`, session);
  });
  return true;
};

const getSession = async (account, password) => {
  ig = withRealtime(new IgApiClient());
  ig.state.generateDevice(account);
  const session = await getFromFile(`session_${account}`);

  monadEither(session).either(
    () => loginUser(ig, account, password),
    () => restoreSession(ig, session)
  );

  if (session) await ig.state.deserialize(session);
  else await loginUser(ig, account, password);
  return ig;
};

const subscriptionManager = (ig) => ({
  on(event, handler) {
    ig.realtime.on(event, handler);
  }
});

const startInstaFlow = (ig) => {
  setTimeout(() => {
    console.log('Device off');
    ig.realtime.direct.sendForegroundState({ inForegroundApp: false, inForegroundDevice: false, keepAliveTimeout: 900 });
  }, 2000);

  setTimeout(() => {
    console.log('In App');
    ig.realtime.direct.sendForegroundState({ inForegroundApp: true, inForegroundDevice: true, keepAliveTimeout: 60 });
  }, 4000);
};

const getConnectSettings = async (ig) => ({
  graphQlSubs: [
    GraphQLSubscriptions.getAppPresenceSubscription(),
    // GraphQLSubscriptions.getClientConfigUpdateSubscription(),
    // GraphQLSubscriptions.getZeroProvisionSubscription(ig.state.phoneId),
    GraphQLSubscriptions.getDirectStatusSubscription(),
    GraphQLSubscriptions.getDirectTypingSubscription(ig.state.cookieUserId),
    GraphQLSubscriptions.getAsyncAdSubscription(ig.state.cookieUserId),
  ],
  skywalkerSubs: [
    SkywalkerSubscriptions.directSub(ig.state.cookieUserId),
    SkywalkerSubscriptions.liveSub(ig.state.cookieUserId)
  ],
  irisData: await ig.feed.directInbox().request(),
});

module.exports = { getConnectSettings, startInstaFlow, subscriptionManager, getSession };
