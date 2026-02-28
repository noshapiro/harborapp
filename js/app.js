/**
 * Bootstrap: init state from mock data, router, render current screen
 */

import { getState, setState, subscribe } from './state.js';
import { navigate, init as initRouter } from './router.js';
import { mockUser, mockLetters, mockThreads, mockSentLetters } from './mock-data.js';
import { renderSplash } from './screens/splash.js';
import { renderOnboard } from './screens/onboard.js';
import { renderFirstLetter } from './screens/firstletter.js';
import { renderHome } from './screens/home.js';
import { renderWrite } from './screens/write.js';
import { renderRead } from './screens/read.js';
import { renderChat } from './screens/chat.js';
import { renderProfile } from './screens/profile.js';
import { renderMap } from './screens/map.js';
import { renderTransit } from './screens/transit.js';
import { renderMoments } from './screens/moments.js';

// Seed state with mock data
setState({
  user: mockUser,
  letters: mockLetters,
  unreadIds: ['letter-1'],
  threads: mockThreads,
  sentLetters: mockSentLetters,
  currentLetterId: null,
  currentThreadId: null,
});

// Hydrate user from localStorage so avatar + nickname persist across reloads
try {
  const saved = localStorage.getItem('harbor_user');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed && typeof parsed === 'object') {
      setState({
        user: {
          ...getState().user,
          nickname: parsed.nickname ?? getState().user.nickname,
          avatarImage: parsed.avatarImage ?? getState().user.avatarImage,
        },
      });
    }
  }
} catch (_) {}

const appEl = document.getElementById('app');
if (!appEl) throw new Error('#app root not found');

const screens = {
  splash: renderSplash,
  onboard: renderOnboard,
  firstletter: renderFirstLetter,
  home: renderHome,
  write: renderWrite,
  read: renderRead,
  chat: renderChat,
  profile: renderProfile,
  map: renderMap,
  transit: renderTransit,
  moments: renderMoments,
};

function renderScreen(name, params) {
  const fn = screens[name];
  if (fn) {
    appEl.innerHTML = '';
    const wrap = fn({ ...getState(), routeParams: params });
    if (wrap) appEl.appendChild(wrap);
  }
  // Sync nav pills (dev)
  const pills = document.getElementById('nav-pills');
  if (pills) {
    pills.querySelectorAll('button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.route === name);
    });
  }
}

function handleRoute(e) {
  const { name, params } = e.detail;
  setState({ ui: { ...getState().ui, activeRoute: e.detail.path } });
  if (name === 'read') setState({ currentLetterId: params.letterId });
  if (name === 'chat') setState({ currentThreadId: params.threadId });
  renderScreen(name, params);
  window.scrollTo(0, 0);
}

window.addEventListener('route', handleRoute);

window.harborNavigate = navigate;

// Nav pills click (dev)
document.getElementById('nav-pills')?.addEventListener('click', (e) => {
  const route = e.target.closest('button')?.dataset?.route;
  if (route) navigate(route);
});

initRouter();
