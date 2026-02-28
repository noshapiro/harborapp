/**
 * Read letter — matches harbor-iphone.html (Save a line → Moments)
 */

import { getState, setState } from '../state.js';

export function renderRead(state) {
  const { routeParams = {}, letters = [] } = state;
  const letterId = routeParams.letterId || state.currentLetterId;
  const letter = letters.find((l) => l.id === letterId) || letters[0];

  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'read-screen';

  const bodyHtml = letter?.body
    ? letter.body
        .split('\n\n')
        .map((p) => `<p style="margin-bottom:1em;">${escapeHtml(p.replace(/\n/g, '<br>'))}</p>`)
        .join('')
    : '<p>No letter selected.</p>';

  screen.innerHTML = `
    <div class="read-header">
      <button type="button" class="back-btn" id="read-back">←</button>
      <div class="read-from">from ${escapeHtml(letter?.from || '')}</div>
      <button type="button" class="report-btn">⚑ Report</button>
    </div>
    ${letter?.translatedFrom ? '<div class="translation-bar">🌐 Auto-translated from ' + escapeHtml(letter.translatedFrom) + '</div>' : ''}
    <div class="time-capsule-bar">🕰 This letter traveled through time to reach you.</div>
    <div class="letter-paper" style="margin-top:14px;">
      <div class="letter-paper-top"></div>
      <div class="letter-paper-inner">
        <div class="letter-text">${bodyHtml}</div>
        ${letter?.hasSketch ? `<div class="letter-sketch"><div class="sketch-placeholder">✏ ${escapeHtml(letter.sketchPlaceholder || 'a pencil sketch')}</div></div>` : ''}
        <div class="letter-sig">— ${escapeHtml(letter?.from || '')}${letter?.fromLocation ? ', ' + escapeHtml(letter.fromLocation) : ''}</div>
      </div>
    </div>
    <button type="button" class="save-line-btn" id="saveLineBtn">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><polygon points="7,1 8.8,5.2 13.5,5.5 10,8.5 11.1,13.2 7,10.5 2.9,13.2 4,8.5 0.5,5.5 5.2,5.2"/></svg>
      Save a line
    </button>
    <div class="letter-actions" style="margin-top:14px;">
      <button type="button" class="btn-reply" id="read-reply">Reply → begin a conversation</button>
      <button type="button" class="btn-release" id="read-release">Release this letter</button>
    </div>
  `;

  screen.querySelector('#read-back').addEventListener('click', () => window.harborNavigate('home'));

  const saveLineBtn = screen.querySelector('#saveLineBtn');
  if (saveLineBtn) {
    saveLineBtn.addEventListener('click', () => {
      const line = letter?.body
        ? letter.body.split(/\n\n+/)[0]?.trim().slice(0, 120) || letter.preview?.slice(0, 120)
        : 'Do you ever just listen to something, with no particular reason?';
      const savedMoments = getState().savedMoments || [];
      const next = [{ text: line, from: letter?.from || 'Unknown', date: 'Today' }, ...savedMoments].slice(0, 3);
      setState({ savedMoments: next });
      saveLineBtn.classList.add('saved');
      saveLineBtn.innerHTML = '✦ Saved to Moments';
      setTimeout(() => {
        saveLineBtn.classList.remove('saved');
        saveLineBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><polygon points="7,1 8.8,5.2 13.5,5.5 10,8.5 11.1,13.2 7,10.5 2.9,13.2 4,8.5 0.5,5.5 5.2,5.2"/></svg> Save a line';
      }, 2000);
    });
  }

  screen.querySelector('#read-reply').addEventListener('click', () => {
    const thread = getState().threads?.find((t) => t.startedFromLetterId === letter?.id);
    window.harborNavigate(thread ? '/chat/' + thread.id : '/chat/thread-1');
  });
  screen.querySelector('#read-release').addEventListener('click', () => window.harborNavigate('home'));

  wrap.appendChild(screen);
  return wrap;
}

function escapeHtml(s) {
  if (!s) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
