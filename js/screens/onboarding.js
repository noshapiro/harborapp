/**
 * Onboarding — экран между Splash и Identity.
 * Поток: Splash → Onboarding → Identity (onboard).
 * Пересобран с нуля: минимальная логика, надёжная навигация.
 */

import { navigate } from '../router.js';

const GOLD = 'rgba(196,151,47,0.9)';

const FEATURES = [
  { icon: 'envelope', title: 'WRITE & SEND', desc: 'Cast your letter into the ocean — it will find a stranger who needs it' },
  { icon: 'globe', title: 'ACROSS THE WORLD', desc: 'Letters travel across countries and languages — translated, but never changed' },
  { icon: 'diamond', title: 'STAY ANONYMOUS', desc: 'No real names, no social feeds — only your words and a quiet alias' },
  { icon: 'lighthouse', title: 'YOUR LIGHTHOUSE', desc: 'Grow your light with every letter — watch it reach strangers across the sea' },
];

function iconSvg(icon) {
  const s = GOLD;
  const w = 24, h = 24;
  switch (icon) {
    case 'envelope':
      return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>`;
    case 'globe':
      return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    case 'diamond':
      return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 9l9 13 9-13-9-7z"/><path d="M3 9h18M12 2v20"/></svg>`;
    case 'lighthouse':
      return `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M8 22h8M6 10l3-4 3 4M6 10v8h12v-8M9 14h6"/><circle cx="12" cy="8" r="1.5" fill="${s}"/></svg>`;
    default:
      return '';
  }
}

export function renderOnboarding() {
  const wrap = document.createElement('div');
  wrap.className = 'screen active';
  wrap.setAttribute('data-screen', 'onboarding');

  const root = document.createElement('div');
  root.className = 'onboarding-screen';

  // Stars layer
  const starsEl = document.createElement('div');
  starsEl.className = 'onboarding-stars';
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'onboarding-star';
    const sz = Math.random() * 1.5 + 0.4;
    const o = 0.2 + Math.random() * 0.45;
    star.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 70}%;--star-o:${o};animation-delay:${Math.random() * 3}s`;
    starsEl.appendChild(star);
  }
  root.appendChild(starsEl);

  // Content
  const inner = document.createElement('div');
  inner.className = 'onboarding-inner';

  const logo = document.createElement('h1');
  logo.className = 'onboarding-logo onboarding-fade';
  logo.style.animationDelay = '0ms';
  logo.textContent = 'harbor';
  inner.appendChild(logo);

  const tagline = document.createElement('p');
  tagline.className = 'onboarding-tagline onboarding-fade';
  tagline.style.animationDelay = '100ms';
  tagline.textContent = 'letters that find their way';
  inner.appendChild(tagline);

  const divider = document.createElement('div');
  divider.className = 'onboarding-divider onboarding-fade';
  divider.style.animationDelay = '200ms';
  inner.appendChild(divider);

  const intro = document.createElement('p');
  intro.className = 'onboarding-intro onboarding-fade';
  intro.style.animationDelay = '300ms';
  intro.textContent = 'A place for letters that drift to strangers across the sea.';
  inner.appendChild(intro);

  const cardsWrap = document.createElement('div');
  cardsWrap.className = 'onboarding-cards';
  FEATURES.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'onboarding-card onboarding-fade';
    card.style.animationDelay = `${400 + i * 100}ms`;
    card.innerHTML = `
      <div class="onboarding-card-icon">${iconSvg(f.icon)}</div>
      <div class="onboarding-card-title">${f.title}</div>
      <div class="onboarding-card-desc">${f.desc}</div>
    `;
    cardsWrap.appendChild(card);
  });
  inner.appendChild(cardsWrap);

  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'onboarding-btn onboarding-fade';
  cta.id = 'onboarding-cta';
  cta.setAttribute('data-navigate', 'onboard');
  cta.style.animationDelay = '800ms';
  cta.textContent = 'BEGIN YOUR JOURNEY';
  cta.addEventListener('click', function () {
    navigate('onboard');
  });
  inner.appendChild(cta);

  const dots = document.createElement('div');
  dots.className = 'onboarding-dots onboarding-fade';
  dots.style.animationDelay = '900ms';
  dots.innerHTML = '<span class="onboarding-dot"></span><span class="onboarding-dot onboarding-dot--active"></span><span class="onboarding-dot"></span>';
  inner.appendChild(dots);

  root.appendChild(inner);
  wrap.appendChild(root);
  return wrap;
}
