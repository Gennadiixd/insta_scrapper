const request = require('request-promise');
const cheerio = require('cheerio');
const { pipePromises, pipe, curry } = require('../helpers/utils');
const load = cheerio.load;
const pipeLoad = (...fns) => pipe(load, ...fns);
const pipeRequest = (...fns) => pipePromises(request, ...fns);
const pipeRequestAndLoad = (...fns) => pipeRequest(pipeLoad(...fns));

const getLoadedSelector = (selector) => (loaded) => loaded(selector);
const toText = (node) => node.text();

const requestTextSelector = (selector) =>
  pipeRequestAndLoad(getLoadedSelector(selector), toText);

function makeRequest() {
  return ({
    request: function (element) { return this.requests[element](this.url) }
  })
}

function createScrapperService(url) {
  return ({
    url,
    requests: {
      title: requestTextSelector('div[class="sc-bdVaJa sc-bwzfXH DfVHK"] > h2'),
      paragraph: requestTextSelector('div[class="sc-bdVaJa sc-bwzfXH DfVHK"] > h2')
    },
    ...makeRequest()
  })
}

module.exports = { createScrapperService };