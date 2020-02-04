const fs = require('fs');

function saveToFs(type, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${type}.txt`, JSON.stringify(data), function (error, data) {
      if (!error) resolve('session created');
      reject(error);
    })
  });
}

function getFromFs(type) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${type}.txt`, "utf8", function (error, data) {
      if (error) reject(false);
      resolve(data);
    })
  })
}

(async () => {
  const result = await saveToFs('session', 'wqwqwqwqw');
  console.log(result);
  const session = await getFromFs('session');
  console.log(session);
})()