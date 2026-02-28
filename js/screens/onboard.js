/**
 * Onboard — auto-generated sea name + lighthouse avatar picker
 */

import { getState, setState } from '../state.js';
import { generateSeaName } from '../utils/nameGenerator.js';
import { getRandomFour, getAvatarUrl } from '../lighthouse-avatars.js';
import { getRefreshIconSvg } from '../components/RefreshIcon.js';
import { getBrandIconHtml } from '../components/BrandIcon.js';

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

export function renderOnboard(state) {
  let generatedName = generateSeaName();
  let avatarGrid = getRandomFour();
  let selectedAvatar = avatarGrid[0];
  let shownIds = [...avatarGrid];

  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'onboard-screen';

  screen.innerHTML = `
    <div class="onboard-header">
      <div class="onboard-lantern">${getBrandIconHtml(52, '#c9b99a')}</div>
      <div class="onboard-title">Choose your name</div>
      <div class="onboard-sub">Generated just for you — tap ↻ to change</div>
    </div>
    <div class="onboard-name-row" id="onboard-name-row">
      <span class="onboard-name-text" id="onboard-name-text">${escapeHtml(generatedName)}</span>
      <button type="button" class="onboard-refresh-btn" id="onboard-refresh-name" aria-label="Generate new name">${getRefreshIconSvg('rgba(201,185,154,0.55)', 20)}</button>
    </div>
    <div class="onboard-name-hint">Not feeling it? Tap ↻ for another name.</div>
    <div class="onboard-section-label" id="onboard-section-label">Choose your lighthouse</div>
    <div class="onboard-avatar-grid" id="onboard-avatar-grid"></div>
    <div class="onboard-refresh-avatar-wrap">
      <button type="button" class="onboard-refresh-avatar-row" id="onboard-refresh-avatars">
        <span class="onboard-refresh-avatar-icon">${getRefreshIconSvg('rgba(201,185,154,0.4)', 16)}</span>
        <span class="onboard-refresh-avatar-label">Show others</span>
      </button>
    </div>
    <div class="onboard-note">
      Your name is your only identity on Harbor.<br>
      No email. No real name. Just the sea.
    </div>
    <button type="button" class="btn-confirm" id="onboard-confirm">⟿  Set sail</button>
  `;

  const nameTextEl = screen.querySelector('#onboard-name-text');
  const nameRefreshBtn = screen.querySelector('#onboard-refresh-name');
  const avatarGridEl = screen.querySelector('#onboard-avatar-grid');
  const refreshAvatarBtn = screen.querySelector('#onboard-refresh-avatars');

  const lighthouseSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 90" fill="none" class="onboard-avatar-svg"><path d="M15 80h30v6H15z"/><path d="M24 36L22 80h16l-2-44z" fill="rgba(232,228,217,0.12)" stroke="rgba(232,228,217,0.25)" stroke-width="0.8"/><rect x="23" y="53" width="14" height="7" rx="1" fill="rgba(196,151,47,0.15)"/><rect x="23" y="67" width="14" height="7" rx="1" fill="rgba(196,151,47,0.15)"/><rect x="19" y="26" width="22" height="13" rx="2" fill="rgba(196,151,47,0.28)" stroke="rgba(196,151,47,0.5)" stroke-width="0.8"/><circle cx="30" cy="32" r="5" fill="rgba(196,151,47,0.85)"/><circle cx="30" cy="32" r="9" fill="rgba(196,151,47,0.15)"/><path d="M21 26L30 13l9 13z" fill="rgba(232,228,217,0.18)" stroke="rgba(232,228,217,0.3)" stroke-width="0.8"/></svg>';

  function renderAvatarGrid() {
    avatarGridEl.innerHTML = avatarGrid
      .map(
        (filename) => {
          const isSelected = selectedAvatar === filename;
          const url = getAvatarUrl(filename);
          return `
          <button type="button" class="onboard-avatar-cell${isSelected ? ' onboard-avatar-cell-selected' : ''}" data-avatar="${escapeHtml(filename)}" aria-pressed="${isSelected}">
            <img src="${escapeHtml(url)}" alt="" class="onboard-avatar-img" onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';">
            <span class="onboard-avatar-fallback" style="display:none;">${lighthouseSvg}</span>
            ${isSelected ? '<span class="onboard-avatar-checkmark">✦</span>' : ''}
          </button>`;
        }
      )
      .join('');
    avatarGridEl.querySelectorAll('.onboard-avatar-cell').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedAvatar = btn.dataset.avatar;
        avatarGridEl.querySelectorAll('.onboard-avatar-cell').forEach((c) => {
          c.classList.remove('onboard-avatar-cell-selected');
          c.setAttribute('aria-pressed', 'false');
          c.querySelector('.onboard-avatar-checkmark')?.remove();
        });
        btn.classList.add('onboard-avatar-cell-selected');
        btn.setAttribute('aria-pressed', 'true');
        const check = document.createElement('span');
        check.className = 'onboard-avatar-checkmark';
        check.textContent = '✦';
        btn.appendChild(check);
      });
    });
  }

  renderAvatarGrid();

  nameRefreshBtn.addEventListener('click', () => {
    nameRefreshBtn.classList.add('refresh-spin');
    let newName = generateSeaName();
    while (newName === generatedName) newName = generateSeaName();
    generatedName = newName;
    nameTextEl.textContent = generatedName;
    setTimeout(() => nameRefreshBtn.classList.remove('refresh-spin'), 380);
  });

  refreshAvatarBtn.addEventListener('click', () => {
    refreshAvatarBtn.querySelector('.onboard-refresh-avatar-icon')?.classList.add('refresh-spin');
    const next = getRandomFour(shownIds);
    if (next.length < 4) {
      const reset = getRandomFour();
      avatarGrid = reset;
      shownIds = [...reset];
      selectedAvatar = reset[0];
    } else {
      avatarGrid = next;
      shownIds = [...new Set([...shownIds, ...next])];
      selectedAvatar = next[0];
    }
    renderAvatarGrid();
    setTimeout(() => refreshAvatarBtn.querySelector('.onboard-refresh-avatar-icon')?.classList.remove('refresh-spin'), 380);
  });

  screen.querySelector('#onboard-confirm').addEventListener('click', () => {
    const nextUser = {
      ...getState().user,
      nickname: generatedName,
      avatarImage: selectedAvatar,
    };
    setState({ user: nextUser });
    try {
      localStorage.setItem('harbor_user', JSON.stringify({
        nickname: nextUser.nickname,
        avatarImage: nextUser.avatarImage,
      }));
    } catch (_) {}
    window.harborNavigate('firstletter');
  });

  wrap.appendChild(screen);
  return wrap;
}
