import { BaseError } from './BaseError.js';

export class GithubApiError extends BaseError {
  constructor(message, originalError = null) {
    super(message, { code: 'GITHUB_API_ERROR', originalError });
  }
}