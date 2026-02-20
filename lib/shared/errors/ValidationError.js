import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  constructor(message, originalError = null, statusError = 400) {
    super(message, { code: 'VALIDATION_ERROR', originalError, statusError });
  }
}