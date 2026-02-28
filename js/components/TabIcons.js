/**
 * Maritime tab bar icons — inline SVG strings for Letters, Chats, Map, Profile.
 * Use with currentColor so parent .tab-item.active / .tab-item sets color.
 */

const size = 26;

export function getLettersIconSvg(color = 'currentColor') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <path d="M2 7.5 L12 13.5 L22 7.5"/>
    <path d="M6 16.5 Q8 15 10 16.5 Q12 18 14 16.5" stroke-width="1" opacity="0.5"/>
  </svg>`;
}

export function getChatsIconSvg(color = 'currentColor') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 4 H20 A2 2 0 0 1 22 6 V14 A2 2 0 0 1 20 16 H8.5 Q7 18.5 5 20 Q6.5 17 5 16 H4 A2 2 0 0 1 2 14 V6 A2 2 0 0 1 4 4 Z"/>
    <circle cx="8" cy="10" r="0.9" fill="${color}"/>
    <circle cx="12" cy="10" r="0.9" fill="${color}"/>
    <circle cx="16" cy="10" r="0.9" fill="${color}"/>
  </svg>`;
}

export function getMapIconSvg(color = 'currentColor') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 3 Q8.5 7.5 8.5 12 Q8.5 16.5 12 21"/>
    <path d="M12 3 Q15.5 7.5 15.5 12 Q15.5 16.5 12 21"/>
    <path d="M3.5 9 Q7.5 10.5 12 10.5 Q16.5 10.5 20.5 9"/>
    <path d="M3.5 15 Q7.5 13.5 12 13.5 Q16.5 13.5 20.5 15"/>
  </svg>`;
}

export function getProfileIconSvg(color = 'currentColor') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7.5 21 H16.5"/>
    <path d="M10 21 L10.8 11 H13.2 L14 21"/>
    <rect x="9.5" y="7.5" width="5" height="3.5" rx="1"/>
    <path d="M9 7.5 L12 4 L15 7.5"/>
    <path d="M14.5 9 L20 7" stroke-width="1.2" opacity="0.65"/>
    <path d="M4 21 Q8 20 12 20.5 Q16 21 20 20" stroke-width="1" opacity="0.4"/>
  </svg>`;
}

/** Tab order: Letters, Chats, Map, Profile. Returns icon SVG for each key. */
export function getTabIcon(key, isActive) {
  const color = isActive ? '#c9b99a' : 'rgba(232,228,217,0.35)';
  switch (key) {
    case 'letters': return getLettersIconSvg(color);
    case 'chats': return getChatsIconSvg(color);
    case 'map': return getMapIconSvg(color);
    case 'profile': return getProfileIconSvg(color);
    default: return getLettersIconSvg(color);
  }
}
