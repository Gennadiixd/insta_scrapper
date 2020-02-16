const InstaService = require('../../proto-services/insta-service');
const { userMixin } = require('./user-mixin');

const UserService = userMixin(InstaService);
module.exports = { UserService };