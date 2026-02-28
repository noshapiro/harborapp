/**
 * App header: logo + avatar + optional back
 */

function logo() {
  const a = document.createElement('a');
  a.href = '#';
  a.className = 'app-logo';
  a.textContent = 'harbor';
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.harborNavigate('/home');
  });
  return a;
}

function avatar(user, onClick) {
  const wrap = document.createElement('div');
  wrap.className = 'avatar-wrap';
  if (user?.nickname) {
    const name = document.createElement('span');
    name.className = 'username';
    name.textContent = user.nickname;
    wrap.appendChild(name);
  }
  const av = document.createElement('button');
  av.type = 'button';
  av.className = 'avatar';
  av.setAttribute('aria-label', 'Profile');
  if (onClick) av.addEventListener('click', onClick);
  wrap.appendChild(av);
  return wrap;
}

function backButton(onBack) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-btn';
  btn.setAttribute('aria-label', 'Back');
  btn.textContent = '←';
  if (onBack) btn.addEventListener('click', onBack);
  return btn;
}

/**
 * @param {Object} opts
 * @param {boolean} opts.showBack
 * @param {function} opts.onBack
 * @param {string} opts.title - optional center title
 * @param {Object} opts.user - for avatar
 * @param {function} opts.onAvatarClick
 */
export function renderHeader(opts = {}) {
  const header = document.createElement('header');
  header.className = 'app-header';

  if (opts.showBack && opts.onBack) {
    header.appendChild(backButton(opts.onBack));
  }

  if (opts.title) {
    const t = document.createElement('div');
    t.className = 'write-header-title';
    t.textContent = opts.title;
    header.appendChild(t);
  } else {
    header.appendChild(logo());
  }

  if (opts.user !== false) {
    header.appendChild(
      avatar(opts.user, opts.onAvatarClick || (() => window.harborNavigate('/profile')))
    );
  }

  return header;
}

export { logo, avatar, backButton };
