export function renderStreakSvg(data, theme) {
  const current = data.currentStreak.length;
  const longest = data.longestStreak.length;
  const total = data.totalContributions;


  return `
<svg width="495" height="195" viewBox="0 0 495 195" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="${theme.bg}" stroke="${theme.border}" />


  
    <!-- Título -->
  <text x="50%" y="40" fill="${theme.text}" text-anchor="middle"
        font-size="22" font-family="Segoe UI, sans-serif" font-weight="600">
    GitHub Streak Stats
  </text>

  <!-- ========================= -->
  <!--   COLUMNA 1 — CURRENT     -->
  <!-- ========================= -->

  <!-- Número -->
  <text x="85" y="110" text-anchor="middle"
        font-size="32" font-family="Segoe UI, sans-serif" font-weight="700"
        fill="${theme.text}">
    ${current}
  </text>

  <!-- Texto -->
  <text x="85" y="140" text-anchor="middle"
        font-size="16" font-family="Segoe UI, sans-serif"
        fill="${theme.accent1}">
    Current
  </text>

  <!-- Icono (Flame) -->
  <svg x="75" y="150" width="20" height="20" viewBox="0 0 24 24">
    <path d="M12 2C12 2 7 7 7 11C7 14.866 9.686 18 12 18C14.314 18 17 14.866 17 11C17 7 12 2 12 2Z"
          stroke="${theme.accent1}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>


  <!-- ========================= -->
  <!--   COLUMNA 2 — TOTAL       -->
  <!-- ========================= -->

  <!-- Número -->
  <text x="247" y="110" text-anchor="middle"
        font-size="32" font-family="Segoe UI, sans-serif" font-weight="700"
        fill="${theme.text}">
    ${total}
  </text>

  <!-- Texto -->
  <text x="247" y="140" text-anchor="middle"
        font-size="16" font-family="Segoe UI, sans-serif"
        fill="${theme.accent2}">
    Total
  </text>

  <!-- Icono (Star) -->
  <svg x="237" y="150" width="20" height="20" viewBox="0 0 24 24">
    <path d="M12 2L14.09 8.26H20.82L15.36 12.14L17.45 18.4L12 14.52L6.55 18.4L8.64 12.14L3.18 8.26H9.91L12 2Z"
          stroke="${theme.accent2}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>


  <!-- ========================= -->
  <!--   COLUMNA 3 — LONGEST     -->
  <!-- ========================= -->

  <!-- Número -->
  <text x="410" y="110" text-anchor="middle"
        font-size="32" font-family="Segoe UI, sans-serif" font-weight="700"
        fill="${theme.text}">
    ${longest}
  </text>

  <!-- Texto -->
  <text x="410" y="140" text-anchor="middle"
        font-size="16" font-family="Segoe UI, sans-serif"
        fill="${theme.accent3}">
    Longest
  </text>

  <!-- Icono (Trophy) -->
  <svg x="400" y="150" width="20" height="20" viewBox="0 0 24 24">
    <path d="M8 4H16V7C16 9.761 13.761 12 11 12C8.239 12 6 9.761 6 7V4H8ZM16 4H18C19.105 4 20 4.895 20 6C20 8.209 18.209 10 16 10M8 4H6C4.895 4 4 4.895 4 6C4 8.209 5.791 10 8 10M10 14H14M9 18H15M12 12V14"
          stroke="${theme.accent3}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
}
