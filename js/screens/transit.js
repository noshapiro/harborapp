/**
 * Bottle in transit — shown after sending a letter
 */

export function renderTransit() {
  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'transit-screen';
  screen.innerHTML = `
    <div class="transit-ocean">
      <div class="transit-wave tw1"></div>
      <div class="transit-wave tw2"></div>
      <div class="transit-wave tw3"></div>
    </div>
    <div class="transit-bottle-wrap">
      <div class="transit-bottle">
        <svg width="52" height="122" viewBox="0 0 52 122" fill="none">
          <rect x="18" y="1" width="16" height="11" rx="4" fill="rgba(160,120,70,0.7)"/>
          <path d="M19 12 L17 27 L35 27 L33 12 Z" fill="rgba(180,220,240,0.18)" stroke="rgba(180,220,240,0.3)" stroke-width="0.7"/>
          <path d="M17 27 Q6 32 6 46 L6 82 Q6 102 26 102 Q46 102 46 82 L46 46 Q46 32 35 27 Z" fill="rgba(180,220,240,0.14)" stroke="rgba(180,220,240,0.28)" stroke-width="0.8"/>
          <path d="M7.5 50 Q7 58 7 68 L7 82 Q7 99 26 99 Q45 99 45 82 L45 68 Q45 58 44.5 50 Z" fill="rgba(15,52,96,0.55)"/>
          <rect x="16" y="40" width="20" height="13" rx="1.5" fill="rgba(245,240,232,0.55)" transform="rotate(-4 16 40)"/>
          <line x1="18" y1="44" x2="33" y2="44" stroke="rgba(26,26,46,0.2)" stroke-width="0.8"/>
          <line x1="18" y1="48" x2="32" y2="48" stroke="rgba(26,26,46,0.15)" stroke-width="0.8"/>
          <path d="M10 38 Q9 54 9 70" stroke="rgba(200,240,255,0.18)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <div class="transit-content">
      <div class="transit-label">your letter is drifting</div>
      <div class="transit-title">somewhere out there</div>
      <div class="transit-timer-wrap">
        <div class="transit-timer-bar"><div class="transit-timer-fill" id="transitFill"></div></div>
        <div class="transit-eta" id="transitEta">arrives in approximately 4–8 hours</div>
      </div>
      <div class="transit-coord" id="transitCoord">last seen at 41°N 028°E</div>
    </div>
    <button type="button" class="transit-home-btn" id="transit-home-btn">← Back to harbour</button>
  `;

  screen.querySelector('#transit-home-btn').addEventListener('click', () => window.harborNavigate('home'));

  const coordEl = screen.querySelector('#transitCoord');
  const coordInterval = setInterval(() => {
    if (!coordEl?.parentNode) {
      clearInterval(coordInterval);
      return;
    }
    const lat = (35 + Math.random() * 20).toFixed(0);
    const lon = (10 + Math.random() * 40).toFixed(0);
    const ns = Math.random() > 0.3 ? 'N' : 'S';
    const ew = Math.random() > 0.4 ? 'E' : 'W';
    coordEl.textContent = `last seen at ${lat}°${ns} 0${lon}°${ew}`;
  }, 4500);

  wrap.appendChild(screen);
  return wrap;
}
