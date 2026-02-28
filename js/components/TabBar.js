/**
 * Tab bar with minimal inline SVG icons (no emoji)
 * Active tab: subtle glow underline
 */

const icons = {
  letters: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 5v14h18V5H3zm2 2h14v10H5V7zm2 2v6h10V9H7zm2 2h6v2H9v-2z"/></svg>`,
  chats: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
  profile: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="3"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`,
};

function tabItem(id, label, isActive, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'tab-item' + (isActive ? ' active' : '');
  btn.setAttribute('aria-current', isActive ? 'true' : 'false');
  btn.innerHTML = icons[id] || '';
  const text = document.createElement('span');
  text.textContent = label;
  btn.appendChild(text);
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

export function renderTabBar(activeScreen) {
  const bar = document.createElement('div');
  bar.className = 'tab-bar';
  bar.setAttribute('role', 'tablist');

  const tabs = [
    { id: 'letters', label: 'Letters', route: 'home' },
    { id: 'chats', label: 'Chats', route: 'chat' },
    { id: 'profile', label: 'Profile', route: 'profile' },
  ];

  tabs.forEach((t) => {
    const isActive = activeScreen === t.route;
    let path = '/' + t.route;
    if (t.route === 'chat') path = '/chat/thread-1'; // default thread
    bar.appendChild(tabItem(t.id, t.label, isActive, () => window.harborNavigate(path)));
  });

  return bar;
}
