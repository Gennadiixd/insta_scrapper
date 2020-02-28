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
    for (let connectionId in pull) {
      if (pull[connectionId].readyState == pull[connectionId].OPEN) {
        pull[connectionId][fn](processedParam);
      } else {
        this.removeConnection(pullId, connectionId);
      };
    };
  }

});

module.exports = createPullsCollection;