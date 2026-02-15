import { describe, it, expect  } from "vitest";
import { calculateStreak } from "../../lib/streak/calculateStreak.js";

describe("StreakCalculator", () => {
    it("calculates a continuous streak including today", () => {
        const contributions = [
            { date: "2024-01-01", count: 1 },
            { date: "2024-01-02", count: 3 },
            { date: "2024-01-03", count: 3 },
            { date: "2024-01-04", count: 2 },
            { date: "2024-01-05", count: 1 },
        ];
        const result = calculateStreak(contributions);

        expect(result).toEqual({
            totalContributions: 10,
            firstContributionDate: "2024-01-01",
            lastContributionDate: "2024-01-05",
            longestStreak: {
                start: "2024-01-01",
                end: "2024-01-05",
                length: 5
            },
            currentStreak: {
                start: "2024-01-03",
                end: "2024-01-05",
                length: 3
            }
        });

    });

    it("calculates streak when there is a break in contributions", () => {
        const contributions = [
            { date: "2024-01-01", count: 1 },
            { date: "2024-01-02", count: 0 },
            { date: "2024-01-03", count: 3 },
            { date: "2024-01-04", count: 1 }, 
        ];
        const result = calculateStreak(contributions);

        expect(result).toEqual({
            totalContributions: 5,
            firstContributionDate: "2024-01-01",
            lastContributionDate: "2024-01-04",
            longestStreak: {
                start: "2024-01-03",
                end: "2024-01-04",
                length: 2
            },  
            currentStreak: {
                start: "2024-01-03",
                end: "2024-01-04",
                length: 2
            } 

        });
    });

        it("calculates streak when there are no contributions", () => {
            const contributions = [];
            const result = calculateStreak(contributions);  
            expect(result).toEqual({
                totalContributions: 0,
                firstContributionDate: null,
                lastContributionDate: null,
                currentStreak: {
                    start: null,
                    end: null,
                    length: 0
                },
                longestStreak: {
                    start: null,
                    end: null,
                    length: 0
                },
            });
        });

        it("calculates streak when current streak is zero", () => {
            const contributions = [
                { date: "2024-01-01", count: 1 },
                { date: "2024-01-02", count: 1 },
                { date: "2024-01-03", count: 3 },
                { date: "2024-01-04", count: 2 },
                { date: "2024-01-05", count: 0 },
            ];
            const result = calculateStreak(contributions);  
            expect(result).toEqual({
                totalContributions: 7,
                firstContributionDate: "2024-01-01",
                lastContributionDate: "2024-01-04",
                longestStreak: {
                    start: "2024-01-01",
                    end: "2024-01-04",
                    length: 4
                },
                
                currentStreak: {
                    start: null,
                    end: null,
                    length: 0
                }

               
                
            });
        });
});