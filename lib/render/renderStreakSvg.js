export function renderStreakSvg(data, theme) {
  const current = data.currentStreak.length;
  const longest = data.longestStreak.length;
  const total = data.totalContributions;


  return `
<svg width="495" height="195" viewBox="0 0 495 195" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="${theme.bg}" stroke="${theme.border}" />

  <text x="25" y="40" fill="${theme.text}" font-size="22" font-family="Segoe UI, sans-serif" font-weight="600">
    GitHub Streak Stats
  </text>

  <text x="25" y="90" fill="${theme.accent1}" font-size="18" font-family="Segoe UI, sans-serif">
    🔥 Current Streak:
  </text>
  <text x="220" y="90" fill="${theme.text}" font-size="20" font-family="Segoe UI, sans-serif" font-weight="600">
    ${current}
  </text>

  <text x="25" y="130" fill="${theme.accent3}" font-size="18" font-family="Segoe UI, sans-serif">
    🏆 Longest Streak:
  </text>
  <text x="220" y="130" fill="${theme.text}" font-size="20" font-family="Segoe UI, sans-serif" font-weight="600">
    ${longest}
  </text>

  <text x="25" y="170" fill="${theme.accent2}" font-size="18" font-family="Segoe UI, sans-serif">
    ⭐ Total Contributions:
  </text>
  <text x="220" y="170" fill="${theme.text}" font-size="20" font-family="Segoe UI, sans-serif" font-weight="600">
    ${total}
  </text>
</svg>
  `;
}
