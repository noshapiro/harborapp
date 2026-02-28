/**
 * Tiny store: getState / setState / subscribe
 */

let state = {
  user: {
    nickname: '',
    avatarColor: '#0f3460',
    avatarIntensity: 0.8,
    avatarImage: null, // filename from assets/lighthouses/, e.g. '3.png'
  },
  letters: [],
  unreadIds: [],
  currentLetterId: null,
  threads: [],
  currentThreadId: null,
  sentLetters: [],
  lightSystem: {
    level: 4,
    streak: 3,
    reached: 42,
    xp: 340,
    xpToNext: 100,
  },
  savedMoments: [
    { text: 'Rivers breathe too. In their own way.', from: 'Northern Flame', date: 'Feb 28' },
    { text: 'Some things need time to travel.', from: 'Silver Harbour', date: 'Feb 22' },
    { text: 'Autumn feels particularly long this year.', from: 'Lunar Tide', date: 'Feb 14' },
  ],
  ui: {
    activeRoute: '/splash',
    modal: { type: null, payload: null },
    toast: null,
    translation: { showOriginal: false },
  },
};

const listeners = new Set();

function getState() {
  return state;
}

function setState(partial) {
  if (typeof partial !== 'object' || partial === null) return;
  state = { ...state, ...partial };
  if (partial.letters !== undefined) state.letters = partial.letters;
  if (partial.unreadIds !== undefined) state.unreadIds = partial.unreadIds;
  if (partial.threads !== undefined) state.threads = partial.threads;
  if (partial.sentLetters !== undefined) state.sentLetters = partial.sentLetters;
  if (partial.lightSystem !== undefined) state.lightSystem = { ...state.lightSystem, ...partial.lightSystem };
  if (partial.savedMoments !== undefined) state.savedMoments = partial.savedMoments;
  if (partial.ui !== undefined) state.ui = { ...state.ui, ...partial.ui };
  if (partial.user !== undefined) state.user = { ...state.user, ...partial.user };
  listeners.forEach((fn) => fn(state));
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export { getState, setState, subscribe };
