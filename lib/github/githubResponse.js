import { GithubApiError, NotFoundError } from "./errors/index.js";


export function handleGitHubApiResponse(response) {
if (!response.ok) {
      throw new GithubApiError(`GitHub API error: ${response.status} ${response.statusText}`);
    }
}

export function handleGraphQLErrors(result, username) {
    if (result.errors) {
      const notFound = result.errors.find(e => e.type === 'NOT_FOUND'); 
      if (notFound) {
        throw new NotFoundError(`GitHub user '${username}' not found.`);
      }
      throw new GithubApiError(result.errors[0]?.message);
    }
}

export function handleMissingUserData(userData, username) {
    if (!userData) {
      throw new NotFoundError(`GitHub user '${username}' not found.`);
    }
}



