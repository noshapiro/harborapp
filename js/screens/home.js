/**
 * Home / Inbox — Incoming & Sent tabs, letter cards, sent time-capsule archive
 */

import { mockLetters } from '../mock-data.js';
import { getAvatarHtml } from '../components/AvatarImage.js';
import { getAvatarUrl } from '../lighthouse-avatars.js';
import { getTabIcon } from '../components/TabIcons.js';
import { getQuillIconSvg } from '../components/QuillIcon.js';
import { IconEnvelope, IconGlobe, IconStar } from '../components/EmojiIcons.js';

/** Avatar for letter sender (Northern Flame etc.) — random lighthouse from folder */
function senderAvatarHtml(letter, size = 'banner') {
  const filename = letter?.fromAvatar;
  const px = size === 'card' ? 24 : 28;
  const cls = size === 'card' ? 'lc-avatar-wrap' : 'banner-avatar-wrap';
  if (filename) {
    const src = getAvatarUrl(filename);
    return `<span class="${cls}"><img src="${escapeHtml(src)}" alt="" class="${size === 'card' ? 'lc-avatar-img' : 'banner-avatar-img'}" width="${px}" height="${px}" loading="lazy"></span>`;
  }
  return size === 'card' ? '<span class="lc-avatar-placeholder"></span>' : '<span class="banner-avatar"></span>';
}

function formatSentDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function sentStatusBadge(entry) {
  if (entry.status === 'conversation') return `${IconStar(12)} In conversation`;
  if (entry.status === 'delivered') return `${IconStar(12)} Delivered`;
  const dateStr = formatSentDate(entry.deliverAt);
  return `⏳ In transit — arrives ${dateStr}`;
}

function daysLeft(deliverAt) {
  return Math.ceil((deliverAt - Date.now()) / 86400000);
}

