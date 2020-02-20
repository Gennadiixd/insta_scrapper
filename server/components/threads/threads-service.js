const InstaService = require('../../proto-services/insta-service');
const { threadDirectPagesMixin } = require('./threads-mixins/thread-direct-page-mixin');
const { threadDirectBroadcastMixin } = require('./threads-mixins/thread-direct-broadcast-mixin');

const ThreadsDirectService = threadDirectPagesMixin(InstaService);
const ThreadsDirectBroadcastService = threadDirectBroadcastMixin(InstaService);
module.exports = { ThreadsDirectService, ThreadsDirectBroadcastService };