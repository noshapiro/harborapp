/**
 * Collected Lines / Moments
 */

import { getState } from '../state.js';

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

export function renderMoments(state) {
  const savedMoments = state.savedMoments || [];

  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'moments-screen';
  screen.innerHTML = `
    <div class="write-header">
      <button type="button" class="back-btn" id="moments-back">←</button>
      <div class="write-title">Collected Lines</div>
    </div>
    <div class="moments-intro">Lines that stayed with you.</div>
    <div class="moments-list" id="momentsList"></div>
  `;

  screen.querySelector('#moments-back').addEventListener('click', () => window.harborNavigate('profile'));

  const list = screen.querySelector('#momentsList');
  list.innerHTML = savedMoments
    .map(
      (m) =>
        `<div class="moment-card"><div class="moment-text">${escapeHtml(m.text)}</div><div class="moment-meta"><div class="moment-from">— ${escapeHtml(m.from)}</div><div class="moment-date">${escapeHtml(m.date)}</div></div></div>`
    )
    .join('');

  wrap.appendChild(screen);
  return wrap;
}
