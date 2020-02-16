const lensCreator = (prop) => ({
  view: (store) => store[prop],
  set: (value, store) => ({
    ...store,
    [prop]: value
  })
});

module.exports = { lensCreator };