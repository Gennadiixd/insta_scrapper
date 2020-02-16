const logEvent = (name) => (data) => {
  console.log(name, data)
};

module.exports = { logEvent };