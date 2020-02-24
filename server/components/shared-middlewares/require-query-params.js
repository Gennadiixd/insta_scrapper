class QueryParamsError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'QueryParamsError';
  }
};

requireQueryParams = (...params) => (req, res, next) => {

  params.forEach((param) => {
    if (!req.query[param]) {
      throw new QueryParamsError('not full params set');
    }
  })

  next();
};

module.exports = { requireQueryParams, QueryParamsError };