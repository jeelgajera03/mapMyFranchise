class TimeOutError extends Error {
  constructor(errorCode, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeOutError);
    }
    this.name = 'TimeOutError';
    // Custom debugging information
    this.code = errorCode;
    this.httpStatusCode = 500;
    this.date = new Date();
  }
}
module.exports = TimeOutError;
