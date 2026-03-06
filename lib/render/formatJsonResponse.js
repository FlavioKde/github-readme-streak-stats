export function formatJsonResponse(streakData) {
    return {
        current_streak: streakData.currentStreak,
        longest_streak: streakData.longestStreak,
        total_contributions: streakData.totalContributions,
        first_contribution_date: streakData.firstContributionDate,
        last_contribution_date: streakData.lastContributionDate
    };
}