import { GithubApiError, NotFoundError, ValidationError, ConfigurationError  } from "../shared/errors/index.js";
import { calculateStreak } from "../streak/calculateStreak.js";
import { mapGitHubContributions } from "./githubMapper.js";


export async function fetchSingleRange({username}, fromDate, toDate) {
  
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

  console.log('USERNAME INSIDE:', username);

  if (!username || typeof username !== 'string' || username.trim() === '') {
    throw new ValidationError('Username is required to fetch GitHub contributions.');
  }
  console.log('USERNAME ARG:', username);

  const createdAt = await getUserCreatedAt(username);
  const blocks = await buildYearBlocks(createdAt);

  //let allContributions = [];

  let allDays = [];

  for (const block of blocks) {
    const blockData = await fetchSingleRange({username}, block.from, block.to);
    allDays.push(...blockData);

    //allContributions.push(...blockData);
  }

  //const uniqueDates = new Map();
  const unique = new Map();
 // for (const contribution of allContributions) {
   
    for (const days of allDays) {
      unique.set(days.date, days);
    
  }

 // const mergedContributions = Array.from(uniqueDates.values()).sort((a, b) => new Date(a.date) - new Date(b.date));

 const mergedDays = Array.from(unique.values()).sort((a, b) => new Date(a.date) - new Date(b.date));

 console.log(blocks.length);
  return calculateStreak(mergedDays);

  
}

export async function getUserCreatedAt(username) {

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

export async function buildYearBlocks(createdAt, currentDate = new Date()) {
  const bloks = [];

  let startDate = new Date(createdAt);
  const endDate = new Date(currentDate);
  
  while (startDate < endDate) { 

    let nextYear = new Date(startDate);
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    if (nextYear > endDate) {

    nextYear = new Date(endDate);
    }
    bloks.push({ from: new Date(startDate), to: new Date(nextYear) });
    
    startDate = nextYear;
  }
console.log('BLOCKS:', bloks.length);
  return bloks;
 
}










// original code had a single function, but we can easily extend it to support multiple ranges in the future if needed

/*
export async function fetchUserContributions({username, from, to}) {

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new ConfigurationError('GitHub token is not configured. Please set the GITHUB_TOKEN environment variable.');
  }
  if (!username || typeof username !== 'string' || username.trim() === '') {
    throw new ValidationError('Username is required to fetch GitHub contributions.');
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

  const toDate = to ? new Date(to) : new Date();

  const fromDate = from ? new Date(from) : new Date(toDate.getFullYear(), 0, 1);

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
        'User-Agent': 'GitHub-Readme-Streak-Stats-Vercel'
      },
      body: JSON.stringify({ query, variables })
    });

    
    if (!response.ok) {
      throw new GithubApiError(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      const errorMessage = result.errors[0]?.message || 'Unknown error from GitHub API';
      throw new GithubApiError(`GitHub API error: ${errorMessage}`);
    }

    const userData = result.data.user;

    if (!userData) {
      throw new NotFoundError(`GitHub user '${username}' not found.`);
    }

    return mapGitHubContributions(userData);

  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ConfigurationError || error instanceof ValidationError) {
      throw error;
    }
    throw new GithubApiError('Failed to fetch contributions from GitHub API', error);
  }

  
}
*/


