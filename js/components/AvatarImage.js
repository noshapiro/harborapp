/**
 * Shared user avatar — single source of truth for current user's avatar.
 * Use on Home header, Profile, and anywhere the current user's avatar is shown.
 */

import { getState } from '../state.js';
import { getAvatarUrl } from '../lighthouse-avatars.js';

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

const LIGHTHOUSE_FALLBACK_SMALL = `
  <div class="avatar-circle avatar-placeholder">
    <div class="avatar-lh"></div>
    <div class="avatar-top"></div>
  </div>
`;

const LIGHTHOUSE_FALLBACK_LARGE = `<div class="profile-av-large avatar-placeholder"></div>`;

const IMG_ONERROR = "this.onerror=null;this.style.display='none';var s=this.nextElementSibling;if(s)s.style.display='flex';";

/**
 * Returns HTML string for the current user's avatar.
 * @param {Object} [user] - user from state (defaults to getState().user)
 * @param {{ size: 'small'|'large', className?: string }} [opts]
 * @returns {string}
 */
export function getAvatarHtml(user = null, opts = {}) {
  const u = user ?? getState().user;
  const size = opts.size ?? 'small';
  const src = u?.avatarImage ? getAvatarUrl(u.avatarImage) : null;

  if (src) {
    const safeSrc = escapeHtml(src);
    const fallback = size === 'large' ? LIGHTHOUSE_FALLBACK_LARGE : LIGHTHOUSE_FALLBACK_SMALL;
    if (size === 'large') {
      return `<span class="avatar-img-wrap avatar-img-wrap-large"><img class="avatar-img profile-av-large" src="${safeSrc}" alt="" loading="lazy" onerror="${IMG_ONERROR}"><span class="avatar-fallback" style="display:none">${fallback}</span></span>`;
    }
    return `<span class="avatar-img-wrap"><img class="avatar-img avatar-circle" src="${safeSrc}" alt="" loading="lazy" onerror="${IMG_ONERROR}"><span class="avatar-fallback" style="display:none">${fallback}</span></span>`;
  }

  if (size === 'large') return LIGHTHOUSE_FALLBACK_LARGE;
  return LIGHTHOUSE_FALLBACK_SMALL;
}
