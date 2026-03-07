export function errorSvg({ errorType, message }) {
  return `
<svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0d1117"/> 
    <text x="20" y="40" fill="#ff5555" font-size="20">

    ${errorType}: ${message}
  </text>
</svg>
`;
}