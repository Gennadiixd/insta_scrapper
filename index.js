const { createScrapperService } = require('./scrapper-service');
const { createInstaService } = require('./insta-service.js');

const URL = 'https://react-id-swiper.ashernguyen.site/doc/api';
const scrapperService = createScrapperService(URL);

// (async () => {
//   const titleText = await scrapperSrvice.request('paragraph');
//   console.log(titleText);
// })();


(async () => {
  const feed = await instaService.getDirectFeedPage()
  console.log(feed)
})();