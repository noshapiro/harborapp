/**
 * First letter prompt — after onboard, before home
 */

import { getBrandIconHtml } from '../components/BrandIcon.js';

export function renderFirstLetter() {
  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'firstletter-screen';
  screen.innerHTML = `
    <div class="firstletter-inner">
      <div class="firstletter-icon">${getBrandIconHtml(52, '#c9b99a')}</div>
      <div class="firstletter-title">Your lighthouse<br>is lit.</div>
      <div class="firstletter-sub">Write your first letter.<br>It will drift to a stranger<br>and find the one who needs it.</div>
      <div class="firstletter-divider"></div>
      <div class="firstletter-note">anonymous · borderless · between people</div>
      <button type="button" class="firstletter-write" id="firstletter-write">⟿ Write a letter</button>
      <button type="button" class="firstletter-explore" id="firstletter-explore">Explore the inbox first</button>
    </div>
  `;

  screen.querySelector('#firstletter-write').addEventListener('click', () => window.harborNavigate('write'));
  screen.querySelector('#firstletter-explore').addEventListener('click', () => window.harborNavigate('home'));

  wrap.appendChild(screen);
  return wrap;
}
