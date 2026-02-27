import { GithubApiError, NotFoundError, ValidationError, ConfigurationError  } from "../shared/errors/index.js";
import { calculateStreak } from "../streak/calculateStreak.js";
import { mapGitHubContributions } from "./githubMapper.js";


//export async function fetchSingleRange(username, fromDate, toDate) {

//Private function to fetch contributions for a specific date range, used internally to support fetching in blocks (e.g. yearly) to handle GitHub API limitations and large date ranges more efficiently. Not exposed directly as part of the public API, but can be easily extended if needed in the future.
async function fetchSingleRange(username, fromDate, toDate) {
  
  console.log("USERNAME:", username);

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
  console.log("USERNAME:", username);

  console.log('Fetching:', username, fromDate.toISOString(), toDate.toISOString());


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



    console.log('FROM:', fromDate);
console.log('TO:', toDate);
console.log('VARIABLES:', variables);

    

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

console.log('Created at:', createdAt);
console.log('Today:', new Date().toISOString());

  const blocks = await buildYearBlocks(createdAt);

  console.log('Blocks:', blocks.map(b => ({
  from: b.from.toISOString().split('T')[0],
  to: b.to.toISOString().split('T')[0]
})));


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



 console.log(blocks.length);
  return calculateStreak(mergedDays);

}






//export async function getUserCreatedAt(username) {
//Private function to fetch the account creation date of a GitHub user, used internally to determine the date range for fetching contributions. Not exposed directly as part of the public API, but can be easily extended if needed in the future.
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

//export async function buildYearBlocks(createdAt, currentDate = new Date()) {

//Private function to build date blocks (e.g. yearly) from the user's account creation date to the current date, used internally to manage fetching contributions in manageable chunks. Not exposed directly as part of the public API, but can be easily extended if needed in the future.


//a partir de aca comienza las pruebas, ver si este es el, bug

/*

async function buildYearBlocks(createdAt, currentDate = new Date()) {

  const bloks = [];

  let startDate = new Date(createdAt);
  startDate.setUTCHours(0, 0, 0, 0); 


  const endDate = new Date(currentDate);
  //endDate.setUTCHours(0, 0, 0, 0); 
    endDate.setUTCHours(23, 59, 59, 999);
  
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
console.log('BLOCK OBJECT:', bloks[0]);

  
    return bloks;
  }

*/




//COMENTO PARA PRUEBAS, PERO ESTE ES EL QUE SE ESTA USANDO, VER SI EL BUG ESTA ACA

/*

function buildYearBlocks(createdAt, currentDate = new Date()) {
  const blocks = [];
  
  const start = new Date(createdAt);
  start.setUTCHours(0, 0, 0, 0);
  
  const end = new Date(currentDate);
  end.setUTCHours(23, 59, 59, 999); // Incluir el día actual completo

  let currentStart = new Date(start);

  while (currentStart < end) {
    let currentEnd = new Date(currentStart);
    currentEnd.setFullYear(currentEnd.getFullYear() + 1);
    currentEnd.setDate(currentEnd.getDate() - 1); // Un día menos para no solapar
    currentEnd.setUTCHours(23, 59, 59, 999);

    if (currentEnd > end) {
      currentEnd = new Date(end);
    }

    blocks.push({
      from: new Date(currentStart),
      to: new Date(currentEnd)
    });

    currentStart = new Date(currentEnd);
    currentStart.setDate(currentStart.getDate() + 1); // Día siguiente
    currentStart.setUTCHours(0, 0, 0, 0);
  }

  return blocks;
}

*/



// Temporalmente, reemplaza buildYearBlocks con esto:
export function buildYearBlocks(createdAt, currentDate = new Date()) {
  const blocks = [];
  const startYear = new Date(createdAt).getUTCFullYear();
  const currentYear = currentDate.getUTCFullYear();
  
  for (let year = startYear; year <= currentYear; year++) {
    const from = new Date(Date.UTC(year, 0, 1)); // 1 de enero
    const to = year === currentYear 
      ? new Date(currentDate) 
      : new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)); // 31 diciembre
    
    blocks.push({ from, to });
  }
  
  console.log('Blocks generados:', blocks.map(b => ({
    from: b.from.toISOString().split('T')[0],
    to: b.to.toISOString().split('T')[0]
  })));
  
  return blocks;
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


