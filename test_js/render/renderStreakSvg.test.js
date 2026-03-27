import { describe, it, expect } from "vitest";
import { renderStreakSvg } from "../../lib/render/renderStreakSvg.js";  

describe("renderStreakSvg", () => {
  it("should render SVG with correct data and theme", () => {
    
    const data = {
      currentStreak: { length: 5 },
      longestStreak: { length: 10 },
        totalContributions: 100
    };
    const theme = {
      bg: "#ffffff",
        border: "#cccccc",
        text: "#333333",
        accent1: "#ff0000",
        accent2: "#0000ff"
    };

    const current = data.currentStreak.length;
    const longest = data.longestStreak.length;
    const total = data.totalContributions;

    const svg = renderStreakSvg(data, theme);

    
    expect(svg).toContain(`${current}`);
    expect(svg).toContain(`${total}`);

    
    expect(svg).toContain(`fill="${theme.bg}"`);
    expect(svg).toContain(`stroke="${theme.border}"`);
    expect(svg).toContain(`fill="${theme.text}"`);
    expect(svg).toContain(`fill="${theme.accent1}"`);
    expect(svg).toContain(`fill="${theme.accent2}"`);
    });
});