/**
 * Profile — matches harbor-iphone.html (stats, lighthouse, notif)
 */

import { getAvatarHtml } from '../components/AvatarImage.js';
import { getTabIcon } from '../components/TabIcons.js';
import { IconStar } from '../components/EmojiIcons.js';
import { openModal, closeActive } from '../components/Modal.js';
import { getState, setState } from '../state.js';

export function renderProfile(state) {
  const { user = {}, lightSystem = {} } = state;
  const level = lightSystem.level ?? 1;
  const streak = lightSystem.streak ?? 0;
  const xp = lightSystem.xp ?? 0;
  const xpToNext = lightSystem.xpToNext ?? 100;
  const reached = lightSystem.reached ?? 42;
  // Progress toward NEXT level: xpPerLevel = level * 80 (same as light-system.js on level-up)
  const xpPerLevel = level * 80;
  const currentInLevel = Math.max(0, xpPerLevel - xpToNext);
  const progressPct = level >= 10 ? 100 : Math.min(100, (currentInLevel / xpPerLevel) * 100);
  const barLabel = level >= 10
    ? `${xp} XP · Level ${level}`
    : `${currentInLevel} / ${xpPerLevel} XP to Level ${level + 1}`;
  const savedMoments = (state.savedMoments || []).filter(Boolean);
  const savedCount = savedMoments.length;

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
    <div class="profile-settings-wrap">
      <button type="button" class="profile-settings-btn" id="profile-settings" aria-label="Edit profile">${getGearIcon()}</button>
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
      <div class="activity-tooltip" id="activityTooltip" role="tooltip" aria-hidden="true"></div>
      <div class="activity-legend">
        <span class="activity-legend-label">Less</span>
        <span class="activity-legend-swatch activity-legend-swatch--0"></span>
        <span class="activity-legend-swatch activity-legend-swatch--1"></span>
        <span class="activity-legend-swatch activity-legend-swatch--2"></span>
        <span class="activity-legend-swatch activity-legend-swatch--3"></span>
        <span class="activity-legend-swatch activity-legend-swatch--4"></span>
        <span class="activity-legend-label">More</span>
      </div>
    </div>
    <div class="lighthouse-section">
      <div class="lh-title">Your Lighthouse</div>
      <div class="lh-level-row">
        <span class="lh-level-badge">Level ${level}</span>
        <span class="lh-streak">${streak} day streak</span>
      </div>
      <div class="lh-xp-wrap">
        <div class="lh-xp-bar"><div class="lh-xp-fill" style="width:${progressPct}%"></div></div>
        <div class="lh-xp-label">${barLabel}</div>
      </div>
      <div class="lh-reached">Your light reached <strong>${reached}</strong> strangers across <strong>17</strong> countries.</div>
      <div class="lh-svg-wrap">${LIGHTHOUSE_SVG}<div class="lh-beam"></div></div>
      <div class="lh-status">brightness: active</div>
    </div>
    <div class="collected-lines-card">
      <div class="collected-lines-header">${IconStar(14)} <span class="collected-lines-title">Collected Lines</span> <span class="collected-lines-count" id="momentsCount">${savedCount}</span></div>
      <div class="collected-lines-body" id="collectedLinesBody"></div>
      <div class="collected-lines-footer"><a href="/moments" class="collected-lines-see-all" id="profileMomentsLink">See all →</a></div>
    </div>
    <div class="notif-block" id="notifBlock" role="button" tabindex="0">
      <div class="notif-body"><strong class="notif-title">Someone is waiting for your light.</strong><span class="notif-desc">You haven't visited in 3 days. Your lighthouse is beginning to fade.</span></div>
      <div class="notif-cta">Write now →</div>
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
  const notifBlock = screen.querySelector('#notifBlock');
  if (notifBlock) {
    const goWrite = () => window.harborNavigate('write');
    notifBlock.addEventListener('click', goWrite);
    notifBlock.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goWrite(); } });
  }
  const settingsBtn = screen.querySelector('#profile-settings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => openEditProfileSheet());
  }
  const collectedLinesBody = screen.querySelector('#collectedLinesBody');
  if (collectedLinesBody) {
    if (savedMoments.length === 0) {
      collectedLinesBody.innerHTML = `<p class="collected-lines-empty">Lines that stayed with you will appear here.</p>`;
    } else {
      const previews = savedMoments.slice(0, 2).map((m) => {
        const short = truncateForPreview(m.text, 72);
        return `<p class="collected-lines-quote">"${escapeHtml(short)}"</p>`;
      }).join('');
      collectedLinesBody.innerHTML = previews;
    }
  }
  screen.querySelector('#profileMomentsLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.harborNavigate('/moments');
  });

  const activityGrid = screen.querySelector('#activityGrid');
  const tooltipEl = screen.querySelector('#activityTooltip');
  if (activityGrid && tooltipEl) {
    const levels = [
      'rgba(201,185,154,0.08)',
      'rgba(196,151,47,0.2)',
      'rgba(196,151,47,0.4)',
      'rgba(196,151,47,0.65)',
      'rgba(196,151,47,0.9)',
    ];
    const counts = [0,0,1,0,2,1,3,2,1,0,0,1,2,4,3,2,1,0,1,2,3,2,4,3,2,1,2,3,4,3];
    const days = getLast30DaysWithCounts(counts);
    let activeDot = null;

    const activitySection = activityGrid.closest('.activity-section');
    function showTooltip(dot, dateLabel, count) {
      const text = count === 0
        ? `${dateLabel} · No activity`
        : count === 1
          ? `${dateLabel} · 1 letter sent`
          : `${dateLabel} · ${count} letters sent`;
      tooltipEl.textContent = text;
      tooltipEl.setAttribute('aria-hidden', 'false');
      const rect = dot.getBoundingClientRect();
      const sectionRect = activitySection.getBoundingClientRect();
      tooltipEl.style.left = `${rect.left - sectionRect.left + rect.width / 2}px`;
      tooltipEl.style.top = `${rect.top - sectionRect.top - 4}px`;
      tooltipEl.classList.add('activity-tooltip--visible');
      activeDot = dot;
    }
    function hideTooltip() {
      tooltipEl.classList.remove('activity-tooltip--visible');
      tooltipEl.setAttribute('aria-hidden', 'true');
      activeDot = null;
    }

    days.forEach(({ date, count }) => {
      const level = Math.min(count, 4);
      const dateLabel = formatActivityDate(date);
      const dot = document.createElement('div');
      dot.className = 'activity-dot';
      dot.style.background = levels[level];
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', count === 0 ? `${dateLabel} · No activity` : count === 1 ? `${dateLabel} · 1 letter sent` : `${dateLabel} · ${count} letters sent`);
      dot.addEventListener('mouseenter', () => showTooltip(dot, dateLabel, count));
      dot.addEventListener('mouseleave', () => { hideTooltip(); });
      dot.addEventListener('focus', () => showTooltip(dot, dateLabel, count));
      dot.addEventListener('blur', () => { hideTooltip(); });
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeDot === dot) {
          hideTooltip();
        } else {
          showTooltip(dot, dateLabel, count);
        }
      });
      activityGrid.appendChild(dot);
    });

    document.addEventListener('click', function closeTooltipOnOutside(e) {
      if (tooltipEl.classList.contains('activity-tooltip--visible') && !activityGrid.contains(e.target) && e.target !== tooltipEl) {
        hideTooltip();
      }
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

/** Last 30 days (oldest first), each with a count 0–4 from the counts array. */
function getLast30DaysWithCounts(counts) {
  const days = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push({ date: d, count: counts[29 - i] ?? 0 });
  }
  return days;
}

function formatActivityDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

function truncateForPreview(str, maxLen) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + '…';
}

function getGearIcon() {
  const color = 'rgba(201,185,154,0.55)';
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function openEditProfileSheet() {
  const currentUser = getState().user || {};
  const currentName = currentUser.nickname || 'Misty Shore';
  openModal({
    title: 'Edit profile',
    bodyHtml: `
      <label class="profile-edit-label" for="profile-edit-name">Display name</label>
      <input type="text" id="profile-edit-name" class="profile-edit-input" value="${escapeHtml(currentName)}" placeholder="Your display name" maxlength="32" />
      <button type="button" class="btn-primary profile-edit-save" id="profileEditSave">Save</button>
    `,
    onOpen: (sheet) => {
      const input = sheet.querySelector('#profile-edit-name');
      const saveBtn = sheet.querySelector('#profileEditSave');
      if (saveBtn && input) {
        saveBtn.addEventListener('click', () => {
          const name = (input.value || '').trim() || 'Misty Shore';
          setState({ user: { ...getState().user, nickname: name } });
          closeActive();
          window.harborNavigate('profile');
        });
      }
    },
  });
}
