import BaseError from './BaseError.js';

export class NotFoundError extends BaseError {
  constructor(message, originalError = null, statusError = 404) {
    super(message, { code: 'NOT_FOUND_ERROR', originalError, statusError });
  } 
}