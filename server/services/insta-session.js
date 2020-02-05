const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');
const { asyncMonadEither } = require('../helpers/monad-either');

function saveSession(type, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${type}.txt`, JSON.stringify(data), function (error, data) {
      if (!error) resolve('session created');
      reject(error);
    })
  });
};

function getSession(type) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${type}.txt`, "utf8", function (error, data) {
      if (error) resolve(false);
      resolve(data);
    })
  })
};

const loginUser = async (ig, account, password) => {
  console.trace('LOGIN');
  await ig.simulate.preLoginFlow();
  await ig.account.login(account, password);
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  await ig.request.end$.subscribe(async () => {
    const session = await ig.state.serialize();
    delete session.constants; // this deletes the version info, so you'll always use the version provided by the library
    await saveSession(`session_${account}`, session);
  });
  return true;
};

const generateIg = ((ig) => async (account, password) => {
  if (ig) return ig;
  ig = new IgApiClient();
  ig.state.generateDevice(account);
  const session = await getSession(`session_${account}`);
  const eitherSession = asyncMonadEither(session);
  await eitherSession.asyncEither(
    () => loginUser(ig, account, password),
    () => ig.state.deserialize(session),
    () => !!session
  );
  return ig;
})();

module.exports = { generateIg };