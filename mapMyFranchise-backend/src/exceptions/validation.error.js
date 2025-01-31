class ValidationError extends Error {
  constructor(errorCode, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
    this.name = 'ValidationError';
    // Custom debugging information
    this.code = errorCode;
    this.httpStatusCode = 400;
    this.date = new Date();
  }
}
module.exports = ValidationError;
