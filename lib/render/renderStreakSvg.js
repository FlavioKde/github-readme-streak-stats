export function renderStreakSvg(data) {
  const current = data.currentStreak.length;
  const longest = data.longestStreak.length;

  return `
<svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0d1117"/>
  
  <text x="20" y="40" fill="#ffffff" font-size="20">
    Current Streak: ${current}
  </text>

  <text x="20" y="80" fill="#ffffff" font-size="20">
    Longest Streak: ${longest}
  </text>
</svg>
`;
}