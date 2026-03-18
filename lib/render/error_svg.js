import { errorTheme } from '../themes/errorTheme.js';

export function errorSvg({ errorType, message }) {
  const theme = errorTheme;
  return `
<svg width="495" height="195" viewBox="0 0 495 195" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="12" fill="${theme.bg}" stroke="${theme.border}" />

  <g transform="translate(30, 65)">
    <path d="M12 2L2 22H22L12 2Z"
          stroke="${theme.accent}" stroke-width="2" fill="none"
          stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="12" y1="9" x2="12" y2="13"
          stroke="${theme.accent}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="17" r="1" fill="${theme.accent}"/>
  </g>

  <text x="90" y="95" fill="${theme.text}" font-size="20" font-family="Segoe UI, sans-serif" font-weight="600">
    ${errorType}
  </text>

  <text x="90" y="130" fill="${theme.accent}" font-size="16" font-family="Segoe UI, sans-serif">
    ${message}
  </text>
</svg>
  `;

}