/**
 * Splash — video background (bottle at sea) + wordmark + CTA
 * Layout: spacer | wordmark block | CTA block (fixed to bottom)
 */

// Path from app root so video loads when URL is /splash (SPA)
function getVideoSrc() {
  const path = '/assets/videos/bottle_loop.mp4';
  if (typeof window === 'undefined' || !window.location.origin) return path;
  if (window.location.protocol === 'file:') {
    return 'assets/videos/bottle_loop.mp4';
  }
  return path;
}

function getLogoSrc() {
  const path = 'assets/logo.png';
  if (typeof window !== 'undefined' && window.location?.protocol === 'file:') return path;
  return `/${path}`;
}

export function renderSplash() {
  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const splash = document.createElement('div');
  splash.className = 'splash';

  const videoSrc = getVideoSrc();
  const logoSrc = getLogoSrc();
  splash.innerHTML = `
    <video class="splash-video" id="splash-video" autoplay muted loop playsinline aria-hidden="true">
      <source src="${videoSrc}" type="video/mp4">
    </video>
    <div class="splash-gradient" aria-hidden="true"></div>
    <div class="splash-logo-absolute splash-entrance-logo" aria-hidden="true">
      <div class="splash-logo-wrap">
        <img src="${logoSrc}" alt="" class="splash-logo-img" width="68" height="68" loading="eager">
      </div>
    </div>
    <div class="splash-content">
      <div class="splash-spacer"></div>
      <div class="splash-wordmark-block">
        <h1 class="splash-wordmark splash-entrance-wordmark">harbor</h1>
        <p class="splash-tagline splash-entrance-tagline">letters that find their way</p>
      </div>
      <div class="splash-spacer-cta" style="height:52px;"></div>
      <div class="splash-cta-block splash-entrance-cta">
        <button type="button" class="splash-btn-begin" id="splash-begin">BEGIN</button>
        <p class="splash-hint">anonymous · borderless · between people</p>
      </div>
    </div>
  `;

  const video = splash.querySelector('#splash-video');
  if (video) {
    video.play().catch(() => {});
    video.addEventListener('error', () => {
      video.style.display = 'none';
    });
  }

  splash.querySelector('#splash-begin').addEventListener('click', () => {
    window.harborNavigate('onboard');
  });

  wrap.appendChild(splash);
  return wrap;
}
