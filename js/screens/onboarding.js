/**
 * Onboarding — between Splash and Identity. Intro + 4 feature cards + CTA.
 * Flow: Splash → Onboarding → Identity (onboard)
 */

const GOLD = 'rgba(196,151,47,0.9)';

const FEATURES = [
  {
    icon: 'envelope',
    title: 'WRITE & SEND',
    desc: 'Cast your letter into the ocean — it will find a stranger who needs it',
  },
  {
    icon: 'globe',
    title: 'ACROSS THE WORLD',
    desc: 'Letters travel across countries and languages — translated, but never changed',
  },
  {
    icon: 'diamond',
    title: 'STAY ANONYMOUS',
    desc: 'No real names, no social feeds — only your words and a quiet alias',
  },
  {
    icon: 'lighthouse',
    title: 'YOUR LIGHTHOUSE',
    desc: 'Grow your light with every letter — watch it reach strangers across the sea',
  },
];

function getIconSvg(icon) {
  const stroke = GOLD;
  const w = 24;
  const h = 24;
  switch (icon) {
    case 'envelope':
      return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>`;
    case 'globe':
      return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M12 2v4M12 18v4M4 12h4M16 12h4"/></svg>`;
    case 'diamond':
      return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 9l9 13 9-13-9-7z"/><path d="M3 9h18M12 2v20"/></svg>`;
    case 'lighthouse':
      return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M8 22h8M6 10l3-4 3 4M6 10v8h12v-8M9 14h6"/><circle cx="12" cy="8" r="1.5" fill="${stroke}"/></svg>`;
    default:
      return '';
  }
}

export function renderOnboarding() {
  const wrap = document.createElement('div');
  wrap.className = 'screen active';

  const screen = document.createElement('div');
  screen.className = 'onboarding-screen';

  const featuresHtml = FEATURES.map(
    (f, i) => `
    <div class="onboarding-card onboarding-fade" style="animation-delay: ${400 + i * 100}ms">
      <div class="onboarding-card-icon">${getIconSvg(f.icon)}</div>
      <div class="onboarding-card-title">${f.title}</div>
      <div class="onboarding-card-desc">${f.desc}</div>
    </div>
  `
  ).join('');

  screen.innerHTML = `
    <div class="onboarding-stars" id="onboardingStars"></div>
    <div class="onboarding-inner">
      <h1 class="onboarding-logo onboarding-fade" style="animation-delay: 0ms">harbor</h1>
      <p class="onboarding-tagline onboarding-fade" style="animation-delay: 100ms">letters that find their way</p>
      <div class="onboarding-divider onboarding-fade" style="animation-delay: 200ms"></div>
      <p class="onboarding-intro onboarding-fade" style="animation-delay: 300ms">A place for letters that drift to strangers across the sea.</p>
      <div class="onboarding-cards">
        ${featuresHtml}
      </div>
      <button type="button" class="onboarding-btn onboarding-fade" id="onboarding-begin" style="animation-delay: 800ms">Begin your journey</button>
      <div class="onboarding-dots onboarding-fade" style="animation-delay: 900ms">
        <span class="onboarding-dot"></span>
        <span class="onboarding-dot onboarding-dot--active"></span>
        <span class="onboarding-dot"></span>
      </div>
    </div>
  `;

  const starsEl = screen.querySelector('#onboardingStars');
  if (starsEl) {
    for (let i = 0; i < 50; i++) {
      const s = document.createElement('div');
      s.className = 'onboarding-star';
      const sz = Math.random() * 1.5 + 0.4;
      const o = 0.2 + Math.random() * 0.45;
      s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 70}%;--star-o:${o};animation-delay:${Math.random() * 3}s`;
      starsEl.appendChild(s);
    }
  }

  screen.querySelector('#onboarding-begin').addEventListener('click', () => {
    window.harborNavigate('onboard');
  });

  wrap.appendChild(screen);
  return wrap;
}
