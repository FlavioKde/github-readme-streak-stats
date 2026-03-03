export const getUserContributionQuery = `
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

export const getUserCreatedAtQuery = `
    query($username: String!) {
      user(login: $username) {
        createdAt
      }
    }
  `;