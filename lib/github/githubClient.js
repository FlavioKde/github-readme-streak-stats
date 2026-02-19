import { GithubApiError, NotFoundError, ValidationError, ConfigurationError  } from "../shared/errors/index.js";
import { mapGitHubContributions } from "../githubMapper.js";


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





/*
// lib/github.js
export class GitHubAPI {
  constructor(token = null) {
    this.token = token || process.env.GITHUB_TOKEN;
    this.endpoint = 'https://api.github.com/graphql';
  }
  
  async query(query, variables = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'GitHub-Readme-Streak-Stats-Vercel'
    };
    
    if (this.token) {
      headers['Authorization'] = `bearer ${this.token}`;
    }
    
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables })
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  }
  
  async getUserContributions(username, year) {
    const query = `
      query($username: String!) {
        user(login: $username) {
          createdAt
          contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
    
    const result = await this.query(query, { username });
    
    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GitHub API error');
    }
    
    return result.data.user;
  }
}

*/
