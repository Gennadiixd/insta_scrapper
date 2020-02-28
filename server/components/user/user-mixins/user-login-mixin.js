const { SkywalkerSubscriptions, GraphQLSubscriptions } = require('instagram_mqtt/dist/realtime/subscriptions');
const { saveToFile } = require('../../../utils/file-sys');
const { logEvent } = require('../../../utils/loggers');
const { LoginError } = require('../user-errors');
const { WSSendMessage } = require('../../ws-chat/chat-controller');

exports.userLoginMixin = (service) => ({
  ...service,

  _disconnect() {
    try {
      this._ig.realtime.disconnect();
      console.log('\x1b[36m', 'disconnected');
    } catch {
      console.log('\x1b[36m', 'not possible to disconnect');
    };
  },

  _subscriptionManager: (_ig) => {
    return ({
      on(event, handler) {
        _ig.realtime.on(event, handler);
      }
    });
  },

  async _getConnectSettings() {
    return ({
      graphQlSubs: [
        GraphQLSubscriptions.getAppPresenceSubscription(),
        // GraphQLSubscriptions.getClientConfigUpdateSubscription(),
        // GraphQLSubscriptions.getZeroProvisionSubscription(this._ig.state.phoneId),
        GraphQLSubscriptions.getDirectStatusSubscription(),
        GraphQLSubscriptions.getDirectTypingSubscription(this._ig.state.cookieUserId),
        GraphQLSubscriptions.getAsyncAdSubscription(this._ig.state.cookieUserId),
      ],
      skywalkerSubs: [
        SkywalkerSubscriptions.directSub(this._ig.state.cookieUserId),
        SkywalkerSubscriptions.liveSub(this._ig.state.cookieUserId)
      ],
      irisData: await this._ig.feed.directInbox().request(),
    });
  },

  async _listen() {
    this._disconnect();
    const subscribe = this._subscriptionManager(this._ig);
    subscribe.on('direct', logEvent('listening direct...'));
    subscribe.on('message', WSSendMessage(this._getUserId()));
    const connectSettings = await this._getConnectSettings();
    await this._ig.realtime.connect(connectSettings);
    this._startInstaFlow();
    return this._ig;
  },

  _startInstaFlow() {
    setTimeout(() => {
      console.log('Device off');
      this._ig.realtime.direct.sendForegroundState({ inForegroundApp: false, inForegroundDevice: false, keepAliveTimeout: 900 });
    }, 2000);

    setTimeout(() => {
      console.log('In App');
      this._ig.realtime.direct.sendForegroundState({ inForegroundApp: true, inForegroundDevice: true, keepAliveTimeout: 60 });
    }, 4000);
  },

  async _loginFlow(account, password) {
    this._getIg(account);
    await this._ig.simulate.preLoginFlow();

    try {
      console.log('\x1b[36m', 'try to login');
      await this._ig.account.login(account, password);
    } catch (error) {
      console.log('\x1b[36m', 'login failed');
      throw new LoginError(error.message);
    };

    process.nextTick(async () => await this._ig.simulate.postLoginFlow());
    await this._ig.request.end$.subscribe(async () => {
      const session = await this._ig.state.serialize();
      delete session.constants;
      await saveToFile(`session_${account}`, session);
    });
    await this._listen();
  },

  async login(account, password) {
    await this._loginFlow(account, password);
    return this._getUserId();
  },

});