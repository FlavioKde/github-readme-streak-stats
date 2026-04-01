import { describe, it, expect, vi } from "vitest";

vi.mock("../../lib/cache/contributionsCache.js", () => ({
  getCachedContributions: async () => [
    { date: "2024-01-01", count: 1 },
    { date: "2024-01-02", count: 2 },
  ],
}));

vi.mock("../../lib/streak/calculateStreak.js", () => ({
  calculateStreak: () => ({
    currentStreak: { length: 5 },
    longestStreak: { length: 10 },
    totalContributions: 20,
  }),
}));


import handler from "../../api/streak/svg.js";


const createMockRes = () => {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
  };

  res.setHeader = (key, value) => {
    res.headers[key] = value;
  };

  res.getHeader = (key) => res.headers[key];

  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  res.send = (data) => {
    res.body = data;
    return res;
  };

  return res;
};

describe("SVG Endpoint (integration)", () => {
  it("should return svg response", async () => {
    const req = {
      query: { user: "octocat" },
      headers: {},
    };

    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.headers["Content-Type"]).toBe("image/svg+xml");
    expect(res.body).toContain("svg");
   
  });
});