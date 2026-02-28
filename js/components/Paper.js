/**
 * Paper block: parchment with lines and optional grain
 */

export function renderPaper(content, options = {}) {
  const { grain = false, className = '' } = options;
  const wrap = document.createElement('div');
  wrap.className = 'paper' + (grain ? ' paper-grain' : '') + (className ? ' ' + className : '');

  if (typeof content === 'string') {
    const inner = document.createElement('div');
    inner.className = 'letter-text';
    inner.innerHTML = content;
    wrap.appendChild(inner);
  } else if (content instanceof Node) {
    wrap.appendChild(content);
  }

  return wrap;
}
