import { BaseError } from './BaseError';

export class GithubApiError extends BaseError {
  constructor(message, originalError = null) {
    super(message, { code: 'GITHUB_API_ERROR', originalError });
  }
}