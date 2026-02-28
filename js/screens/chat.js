/**
 * Chat — matches harbor-iphone.html (wave btn, reactions, depth hints, addXP)
 */

import { getState } from '../state.js';
import { getAvatarUrl } from '../lighthouse-avatars.js';
import { addXP } from '../light-system.js';
import { IconGlobe, IconStar } from '../components/EmojiIcons.js';

export function renderChat(state) {
  const { routeParams = {}, threads = [] } = state;
  const threadId = routeParams.threadId || state.currentThreadId || 'thread-1';
  const thread = threads.find((t) => t.id === threadId) || threads[0];

  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'chat-screen';

  const messagesHtml = (thread?.messages || [])
    .map(
      (m) => `
    <div class="msg ${m.from}">
      <div class="msg-bubble">${escapeHtml(m.body)}</div>
      ${m.translated ? '<div class="tl-note">' + IconGlobe(12) + ' translated from Italian</div>' : ''}
      <div class="msg-time">${escapeHtml(m.time)}</div>
    </div>
  `
    )
    .join('');

  const partnerName = thread?.partnerName || 'Northern Flame';
  const partnerAvatarSrc = thread?.partnerAvatar ? getAvatarUrl(thread.partnerAvatar) : null;
  const chatAvatarHtml = partnerAvatarSrc
    ? `<img src="${escapeHtml(partnerAvatarSrc)}" alt="" class="chat-avatar-img" loading="lazy">`
    : '<div class="chat-avatar"></div>';
  screen.innerHTML = `
    <div class="chat-header">
      <div class="chat-user">
        <button type="button" class="back-btn" id="chat-back" style="margin-right:2px;">←</button>
        <div class="chat-avatar-wrap">${chatAvatarHtml}</div>
        <div>
          <div class="chat-name">${escapeHtml(partnerName)}</div>
          <div class="chat-status">online · Italy</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <button type="button" class="chat-menu-btn" id="chat-menu-btn" title="More options">⋯</button>
      </div>
      <div class="chat-dropdown" id="chatDropdown" style="display:none;">
        <div class="chat-dd-item chat-dd-delete">Delete chat</div>
      </div>
    </div>
    <div class="chat-messages" id="chatMsgs">
      <div class="chat-thread-start">Conversation started — from your letter, ${escapeHtml(thread?.startedAt || 'Feb 28')}</div>
      ${messagesHtml}
      <div class="typing-indicator" id="typingIndicator" style="display:none;">
        <div class="typing-bubble"><span></span><span></span><span></span></div>
        <div class="tl-note">${escapeHtml(partnerName)} is writing…</div>
      </div>
    </div>
    <div class="chat-input-row">
      <button type="button" class="wave-btn" id="chat-wave-btn" title="Send a wave">
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M1 7 Q3 3 5 7 Q7 11 9 7 Q11 3 13 7 Q15 11 17 7"/></svg>
      </button>
      <textarea class="chat-input" id="chatInput" placeholder="Write something..." rows="1"></textarea>
      <button type="button" class="send-btn" id="chat-send">→</button>
    </div>
  `;

  screen.querySelector('#chat-back').addEventListener('click', () => window.harborNavigate('home'));

  const dropdown = screen.querySelector('#chatDropdown');
  const menuBtn = screen.querySelector('#chat-menu-btn');
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });
  dropdown.querySelector('.chat-dd-delete').addEventListener('click', () => {
    dropdown.style.display = 'none';
    window.harborNavigate('home');
  });
  const closeDropdown = (e) => {
    if (!e.target.closest('.chat-menu-btn') && !e.target.closest('.chat-dropdown')) {
      dropdown.style.display = 'none';
    }
  };
  document.addEventListener('click', closeDropdown);

  const input = screen.querySelector('#chatInput');
  const msgsEl = screen.querySelector('#chatMsgs');
  const typingEl = screen.querySelector('#typingIndicator');
  let msgCount = (thread?.messages || []).length;

  function addReactionsToMessages() {
    msgsEl.querySelectorAll('.msg-bubble').forEach((bubble) => {
      if (bubble.querySelector('.react-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'react-btn';
      btn.innerHTML = IconStar(14);
      btn.title = 'This stayed with me';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.classList.contains('reacted')) return;
        btn.classList.add('reacted');
        const float = document.createElement('span');
        float.className = 'react-float';
        float.innerHTML = IconStar(14);
        bubble.appendChild(float);
        setTimeout(() => float.remove(), 1000);
      });
      bubble.appendChild(btn);
    });
  }

  function addDepthHint() {
    const hints = ['You both tend to write at night.', 'You share a certain quietness.', 'This is your 3rd exchange.', 'You both chose words carefully today.', 'Something unspoken moves between these lines.'];
    const div = document.createElement('div');
    div.className = 'depth-hint';
    div.textContent = hints[Math.floor(Math.random() * hints.length)];
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function showTyping() {
    typingEl.style.display = 'block';
    msgsEl.scrollTop = msgsEl.scrollHeight;
    setTimeout(() => { typingEl.style.display = 'none'; }, 2500);
  }

  const sendMsg = () => {
    const txt = input.value.trim();
    if (!txt) return;
    msgCount++;
    if (msgCount % 3 === 0) addDepthHint();
    addXP(20);
    const now = new Date();
    const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const div = document.createElement('div');
    div.className = 'msg me';
    div.innerHTML = `<div class="msg-bubble">${escapeHtml(txt)}</div><div class="msg-time">${t}</div>`;
    msgsEl.appendChild(div);
    input.value = '';
    input.style.height = 'auto';
    msgsEl.scrollTop = msgsEl.scrollHeight;
    addReactionsToMessages();
    setTimeout(showTyping, 1500);
  };

  function sendWave() {
    const now = new Date();
    const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const div = document.createElement('div');
    div.className = 'msg me';
    div.innerHTML = '<div class="msg-bubble wave-msg">〰 a wave from across the water</div><div class="msg-time">' + t + '</div>';
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    addXP(5);
    addReactionsToMessages();
  }

  addReactionsToMessages();

  screen.querySelector('#chat-wave-btn').addEventListener('click', sendWave);
  screen.querySelector('#chat-send').addEventListener('click', sendMsg);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  });
  input.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 90) + 'px';
  });

  wrap.appendChild(screen);
  return wrap;
}

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
