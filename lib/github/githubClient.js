import { GithubApiError, NotFoundError, ValidationError, ConfigurationError  } from "../shared/errors/index.js";
import { calculateStreak } from "../streak/calculateStreak.js";
import { mapGitHubContributions } from "./githubMapper.js";
import { getUserContributionQuery, getUserCreatedAtQuery } from "./githubQueries.js";
import { validateToken, validateUsername } from "../shared/validators.js";
import { handleGitHubApiResponse, handleGraphQLErrors, handleMissingUserData } from "./githubResponse.js";
import { buildYearBlocksFromDate } from "../streak/buildYearBlocks.js";

async function fetchSingleRange(username, fromDate, toDate) {

  const token = process.env.GITHUB_TOKEN;
  validateToken(token);

  const query = getUserContributionQuery;

  const variables = {
    username,
    from: fromDate.toISOString(),
    to: toDate.toISOString()
  };

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables })
    });

    
    handleGitHubApiResponse(response);

    const result = await response.json();

    handleGraphQLErrors(result, username);

    const userData = result.data.user;

    handleMissingUserData(userData, username);

    return mapGitHubContributions(userData);
  }

  catch (error) {
    if (error instanceof NotFoundError || error instanceof ConfigurationError || error instanceof ValidationError) {
      throw error;
    }
    throw new GithubApiError('Failed to fetch contributions from GitHub API', error);
  }
}

export async function fetchUserContributions({username}) {

  validateUsername(username);

  const createdAt = await getUserCreatedAt(username);

  const blocks = buildYearBlocksFromDate(createdAt);

  let allDays = [];

  for (const block of blocks) {
    const blockData = await fetchSingleRange(username, block.from, block.to);

    allDays.push(...blockData);

  }

  const unique = new Map();
 
    for (const day of allDays) {
      unique.set(day.date, day);
    
  }


 const mergedDays = Array.from(unique.values()).sort((a, b) => new Date(a.date) - new Date(b.date));

  //return calculateStreak(mergedDays);
  return mergedDays;

}


async function getUserCreatedAt(username) {

  validateUsername(username);

  const token = process.env.GITHUB_TOKEN;

  validateToken(token);

  const query = getUserCreatedAtQuery;

  const variables = {
    username,
  };

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables })
    });
    
    handleGitHubApiResponse(response);

    const result = await response.json();


    handleGraphQLErrors(result, username);

    const user = result.data.user;

    handleMissingUserData(user, username);

    return user.createdAt;

  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ConfigurationError || error instanceof ValidationError) {
      throw error;
    }
    throw new GithubApiError('Failed to fetch user created at date from GitHub API', error);
  }

}


