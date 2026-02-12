import { describe, it, expect  } from "vitest";
import { calculateStreak } from "../../lib/streak/calculateStreak.js";

describe("StreakCalculator", () => {
    it("calculates a continuous streak including todaye", () => {
        const contributions = [
            { date: "2024-01-01", contributionCount: 1 },
            { date: "2024-01-02", contributionCount: 3 },
            { date: "2024-01-03", contributionCount: 3 },
            { date: "2024-01-04", contributionCount: 2 },
            { date: "2024-01-05", contributionCount: 1 },
        ];
        const result = calculateStreak(contributions);

        expect(result).toEqual({
            currentStreak: 3,
            longestStreak: 5,
            totalContributions: 10,
            firstContributionDate: "2024-01-01",
            lastContributionDate: "2024-01-05"
        });

    });
});