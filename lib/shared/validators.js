import { ConfigurationError, ValidationError } from "./errors/index.js";


export function validateToken(token) {
if (!token) {
    throw new ConfigurationError('GitHub token is not configured. Please set the GITHUB_TOKEN environment variable.');
  }
}

export function validateUsername(username) {
  if (!username || typeof username !== 'string' || username.trim() === '') {
    throw new ValidationError('Username is required to fetch GitHub contributions.');
  } 
}

