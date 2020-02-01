const { createScrapperService } = require('./scrapper-service');
const { createInstaService } = require('./insta-service.js');

const URL = 'https://react-id-swiper.ashernguyen.site/doc/api';
const scrapperService = createScrapperService(URL);
const instaService = createInstaService('gennadiixd', '05920592');

// (async () => {
//   const titleText = await scrapperSrvice.request('paragraph');
//   console.log(titleText);
// })();


(async () => {
  const feed = await instaService.getDirectFeedPage()
  console.log(feed)
  // instaService.getDirectInbox();
  // const directInbox = await instaService.getDirectInboxMessages(); 
  // const msgs = await directInbox();
  // console.log(msgs)
  // await ig.simulate.preLoginFlow();
  // const loggedInUser = await ig.account.login('gennadiixd', '05920592');
  // process.nextTick(async () => await ig.simulate.postLoginFlow());
  // const userFeed = ig.feed.user(loggedInUser.pk);
  // const myPostsFirstPage = await userFeed.items();
  // const myPostsSecondPage = await userFeed.items();
  // loginAndGetDirectInbox()
  // const userDirectInbox = ig.feed.directInbox(logInToInstaService(ig));
  // const myDirectInbox = await userDirectInbox.items();
  // for (let i = 0; i < myDirectInbox.length; i++) {
  // console.log(myDirectInbox[i].items);
  // }
})();