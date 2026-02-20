import { BaseError } from "./BaseError.js";

export class ValidationError extends BaseError {
  constructor(message, originalError = null, statusError = 400) {
    super(message, { code: 'VALIDATION_ERROR', originalError, statusError });
  }
}