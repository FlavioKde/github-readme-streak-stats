export function mapGitHubContributions(userData) {
  if (!userData?.contributionsCollection?.contributionCalendar?.weeks) {
    return [];
  }

  const weeks = userData.contributionsCollection.contributionCalendar.weeks;

  const contributions = [];

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      contributions.push({
        date: day.date,
        count: day.contributionCount
      });
    }
  }

  return contributions.sort((a, b) => new Date(a.date) - new Date(b.date));
}
