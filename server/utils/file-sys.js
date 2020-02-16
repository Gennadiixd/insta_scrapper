const fs = require('fs');

function saveToFile(type, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${type}.txt`, JSON.stringify(data), function (error, data) {
      if (!error) {
        // console.log('\x1b[36m', type + ' Saved to fs');
        resolve('saved to fs');
      }
      reject(error);
    })
  });
};

function getFromFile(type) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${type}.txt`, "utf8", function (error, data) {
      if (error) resolve(false);
      resolve(data);
    })
  })
};

module.exports = { getFromFile, saveToFile };
