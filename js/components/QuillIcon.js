/**
 * Quill pen icon for FAB — maritime write action
 */
export function getQuillIconSvg(color = 'white', size = 24) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 3 C19 3 12 5.5 8.5 11.5 C6.5 15 6 18.5 5.5 21"/>
    <path d="M19 3 C16 7 13 9.5 8.5 11.5"/>
    <path d="M16.5 5.5 C14.5 8.5 12.5 10 8.5 11.5" stroke-width="1" opacity="0.55"/>
    <path d="M14 7.5 C12.5 9.5 11 10.5 8.5 11.5" stroke-width="0.9" opacity="0.35"/>
    <path d="M5.5 21 L4.5 22.5" stroke-width="1.3"/>
    <path d="M6 20.5 L3 23" stroke-width="0.9" opacity="0.4"/>
  </svg>`;
}
