/**
 * Refresh icon — по референсу: почти полный круг, разрыв сверху, стрелка по часовой
 */
export function getRefreshIconSvg(color = '#c9b99a', size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M13 4 A9 9 0 0 1 21 12 A9 9 0 0 1 12 21 A9 9 0 0 1 3 12 A9 9 0 0 1 11 4" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M12 3 L11 4 M12 3 L13 4" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}
