class RuntimeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RuntimeError';
  }
}

exports.runtimeErrorHandler = (err, req, res, next) => {
  if (err instanceof RuntimeError) {
    console.log("AHTUNG!!!")
    // Respond to the client
    // Extinguish the error
    next();
  } else {
    console.log("NOT WORKING!!!")

    // Let someone else deal with the error
    next(err);
  }
};
