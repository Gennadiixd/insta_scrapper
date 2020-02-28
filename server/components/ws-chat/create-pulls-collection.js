const createPullsCollection = () => ({
  pull: {},
  sleepingPull: {},

  _getPull(pullId) {
    if (!this.pull[pullId]) {
      this.pull[pullId] = {};
    };
    return this.pull[pullId];
  },

  addConnection(pullId, uuid, connection) {
    if (!this.pull[pullId]) {
      this.pull[pullId] = {};
    };
    this.pull[pullId][uuid] = connection;
  },

  removeConnection(pullId, uuid) {
    delete this.pull[pullId][uuid];
  },

  mapPull(pullId, fn, param) {
    let processedParam = param;
    if (fn === 'send') {
      processedParam = JSON.stringify(param);
    };
    const pull = this._getPull(pullId);
    for (let key in pull) {
      pull[key][fn](processedParam);
    }
  }

});

module.exports = createPullsCollection;