export function renderHome(state) {
  const { user, letters = mockLetters, unreadIds = ['letter-1'], sentLetters = [] } = state;
  const hero = letters[0];
  const previous = letters.slice(1);

  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'home-screen';

  screen.innerHTML = `
    <div class="home-header">
      <div class="home-logo">harbor</div>
      <div class="avatar-btn" id="home-avatar">
        ${getAvatarHtml(user, { size: 'small' })}
        <span class="avatar-name">${escapeHtml(user?.nickname || 'Misty Shore')}</span>
      </div>
    </div>
    <div class="home-tabs" id="home-tabs">
      <button type="button" class="home-tab active" data-tab="incoming">Incoming</button>
      <button type="button" class="home-tab" data-tab="sent">Sent</button>
    </div>
    <div class="inbox-panel" id="inbox-panel">
      <div class="inbox-section">
        <div class="inbox-label">Today's letters</div>
      </div>
    </div>
    <div class="sent-panel" id="sent-panel" style="display:none;">
      <div class="inbox-section">
        <div class="inbox-label">Sent letters</div>
      </div>
    </div>
  `;

  const inboxPanel = screen.querySelector('#inbox-panel');
  const sentPanel = screen.querySelector('#sent-panel');

  if (hero) {
    const banner = document.createElement('div');
    banner.className = 'new-letter-banner';
    banner.innerHTML = `
      <div class="new-badge">
        <div class="new-badge-dot"></div>
        New letter arrived
      </div>
      <div class="banner-preview">${escapeHtml(hero.preview)}</div>
      <div class="banner-meta">
        <div class="banner-from">${senderAvatarHtml(hero, 'banner')}— ${escapeHtml(hero.from)} · ${IconGlobe(12)} from ${hero.translatedFrom || 'unknown'}</div>
        <div class="banner-arrow">›</div>
      </div>
    `;
    banner.addEventListener('click', () => window.harborNavigate('/read/' + hero.id));
    inboxPanel.appendChild(banner);
  }

  const prevSection = document.createElement('div');
  prevSection.className = 'inbox-section';
  prevSection.style.paddingTop = '8px';
  prevSection.innerHTML = '<div class="inbox-label">Previous</div>';
  inboxPanel.appendChild(prevSection);

  previous.forEach((letter) => {
    const card = document.createElement('div');
    card.className = 'letter-card' + (unreadIds.includes(letter.id) ? ' unread' : '');
    card.innerHTML = `
      <div class="lc-top">
        <div class="lc-from">${senderAvatarHtml(letter, 'card')}${escapeHtml(letter.from)}${unreadIds.includes(letter.id) ? ' <span class="lc-unread-dot"></span>' : ''}</div>
        <div class="lc-date">${escapeHtml(letter.date)}</div>
      </div>
      <div class="lc-preview">${escapeHtml(letter.preview)}</div>
    `;
    card.addEventListener('click', () => window.harborNavigate('/read/' + letter.id));
    inboxPanel.appendChild(card);
  });

  const sendBtn = document.createElement('button');
  sendBtn.type = 'button';
  sendBtn.className = 'send-another-btn';
  sendBtn.innerHTML = `${IconEnvelope(18)} Send me another letter`;
  sendBtn.addEventListener('click', () => window.harborNavigate('write'));
  inboxPanel.appendChild(sendBtn);

  const emptyInbox = document.createElement('div');
  emptyInbox.className = 'empty-inbox';
  emptyInbox.id = 'emptyInbox';
  emptyInbox.style.display = 'none';
  emptyInbox.innerHTML = `
    <div class="empty-ocean">
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
        <path d="M0 50 Q15 38 30 50 Q45 62 60 50 Q75 38 90 50 Q105 62 120 50 L120 80 L0 80 Z" fill="rgba(15,52,96,0.4)"/>
        <path d="M0 58 Q20 46 40 58 Q60 70 80 58 Q100 46 120 58 L120 80 L0 80 Z" fill="rgba(13,40,80,0.6)"/>
        <ellipse cx="60" cy="44" rx="6" ry="14" fill="rgba(180,220,240,0.15)" stroke="rgba(180,220,240,0.25)" stroke-width="0.8"/>
        <rect x="57" y="32" width="6" height="5" rx="2" fill="rgba(160,120,70,0.6)"/>
        <rect x="57.5" y="46" width="5" height="4" rx="1" fill="rgba(245,240,232,0.5)" transform="rotate(-3 57.5 46)"/>
      </svg>
    </div>
    <div class="empty-title">The ocean is quiet</div>
    <div class="empty-sub">Your letters are drifting.<br>Write one — it will find the one who needs it.</div>
    <button type="button" class="empty-write-btn" id="emptyWriteBtn">Write your first letter</button>
  `;
  emptyInbox.querySelector('#emptyWriteBtn').addEventListener('click', () => window.harborNavigate('write'));
  inboxPanel.appendChild(emptyInbox);

  const hasLetters = letters && letters.length > 0;
  sendBtn.style.display = hasLetters ? '' : 'none';
  emptyInbox.style.display = hasLetters ? 'none' : 'flex';

  sentLetters.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'sent-card';
    const isPending = entry.status === 'pending' && entry.deliverAt && entry.deliverAt > new Date();
    const dl = isPending ? daysLeft(entry.deliverAt) : 0;
    const countdownHtml =
      isPending && dl > 0
        ? `<div class="sent-countdown">Delivers in ${dl} day${dl !== 1 ? 's' : ''}</div>`
        : '';
    const badgeClass =
      entry.status === 'conversation'
        ? 'sent-badge conversation'
        : entry.status === 'delivered'
          ? 'sent-badge delivered'
          : 'sent-badge pending';
    card.innerHTML = `
      <div class="sent-top">
        <span class="${badgeClass}">${sentStatusBadge(entry)}</span>
        <span class="sent-date">${escapeHtml(formatSentDate(entry.deliverAt))}</span>
      </div>
      <div class="sent-preview">${escapeHtml(String(entry.preview).slice(0, 80))}${entry.preview.length > 80 ? '…' : ''}</div>
      ${countdownHtml}
    `;
    if (entry.status === 'conversation' && entry.threadId) {
      card.addEventListener('click', () => window.harborNavigate('/chat/' + entry.threadId));
    }
    sentPanel.appendChild(card);
  });

  screen.querySelectorAll('.home-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      screen.querySelectorAll('.home-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const isSent = tab.dataset.tab === 'sent';
      inboxPanel.style.display = isSent ? 'none' : '';
      sentPanel.style.display = isSent ? 'block' : 'none';
    });
  });

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'write-fab';
  fab.setAttribute('aria-label', 'Write a letter');
  fab.innerHTML = '<span class="write-fab-inner">' + getQuillIconSvg('white', 24) + '</span>';
  fab.addEventListener('click', () => window.harborNavigate('write'));
  fab.addEventListener('mousedown', () => fab.classList.add('fab-pressed'));
  fab.addEventListener('mouseup', () => fab.classList.remove('fab-pressed'));
  fab.addEventListener('mouseleave', () => fab.classList.remove('fab-pressed'));
  fab.addEventListener('touchstart', () => fab.classList.add('fab-pressed'), { passive: true });
  fab.addEventListener('touchend', () => fab.classList.remove('fab-pressed'), { passive: true });
  screen.appendChild(fab);
  requestAnimationFrame(() => requestAnimationFrame(() => fab.classList.add('fab-visible')));

  const unreadCount = (letters || []).filter((l) => unreadIds.includes(l.id)).length;
  const tabBar = document.createElement('div');
  tabBar.className = 'tab-bar';
  tabBar.id = 'tab-bar';
  const lettersIconWrap = `<span class="tab-icon-wrap"><span class="tab-icon">${getTabIcon('letters', true)}</span>${unreadCount > 0 ? `<span class="tab-badge" id="lettersBadge">${unreadCount}</span>` : ''}</span>`;
  tabBar.innerHTML = `
    <div class="tab-item active" id="tab-letters">${lettersIconWrap}<span class="tab-label">Letters</span></div>
    <div class="tab-item" id="tab-chats"><span class="tab-icon-wrap"><span class="tab-icon">${getTabIcon('chats', false)}</span></span><span class="tab-label">Chats</span></div>
    <div class="tab-item" id="tab-map"><span class="tab-icon-wrap"><span class="tab-icon">${getTabIcon('map', false)}</span></span><span class="tab-label">Map</span></div>
    <div class="tab-item" id="tab-profile"><span class="tab-icon-wrap"><span class="tab-icon">${getTabIcon('profile', false)}</span></span><span class="tab-label">Profile</span></div>
  `;
  tabBar.querySelector('#tab-chats').addEventListener('click', () => window.harborNavigate('/chat/thread-1'));
  tabBar.querySelector('#tab-map').addEventListener('click', () => window.harborNavigate('/map'));
  tabBar.querySelector('#tab-profile').addEventListener('click', () => window.harborNavigate('profile'));
  screen.appendChild(tabBar);

  screen.querySelector('#home-avatar').addEventListener('click', () => window.harborNavigate('profile'));

  wrap.appendChild(screen);
  return wrap;
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
