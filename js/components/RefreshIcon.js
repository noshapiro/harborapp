/**
 * Refresh icon — full arc ~300° clockwise with arrowhead (SVG string for web)
 */
export function getRefreshIconSvg(color = '#c9b99a', size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.49 9 A9 9 0 1 0 20.49 15" stroke="${color}" stroke-width="1.7" stroke-linecap="round" fill="none"/>
  <path d="M20.49 15 L17 12 M20.49 15 L20 18" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}
