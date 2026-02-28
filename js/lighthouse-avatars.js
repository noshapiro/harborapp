/**
 * Список файлов изображений маяков и случайный выбор при создании аккаунта.
 * Загрузите картинки в папку assets/lighthouses/ с именами 1.jpg, 2.jpg, … 20.jpg (или .png).
 */

const EXT = 'png'; // или 'jpg' — должен совпадать с загруженными файлами

/** Номера доступных аватаров (1–20). Добавьте файлы с такими именами в assets/lighthouses/ */
export const LIGHTHOUSE_FILES = Array.from({ length: 20 }, (_, i) => `${i + 1}.${EXT}`);

/** Root-relative path so avatars load when URL is /home, /profile, etc. */
export function getAvatarUrl(filename) {
  if (!filename) return null;
  const path = `assets/lighthouses/${filename}`;
  if (typeof window !== 'undefined' && window.location?.protocol === 'file:') return path;
  return `/${path}`;
}

/** Случайно выбрать один из маяков (при создании аккаунта). */
export function getRandomAvatar() {
  const i = Math.floor(Math.random() * LIGHTHOUSE_FILES.length);
  return LIGHTHOUSE_FILES[i];
}

/** Вернуть 4 случайных имени файла без повторов. exclude — массив имён, которые не включать. */
export function getRandomFour(exclude = []) {
  const pool = LIGHTHOUSE_FILES.filter((f) => !exclude.includes(f));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}
