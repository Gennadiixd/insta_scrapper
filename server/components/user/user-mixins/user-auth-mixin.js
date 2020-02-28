exports.userAuthMixin = (service) => ({
  ...service,

  async checkSession(account) {
    if (!account) throw new Error('unauthorized');
    await this._restoreSession(account);
    return this._getUserId();
  }

});