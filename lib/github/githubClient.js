import { GithubApiError, NotFoundError, ValidationError, ConfigurationError  } from "../shared/errors/index.js";
import { calculateStreak } from "../streak/calculateStreak.js";
import { mapGitHubContributions } from "./githubMapper.js";

async function fetchSingleRange(username, fromDate, toDate) {

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new ConfigurationError('GitHub token is not configured. Please set the GITHUB_TOKEN environment variable.');
  }

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        createdAt
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

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

    
    if (!response.ok) {
      throw new GithubApiError(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new GithubApiError(result.errors[0]?.message);
    }

    const userData = result.data.user;

    if (!userData) {
      throw new NotFoundError(`GitHub user '${username}' not found.`);
    }

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

  if (!username || typeof username !== 'string' || username.trim() === '') {
    throw new ValidationError('Username is required to fetch GitHub contributions.');
  }

  const createdAt = await getUserCreatedAt(username);

  const blocks = await buildYearBlocks(createdAt);

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

  return calculateStreak(mergedDays);

}


async function getUserCreatedAt(username) {

  if(!username || typeof username !== 'string' || username.trim() === '') {
      throw new ValidationError('Username is required to fetch user created at date.');
    }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new ConfigurationError('GitHub token is not configured. Please set the GITHUB_TOKEN environment variable.');
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        createdAt
      }
    }
  `;


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
    
    if (!response.ok) {
      throw new GithubApiError(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new GithubApiError(result.errors[0]?.message);
    }

    const user = result.data.user;
    if (!user) {
      throw new NotFoundError(`GitHub user '${username}' not found.`);
    }

    return user.createdAt;

  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ConfigurationError || error instanceof ValidationError) {
      throw error;
    }
    throw new GithubApiError('Failed to fetch user created at date from GitHub API', error);
  }
}

export function buildYearBlocks(createdAt, currentDate = new Date()) {
  const blocks = [];

  const created = new Date(createdAt);
  created.setUTCHours(0, 0, 0, 0); 
  

  const startYear = created.getUTCFullYear();
  created.setUTCHours(0, 0, 0, 0);

  const currentYear = currentDate.getUTCFullYear();
  currentDate.setUTCHours(23, 59, 59, 999);

  for (let year = startYear; year <= currentYear; year++) {
    
    const from = year === startYear 
      ? new Date(created) 
      : new Date(Date.UTC(year, 0, 1)); 

    const to = year === currentYear 
      ? new Date(currentDate) 
      : new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)); 
    
    blocks.push({ from, to });

  }
  
  return blocks;
}
