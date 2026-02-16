export function calculateStreak(contributions) {
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return {
      totalContributions: 0,
      firstContributionDate: null,
      lastContributionDate: null,
      longestStreak: { start: null, end: null, length: 0 },
      currentStreak: { start: null, end: null, length: 0 }
    };
  }

  // Order contributions by date ascending
  const sorted = contributions
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let totalContributions = 0;
  let longestStreak = { start: null, end: null, length: 0 };
  let currentStreak = { start: null, end: null, length: 0 };

  let tempStreakStart = null;
  let tempStreakLength = 0;

  let firstContributionDate = null;
  let lastContributionDate = null;

  for (const day of sorted) {
    const count = day.count || 0;

    // First and last contribution date
    if (count > 0) {
      if (!firstContributionDate) firstContributionDate = day.date;
      lastContributionDate = day.date;
    }

    totalContributions += count;

    // Calculate streaks
    if (count > 0) {
      if (tempStreakLength === 0) tempStreakStart = day.date;
      tempStreakLength++;

      // Update longest streak
      if (tempStreakLength > longestStreak.length) {
          longestStreak = {
          start: tempStreakStart,
          end: day.date,
          length: tempStreakLength
        };
      }
    } else {
      tempStreakLength = 0;
      tempStreakStart = null;
    }
  }

  // Calculate current streak ( from the last day backwards)

    let revStreakLength = 0;
    let revStreakEnd = null;
    let revStreakStart = null;
    let prevDate = null;

    function isConsecutiveDays(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Normalize time to ignore time differences
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    const diff = d2.getTime() - d1.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    return diff === oneDay;
  }

  // If the last day has zero contributions, current streak is zero
  if (sorted[sorted.length - 1].count === 0) {
    
    return {
      totalContributions,
      firstContributionDate,
      lastContributionDate,
      longestStreak,
      currentStreak: { start: null, end: null, length: 0 }
    };
  }

  for (let i = sorted.length - 1; i >= 0; i--) {

    if (sorted[i].count > 0 && revStreakLength === 0) {
  
    revStreakEnd = revStreakEnd || sorted[i].date;
      revStreakStart = sorted[i].date;
      prevDate = sorted[i].date;

      revStreakLength++;

    } else if (revStreakLength > 0) {

    if (sorted[i].count === 0) break;
    
    if (!isConsecutiveDays(sorted[i].date, prevDate)) break;
    
    revStreakStart = sorted[i].date;
    revStreakLength++;
    prevDate = sorted[i].date;
       
    }
      
    }
    currentStreak = {
      start: revStreakStart,
      end: revStreakEnd,
      length: revStreakLength
    }; 

    return {
      totalContributions,
      firstContributionDate,
      lastContributionDate,
      longestStreak,
      currentStreak
    };
}


