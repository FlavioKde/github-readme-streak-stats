export default class BaseError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = options.code || null;
    this.originalError = options.originalError || null;
    if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }     
}
}
