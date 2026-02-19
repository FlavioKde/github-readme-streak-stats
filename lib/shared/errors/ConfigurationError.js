import { BaseError } from './BaseError';

export class ConfigurationError extends BaseError {
  constructor(message, originalError = null) {
    super(message, { code: 'CONFIGURATION_ERROR', originalError });
  }
}