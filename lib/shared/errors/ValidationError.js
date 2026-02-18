import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  constructor(message, originalError = null) {
    super(message, { code: 'VALIDATION_ERROR', originalError });
  }
}