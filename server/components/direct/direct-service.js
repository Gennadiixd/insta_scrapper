const InstaService = require('../../proto-services/insta-service');
const { directMixin } = require('./direct-mixin');

const DirectService = directMixin(InstaService);
module.exports = { DirectService };