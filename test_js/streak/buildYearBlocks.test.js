import { describe, it, expect } from "vitest";
import { buildYearBlocksFromDate } from "../../lib/streak/buildYearBlocks.js";

const createDate = (year, month, day, h = 0, m = 0, s = 0, ms = 0) => new Date(Date.UTC(year, month, day, h, m, s, ms));

describe("buildYearBlocksFromDate", () => {

  it("should build year blocks correctly", () => {
    const from = createDate(2020, 0, 1, 0, 0, 0, 0);
    const to = createDate(2022, 11, 31, 23, 59, 59, 999);
    const yearBlocks = buildYearBlocksFromDate(from, to);
    expect(yearBlocks).toEqual([
      {
            from: createDate(2020, 0, 1, 0, 0, 0, 0),
            to: createDate(2020, 11, 31, 23, 59, 59, 999)
      },
      {
            from: createDate(2021, 0, 1, 0, 0, 0, 0),
            to: createDate(2021, 11, 31, 23, 59, 59, 999)
        },
        {
            from: createDate(2022, 0, 1, 0, 0, 0, 0),
            to: createDate(2022, 11, 31, 23, 59, 59, 999)
        }
    ]);
  });

it("should handle a single year correctly", () => {
    const from = createDate(2021, 0, 1, 0, 0, 0, 0);
    const to = createDate(2021, 11, 31, 23, 59, 59, 999);
    const yearBlocks = buildYearBlocksFromDate(from, to);
    expect(yearBlocks).toEqual([
        {
            from: createDate(2021, 0, 1, 0, 0, 0, 0),
            to: createDate(2021, 11, 31, 23, 59, 59, 999)
        }
    ]);
});

it("should handle a date range that does not start on January 1st", () => {
    const from = createDate(2021, 5, 15, 0, 0, 0, 0);
    const to = createDate(2022, 5, 14, 23, 59, 59, 999);
    const yearBlocks = buildYearBlocksFromDate(from, to);
    expect(yearBlocks).toEqual([
        {
            from: createDate(2021, 5, 15, 0, 0, 0, 0),
            to: createDate(2021, 11, 31, 23, 59, 59, 999)
        },
        {
            from: createDate(2022, 0, 1, 0, 0, 0, 0),
            to: createDate(2022, 5, 14, 23, 59, 59, 999)
        }
    ]);
    });

it("should handle same start and end dates", () => {
        const from = createDate(2021, 5, 15, 0, 0, 0, 0);
        const to = createDate(2021, 5, 15, 23, 59, 59, 999);
        const yearBlocks = buildYearBlocksFromDate(from, to);
        expect(yearBlocks).toEqual([
            {
                from: createDate(2021, 5, 15, 0, 0, 0, 0),
                to: createDate(2021, 5, 15, 23, 59, 59, 999)
            }
        ]);
    });
    
it("should handle year boundaries correctly", () => {
    const from = createDate(2020, 11, 30, 0, 0, 0, 0);
    const to = createDate(2021, 0, 1, 23, 59, 59, 999);

    const result = buildYearBlocksFromDate(from, to);
    
    expect(result).toHaveLength(2);
}
);
});
