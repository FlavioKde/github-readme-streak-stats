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

    it.todo("calculates streak when there is a break in contributions", () => {
        const contributions = [
            { date: "2024-01-01", contributionCount: 1 },
            { date: "2024-01-02", contributionCount: 0 },
            { date: "2024-01-03", contributionCount: 3 },
            { date: "2024-01-05", contributionCount: 1 }, 
        ];
        const result = calculateStreak(contributions);

        expect(result).toEqual({
            currentStreak: 2,
            longestStreak: 2,
            totalContributions: 7,
            firstContributionDate: "2024-01-01",
            lastContributionDate: "2024-01-05"
        });
    });

        it.todo("calculates streak when there are no contributions", () => {
            const contributions = [];
            const result = calculateStreak(contributions);  
            expect(result).toEqual({
                currentStreak: 0,
                longestStreak: 0,
                totalContributions: 0,
                firstContributionDate: null,
                lastContributionDate: null
            });
        });

    })
