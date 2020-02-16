const InstaService = require('../../proto-services/insta-service');
const { threadDirectPagesMixin } = require('./threads-mixins/thread-direct-page-mixin');

const ThreadsDirectService = threadDirectPagesMixin(InstaService);
module.exports = { ThreadsDirectService };