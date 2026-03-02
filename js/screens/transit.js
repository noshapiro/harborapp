/**
 * Bottle in transit — shown after sending a letter
 */

function getTransitVideoSrc() {
  const path = 'assets/videos/bottle-drift.mp4';
  if (typeof window === 'undefined' || !window.location) return '/' + path;
  if (window.location.protocol === 'file:') return path;
  const origin = window.location.origin || '';
  const base = origin.replace(/\/$/, '');
  return base + '/' + path;
}

export function renderTransit() {
  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'transit-screen';
  const videoSrc = getTransitVideoSrc();
  screen.innerHTML = `
    <div class="transit-video-wrap">
      <video class="transit-video" src="${videoSrc}" autoplay loop muted playsinline preload="auto"></video>
      <div class="transit-video-overlay" aria-hidden="true"></div>
    </div>
    <div class="transit-content">
      <div class="transit-label">your letter is drifting</div>
      <div class="transit-title">somewhere out there</div>
      <div class="transit-timer-wrap">
        <div class="transit-timer-bar"><div class="transit-timer-fill" id="transitFill"></div></div>
        <div class="transit-eta" id="transitEta">arrives in approximately 4–8 hours</div>
      </div>
      <div class="transit-coord" id="transitCoord">last seen at 41°N 028°E</div>
      <button type="button" class="transit-home-btn" id="transit-home-btn">← Back to harbour</button>
    </div>
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
