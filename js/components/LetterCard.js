/**
 * Letter card for home hero or previous list
 */

export function renderLetterCard(letter, options = {}) {
  const { isUnread = false, onClick } = options;
  const card = document.createElement('div');
  card.className = 'letter-card' + (isUnread ? ' letter-unread' : '');
  card.setAttribute('role', 'button');
  card.tabIndex = 0;

  const meta = document.createElement('div');
  meta.className = 'letter-meta';
  meta.innerHTML = `<span class="letter-from">from ${escapeHtml(letter.from)}</span><span class="letter-date">${escapeHtml(letter.date)}</span>`;
  card.appendChild(meta);

  const preview = document.createElement('div');
  preview.className = 'letter-preview';
  preview.textContent = letter.preview;
  card.appendChild(preview);

  if (onClick) {
    card.addEventListener('click', () => onClick(letter));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(letter);
      }
    });
  }

  return card;
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
