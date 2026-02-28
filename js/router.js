/**
 * History API router: pushState / popstate, no hash
 * Routes: /splash, /home, /write, /read/:letterId, /chat/:threadId, /profile
 */

const routes = [
  { path: '/splash', name: 'splash' },
  { path: '/onboard', name: 'onboard' },
  { path: '/firstletter', name: 'firstletter' },
  { path: '/home', name: 'home' },
  { path: '/write', name: 'write' },
  { path: '/read/:letterId', name: 'read', param: 'letterId' },
  { path: '/chat/:threadId', name: 'chat', param: 'threadId' },
  { path: '/profile', name: 'profile' },
  { path: '/map', name: 'map' },
  { path: '/transit', name: 'transit' },
  { path: '/moments', name: 'moments' },
];

function parsePath(pathname) {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
  for (const route of routes) {
    const parts = route.path.replace(/^\/+|\/+$/g, '').split('/');
    if (parts.length !== segments.length) continue;
    const params = {};
    let match = true;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith(':')) {
        params[parts[i].slice(1)] = segments[i];
      } else if (parts[i] !== segments[i]) {
        match = false;
        break;
      }
    }
    if (match) return { name: route.name, params };
  }
  return { name: 'splash', params: {} };
}

function getPath() {
  const path = window.location.pathname || '/';
  if (path === '/' || path === '' || path.endsWith('index.html')) return '/splash';
  return path;
}

function navigate(pathOrName, paramValue) {
  let path;
  if (pathOrName.startsWith('/')) {
    path = pathOrName;
  } else {
    const route = routes.find((r) => r.name === pathOrName);
    if (!route) return;
    path = route.path;
    if (route.param && paramValue) path = path.replace(':' + route.param, paramValue);
  }
  window.history.pushState({ path }, '', path);
  emit(path);
}

function emit(path) {
  const parsed = parsePath(path);
  window.dispatchEvent(
    new CustomEvent('route', { detail: { path, name: parsed.name, params: parsed.params } })
  );
}

function init() {
  window.addEventListener('popstate', () => emit(getPath()));
  const initial = getPath();
  if (initial === '/splash' && (window.location.pathname === '/' || window.location.pathname === '' || window.location.pathname.endsWith('index.html'))) {
    window.history.replaceState({ path: '/splash' }, '', '/splash');
  }
  emit(initial);
}

export { routes, parsePath, getPath, navigate, init };
