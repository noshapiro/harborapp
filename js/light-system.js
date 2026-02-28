/**
 * Light level / XP — addXP on send letter, reply, wave
 */

import { getState, setState } from './state.js';

export function getLightSystem() {
  return getState().lightSystem || { level: 4, streak: 3, reached: 42, xp: 340, xpToNext: 100 };
}

export function addXP(pts) {
  const ls = getLightSystem();
  let { xp, xpToNext, level } = ls;
  xp += pts;
  xpToNext -= pts;
  if (xpToNext <= 0) {
    level = Math.min(level + 1, 10);
    xpToNext = level * 80;
  }
  setState({ lightSystem: { ...ls, xp, xpToNext, level } });
}
