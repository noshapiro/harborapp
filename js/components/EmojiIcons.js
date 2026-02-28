/**
 * Inline SVG icons in gold/sand — replace emojis across the app.
 * Use with class "icon-inline" and color: var(--gold) or var(--sand) in CSS.
 */
const C = 'currentColor';

export const IconEnvelope = (size = 18) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>`;

export const IconGlobe = (size = 14) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;

export const IconClock = (size = 14) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;

export const IconPencil = (size = 14) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`;

export const IconLighthouse = (size = 18) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3"/><path d="M12 9v6M9 12h6"/></svg>`;

export const IconWave = (size = 20) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><path d="M2 12c2 2 4 4 6 4s4-2 6-4 4-4 6-4 4 2 6 4"/><path d="M2 17c2 2 4 4 6 4s4-2 6-4 4-4 6-4 4 2 6 4"/></svg>`;

export const IconIsland = (size = 20) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L8 8h3v4h2V8h3L12 2z"/><path d="M4 20h16v2H4z"/><path d="M7 14c2 0 3 1.5 4 3 1-1.5 2-3 4-3"/></svg>`;

export const IconStar = (size = 14) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8"/></svg>`;

export const IconReport = (size = 14) =>
  `<svg class="icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${C}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`;
