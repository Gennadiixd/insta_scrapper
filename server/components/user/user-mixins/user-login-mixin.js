const { SkywalkerSubscriptions, GraphQLSubscriptions } = require('instagram_mqtt/dist/realtime/subscriptions');
const { saveToFile, getFromFile } = require('../../../utils/file-sys');
const { logEvent } = require('../../../utils/loggers');

exports.userLoginMixin = (service) => ({
  ...service,

  _subscriptionManager() {
    const _that = this;

    return ({
      on(event, handler) {
        _that._getIg().realtime.on(event, handler);
      }
    });
  },

  async _getConnectSettings() {
    return ({
      graphQlSubs: [
        GraphQLSubscriptions.getAppPresenceSubscription(),
        // GraphQLSubscriptions.getClientConfigUpdateSubscription(),
        // GraphQLSubscriptions.getZeroProvisionSubscription(this._getIg().state.phoneId),
        GraphQLSubscriptions.getDirectStatusSubscription(),
        GraphQLSubscriptions.getDirectTypingSubscription(this._getIg().state.cookieUserId),
        GraphQLSubscriptions.getAsyncAdSubscription(this._getIg().state.cookieUserId),
      ],
      skywalkerSubs: [
        SkywalkerSubscriptions.directSub(this._getIg().state.cookieUserId),
        SkywalkerSubscriptions.liveSub(this._getIg().state.cookieUserId)
      ],
      irisData: await this._getIg().feed.directInbox().request(),
    });
  },

  async _listen() {
    const subscribe = this._subscriptionManager();
    subscribe.on('direct', logEvent('listening direct...'));
    subscribe.on('message', logEvent('listening messageWrapper...'));
    const connectSettings = await this._getConnectSettings();
    await this._getIg().realtime.connect(connectSettings);
    this._startInstaFlow(this._getIg());
    console.log('Are we online? Almost.');
    return this._getIg();
  },

  _startInstaFlow() {
    setTimeout(() => {
      console.log('Device off');
      this._getIg().realtime.direct.sendForegroundState({ inForegroundApp: false, inForegroundDevice: false, keepAliveTimeout: 900 });
    }, 2000);

    setTimeout(() => {
      console.log('In App');
      this._getIg().realtime.direct.sendForegroundState({ inForegroundApp: true, inForegroundDevice: true, keepAliveTimeout: 60 });
    }, 4000);
  },

  async login(account, password) {
    console.log('\x1b[34m', 'Start login flow to instagram');
    this._getIg(account);
    await this._ig.simulate.preLoginFlow();
    await this._ig.account.login(account, password);
    process.nextTick(async () => await this._ig.simulate.postLoginFlow());
    await this._ig.request.end$.subscribe(async () => {
      const session = await this._ig.state.serialize();
      delete session.constants;
      await saveToFile(`session_${account}`, session);
    });
    await this._listen();
    return this._getUserId();
  },

});