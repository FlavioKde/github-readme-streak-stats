import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message, originalError = null, statusError = 404) {
    super(message, { code: 'NOT_FOUND_ERROR', originalError, statusError });
  } 
}