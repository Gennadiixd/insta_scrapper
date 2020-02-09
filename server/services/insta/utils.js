const { SkywalkerSubscriptions, GraphQLSubscriptions } = require('instagram_mqtt/dist/realtime/subscriptions');
const { saveToFile, getFromFile } = require('../../helpers/utils');
const { IgApiClient } = require('instagram-private-api');
const { withRealtime } = require('instagram_mqtt');
const { monadEither } = require('../../helpers/monad-either');
const { logEvent } = require('../../helpers/utils');

const restoreSession = (service, session) => service.state.deserialize(session);

const listen = async (ig) => {
  const subscribe = subscriptionManager(ig);
  subscribe.on('direct', logEvent('direct'));
  subscribe.on('message', logEvent('messageWrapper'));
  const connectSettings = await getConnectSettings(ig);
  await ig.realtime.connect(connectSettings);
  startInstaFlow(ig);
  console.log('LISTENING')
  return ig;
};

const loginUser = async (ig, account, password) => {
  console.log('\x1b[34m', 'LOGIN');
  await ig.simulate.preLoginFlow();
  await ig.account.login(account, password);
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  await ig.request.end$.subscribe(async () => {
    const session = await ig.state.serialize();
    delete session.constants;
    await saveToFile(`session_${account}`, session);
  });
  await listen(ig);
  return true;
};

const getSession = async (account, password) => {
  ig = withRealtime(new IgApiClient());
  ig.state.generateDevice(account);
  const session = await getFromFile(`session_${account}`);
  await monadEither(session).flatEither(
    async () => await loginUser(ig, account, password),
    async () => await restoreSession(ig, session)
  );
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
