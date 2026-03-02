/**
 * Refresh icon — по референсу: две изогнутые стрелки по кругу (sync/refresh)
 */
export function getRefreshIconSvg(color = '#c9b99a', size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M12 3 A9 9 0 0 1 12 21" stroke="${color}" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M12 21 A9 9 0 0 1 12 3" stroke="${color}" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M12 21 L10 18 M12 21 L14 18" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 3 L10 6 M12 3 L14 6" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}
