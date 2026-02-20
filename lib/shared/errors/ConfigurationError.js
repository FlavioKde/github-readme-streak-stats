import { BaseError } from './BaseError.js';

export class ConfigurationError extends BaseError {
  constructor(message, originalError = null, statusError = 500) {
    super(message, { code: 'CONFIGURATION_ERROR', originalError, statusError });
  }
}