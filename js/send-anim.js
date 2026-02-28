/**
 * Send animation overlay (V2): stars, ocean, bottle, tone/dest. → transit, addXP(30).
 */

import { getState, setState } from './state.js';
import { addXP } from './light-system.js';

function formatDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const BOTTLE_SVG = '<svg width="36" height="86" viewBox="0 0 36 86" fill="none"><rect x="12" y="1" width="12" height="8" rx="3" fill="rgba(160,120,70,0.8)"/><path d="M14 9 L12 24 L24 24 L22 9 Z" fill="rgba(180,220,240,0.18)" stroke="rgba(180,220,240,0.3)" stroke-width="0.7"/><path d="M12 24 Q2 29 2 42 L2 78 Q2 98 18 98 Q34 98 34 78 L34 42 Q34 29 24 24 Z" fill="rgba(180,220,240,0.14)" stroke="rgba(180,220,240,0.28)" stroke-width="0.8"/><path d="M3 41 Q2.5 50 2.5 59 L2.5 78 Q2.5 95 18 95 Q33.5 95 33.5 78 L33.5 59 Q33.5 50 33 41 Z" fill="rgba(15,52,96,0.55)"/><rect x="11" y="32" width="14" height="10" rx="1.5" fill="rgba(245,240,232,0.55)" transform="rotate(-4 18 37)"/></svg>';

export function triggerSendAnim(selectedDelay, deliverAt, preview, options = {}) {
  const container = document.querySelector('.iphone-screen');
  const existing = document.getElementById('sendAnim');
  if (existing) existing.remove();

  const { tone = 'melancholy', dest = 'sea', region } = options;
  const isInstant = selectedDelay === 0;
  const subText = dest === 'shore' && region
    ? 'Drifting towards ' + region + '…'
    : 'Drifting towards open sea…';
  const titleText = isInstant ? 'Your letter is drifting away…' : 'Your letter is sealed.';

  const anim = document.createElement('div');
  anim.className = 'send-anim';
  anim.id = 'sendAnim';
  anim.innerHTML = `
    <div class="sa-stars" id="saStars"></div>
    <div class="sa-ocean">
      <div class="sa-wave sa-w1"></div>
      <div class="sa-wave sa-w2"></div>
    </div>
    <div class="sa-bottle" id="saBottle">${BOTTLE_SVG}</div>
    <div class="sa-content">
      <div class="sa-title" id="saTitle">${titleText}</div>
      <div class="sa-sub" id="saSub">${subText}</div>
      <span class="sa-tone-badge" id="saToneBadge">${tone}</span>
    </div>
  `;

  const starsDiv = anim.querySelector('#saStars');
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('div');
    const sz = Math.random() * 1.5 + 0.3;
    s.style.cssText = 'position:absolute;border-radius:50%;background:white;width:' + sz + 'px;height:' + sz + 'px;left:' + Math.random() * 100 + '%;top:' + Math.random() * 60 + '%;opacity:' + (0.1 + Math.random() * 0.5) + ';';
    starsDiv.appendChild(s);
  }

  container.appendChild(anim);
  requestAnimationFrame(() => anim.classList.add('show'));

  addXP(30);

  const duration = 3400;
  setTimeout(() => {
    anim.classList.remove('show');
    setTimeout(() => anim.remove(), 350);

    if (preview != null) {
      const sentLetters = getState().sentLetters || [];
      const entry = {
        id: Date.now(),
        preview: String(preview).slice(0, 100),
        delay: selectedDelay,
        writtenAt: new Date(),
        deliverAt: deliverAt || new Date(Date.now() + (selectedDelay || 0) * 1000),
        status: 'pending',
      };
      setState({ sentLetters: [...sentLetters, entry] });
    }

    window.harborNavigate('/transit');
  }, duration);
}
