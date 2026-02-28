/**
 * Write — matches harbor-iphone.html (paper, time capsule selector, send)
 */

import { openCanvasModal, closeCanvasModal } from '../components/CanvasModal.js';
import { triggerSendAnim } from '../send-anim.js';
import { IconPencil, IconClock } from '../components/EmojiIcons.js';

const DELAYS = [
  { value: 0, label: 'Now', seconds: 0 },
  { value: 86400, label: 'Tomorrow', seconds: 86400 },
  { value: 2592000, label: 'In 30 days', seconds: 2592000 },
  { value: 31536000, label: 'In a year', seconds: 31536000 },
];

function formatDeliverDate(secondsFromNow) {
  if (!secondsFromNow) return '';
  const d = new Date(Date.now() + secondsFromNow * 1000);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

export function renderWrite() {
  let selectedDelay = 0;
  const selectedDest = 'sea';
  const selectedRegion = '';

  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'write-screen';

  const pillsHtml = DELAYS.map(
    (opt) =>
      `<button type="button" class="time-capsule-pill${opt.seconds === 0 ? ' active' : ''}" data-delay="${opt.seconds}">${escapeHtml(opt.label)}</button>`
  ).join('');

  screen.innerHTML = `
    <div class="write-header">
      <button type="button" class="back-btn" id="write-back">←</button>
      <div class="write-title">A letter to the ocean</div>
    </div>
    <div class="write-paper-zone">
      <div class="paper-wrap">
        <div class="paper-top"></div>
        <div class="paper-inner">
          <textarea class="letter-textarea" id="letterText" placeholder="Write whatever you wish. This letter will find the one who needs it..."></textarea>
        </div>
        <div class="paper-footer">
          <span class="char-count" id="charCount">0 characters</span>
          <button type="button" class="draw-pill" id="draw-pill">${IconPencil(14)} Add sketch</button>
        </div>
      </div>
    </div>
    <div class="write-bottom-zone">
      <div class="time-capsule-section">
        <div class="time-capsule-label">when should it arrive?</div>
        <div class="time-capsule-pills">
          ${pillsHtml}
        </div>
        <div class="time-capsule-hint" id="timeCapsuleHint">
          Your letter will drift silently and arrive on <span id="hintDate"></span>.
        </div>
      </div>
      <div class="depth-nudge" id="depthNudge"></div>
      <div class="send-note">
        Your letter will be <em>reviewed</em> and drift to a stranger.<br>
        You will never know who receives it.
      </div>
      <button type="button" class="btn-send" id="btn-send">
        <span class="send-btn-label send-label-instant">⟿ Send to sea</span>
        <span class="send-btn-label send-label-seal">${IconClock(14)} Seal & send</span>
      </button>
    </div>
  `;

  screen.querySelector('#write-back').addEventListener('click', () => window.harborNavigate('home'));

  const textarea = screen.querySelector('#letterText');
  const charCount = screen.querySelector('#charCount');
  const depthNudge = screen.querySelector('#depthNudge');

  function updateDepthNudge(len) {
    if (!depthNudge) return;
    if (len === 0) {
      depthNudge.style.opacity = '0';
      return;
    }
    let msg = '';
    if (len < 80) msg = 'Keep going…';
    else if (len < 200) msg = "You're finding your words.";
    else if (len < 400) msg = 'This feels like a real letter.';
    else if (len < 700) msg = 'Someone will read this slowly.';
    else msg = 'This letter carries real weight. ✦';
    depthNudge.textContent = msg;
    depthNudge.style.opacity = '1';
  }

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = len + ' characters';
    updateDepthNudge(len);
  });

  screen.querySelector('#draw-pill').addEventListener('click', () => openCanvasModal({ onDone: closeCanvasModal }));

  const hintEl = screen.querySelector('#timeCapsuleHint');
  const hintDateSpan = screen.querySelector('#hintDate');
  const labelInstant = screen.querySelector('.send-label-instant');
  const labelSeal = screen.querySelector('.send-label-seal');

  function updateHintAndButton() {
    if (selectedDelay > 0) {
      hintDateSpan.textContent = formatDeliverDate(selectedDelay);
      hintEl.classList.add('visible');
      labelInstant.classList.remove('active');
      labelSeal.classList.add('active');
    } else {
      hintEl.classList.remove('visible');
      labelInstant.classList.add('active');
      labelSeal.classList.remove('active');
    }
  }

  screen.querySelectorAll('.time-capsule-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      selectedDelay = Number(pill.dataset.delay);
      screen.querySelectorAll('.time-capsule-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      updateHintAndButton();
    });
  });

  updateHintAndButton();

  screen.querySelector('#btn-send').addEventListener('click', () => {
    const txt = textarea.value.trim();
    if (!txt) {
      textarea.focus();
      return;
    }
    const deliverAt = selectedDelay > 0 ? new Date(Date.now() + selectedDelay * 1000) : null;
    const preview = txt.slice(0, 100);
    const region = null;
    triggerSendAnim(selectedDelay, deliverAt, preview, { dest: selectedDest, region });
  });

  wrap.appendChild(screen);
  return wrap;
}
