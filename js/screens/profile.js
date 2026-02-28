/**
 * Profile — matches harbor-iphone.html (stats, lighthouse, notif)
 */

import { getAvatarHtml } from '../components/AvatarImage.js';
import { getTabIcon } from '../components/TabIcons.js';

export function renderProfile(state) {
  const { user = {}, lightSystem = {} } = state;
  const level = lightSystem.level ?? 1;
  const streak = lightSystem.streak ?? 0;
  const xp = lightSystem.xp ?? 0;
  const xpToNext = lightSystem.xpToNext ?? 100;
  const reached = lightSystem.reached ?? 42;
  const savedCount = (state.savedMoments || []).filter(Boolean).length;

  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'profile-screen';

  const LIGHTHOUSE_SVG = `<svg width="60" height="90" viewBox="0 0 60 90" fill="none">
    <rect x="15" y="80" width="30" height="6" rx="2" fill="rgba(201,185,154,0.25)"/>
    <path d="M24 36 L22 80 L38 80 L36 36 Z" fill="rgba(232,228,217,0.12)" stroke="rgba(232,228,217,0.25)" stroke-width="0.8"/>
    <rect x="23" y="53" width="14" height="7" rx="1" fill="rgba(196,151,47,0.15)"/>
    <rect x="23" y="67" width="14" height="7" rx="1" fill="rgba(196,151,47,0.15)"/>
    <rect x="19" y="26" width="22" height="13" rx="2" fill="rgba(196,151,47,0.28)" stroke="rgba(196,151,47,0.5)" stroke-width="0.8"/>
    <circle cx="30" cy="32" r="5" fill="rgba(196,151,47,0.85)"/>
    <circle cx="30" cy="32" r="9" fill="rgba(196,151,47,0.15)"/>
    <circle cx="30" cy="32" r="13" fill="rgba(196,151,47,0.07)"/>
    <path d="M21 26 L30 13 L39 26 Z" fill="rgba(232,228,217,0.18)" stroke="rgba(232,228,217,0.3)" stroke-width="0.8"/>
  </svg>`;

  screen.innerHTML = `
    <div class="profile-back-wrap">
      <button type="button" class="back-btn" id="profile-back">←</button>
    </div>
    <div class="profile-head">
      ${getAvatarHtml(user, { size: 'large' })}
      <div class="profile-name-text">${escapeHtml(user.nickname || 'Misty Shore')}</div>
      <div class="profile-since">with you since January 2026</div>
    </div>
    <div class="stats-grid">
      <div class="stat-cell"><div class="stat-n">14</div><div class="stat-l">Sent</div></div>
      <div class="stat-cell"><div class="stat-n">19</div><div class="stat-l">Received</div></div>
      <div class="stat-cell"><div class="stat-n">6</div><div class="stat-l">Replied</div></div>
    </div>
    <div class="activity-section">
      <div class="activity-label">last 30 days</div>
      <div class="activity-grid" id="activityGrid"></div>
    </div>
    <div class="lighthouse-section">
      <div class="lh-title">Your Lighthouse</div>
      <div class="lh-level-row">
        <span class="lh-level-badge">Level ${level}</span>
        <span class="lh-streak">${streak} day streak</span>
      </div>
      <div class="lh-xp-wrap">
        <div class="lh-xp-bar"><div class="lh-xp-fill" style="width:${Math.min(100, (xp / xpToNext) * 100)}%"></div></div>
        <div class="lh-xp-label">${xp} / ${xpToNext} XP</div>
      </div>
      <div class="lh-reached">Your light reached <strong>${reached}</strong> strangers across <strong>17</strong> countries.</div>
      <div class="lh-svg-wrap">${LIGHTHOUSE_SVG}<div class="lh-beam"></div></div>
      <div class="lh-status">brightness: active</div>
    </div>
    <a href="/moments" class="profile-nav-link" id="profileMomentsLink">✦ Collected Lines <span id="momentsCount">${savedCount}</span></a>
    <div class="notif-block">
      <div class="notif-em">🔦</div>
      <div class="notif-body"><strong>Someone is waiting for your light.</strong><br>You haven't visited in 3 days. Your lighthouse is beginning to fade.</div>
    </div>
    <div class="tab-bar">
      <div class="tab-item" id="tab-letters"><span class="tab-icon-wrap"><span class="tab-icon">${getTabIcon('letters', false)}</span></span><span class="tab-label">Letters</span></div>
      <div class="tab-item" id="tab-chats"><span class="tab-icon-wrap"><span class="tab-icon">${getTabIcon('chats', false)}</span></span><span class="tab-label">Chats</span></div>
      <div class="tab-item" id="tab-map"><span class="tab-icon-wrap"><span class="tab-icon">${getTabIcon('map', false)}</span></span><span class="tab-label">Map</span></div>
      <div class="tab-item active"><span class="tab-icon-wrap"><span class="tab-icon">${getTabIcon('profile', true)}</span></span><span class="tab-label">Profile</span></div>
    </div>
  `;

  screen.querySelector('#profile-back').addEventListener('click', () => window.harborNavigate('home'));
  screen.querySelector('#tab-letters').addEventListener('click', () => window.harborNavigate('home'));
  screen.querySelector('#tab-map').addEventListener('click', () => window.harborNavigate('/map'));
  screen.querySelector('#tab-chats').addEventListener('click', () => window.harborNavigate('/chat/thread-1'));
  screen.querySelector('#profileMomentsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.harborNavigate('/moments');
  });

  const activityGrid = screen.querySelector('#activityGrid');
  if (activityGrid) {
    const levels = [
      'rgba(201,185,154,0.08)',
      'rgba(196,151,47,0.2)',
      'rgba(196,151,47,0.4)',
      'rgba(196,151,47,0.65)',
      'rgba(196,151,47,0.9)',
    ];
    const data = [0,0,1,0,2,1,3,2,1,0,0,1,2,4,3,2,1,0,1,2,3,2,4,3,2,1,2,3,4,3];
    data.forEach((level) => {
      const dot = document.createElement('div');
      dot.className = 'activity-dot';
      dot.style.background = levels[level];
      activityGrid.appendChild(dot);
    });
  }

  wrap.appendChild(screen);
  return wrap;
}

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
