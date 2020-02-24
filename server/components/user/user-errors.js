const { QueryParamsError } = require('../shared-middlewares/require-query-params');

class LoginError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'LoginError';
  }
};

loginErrorHandler = (err, req, res, next) => {
  if (err instanceof LoginError) res.status(401).json({ error: err })
  else if (err instanceof QueryParamsError) res.status(404).json({ error: err })
  else next({ error: err });
};

module.exports = { LoginError, loginErrorHandler };