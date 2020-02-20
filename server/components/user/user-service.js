const InstaService = require('../../proto-services/insta-service');
const { userLoginMixin } = require('./user-mixins/user-login-mixin');
const { userAuthMixin } = require('./user-mixins/user-auth-mixin');

const UserLoginService = userLoginMixin(InstaService);
const UserAuthService = userAuthMixin(InstaService);
module.exports = { UserLoginService, UserAuthService };