/**
 * Map of Harbors — real dark tile map (Leaflet) + lighthouse markers
 */

import { getTabIcon } from '../components/TabIcons.js';

const LIGHTHOUSES = [
  { id: 'paris', coordinate: { lat: 48.85, lng: 2.35 }, intensity: 0.9 },
  { id: 'london', coordinate: { lat: 51.51, lng: -0.12 }, intensity: 0.75 },
  { id: 'berlin', coordinate: { lat: 52.52, lng: 13.4 }, intensity: 0.8 },
  { id: 'rome', coordinate: { lat: 41.9, lng: 12.49 }, intensity: 0.95 },
  { id: 'madrid', coordinate: { lat: 40.42, lng: -3.7 }, intensity: 0.65 },
  { id: 'telaviv', coordinate: { lat: 32.08, lng: 34.78 }, intensity: 1, isYou: true },
  { id: 'istanbul', coordinate: { lat: 41.01, lng: 28.95 }, intensity: 0.7 },
  { id: 'tokyo', coordinate: { lat: 35.69, lng: 139.69 }, intensity: 0.85 },
  { id: 'seoul', coordinate: { lat: 37.57, lng: 126.98 }, intensity: 0.6 },
  { id: 'shanghai', coordinate: { lat: 31.23, lng: 121.47 }, intensity: 0.75 },
  { id: 'nyc', coordinate: { lat: 40.71, lng: -74 }, intensity: 0.9 },
  { id: 'la', coordinate: { lat: 34.05, lng: -118.24 }, intensity: 0.7 },
  { id: 'saopaulo', coordinate: { lat: -23.55, lng: -46.63 }, intensity: 0.55 },
  { id: 'sydney', coordinate: { lat: -33.87, lng: 151.21 }, intensity: 0.65 },
  { id: 'mumbai', coordinate: { lat: 19.08, lng: 72.88 }, intensity: 0.6 },
  { id: 'capetown', coordinate: { lat: -33.93, lng: 18.42 }, intensity: 0.5 },
];

const STORM_ZONES = [
  { id: 'europe', center: { lat: 47, lng: 9 }, radius: 700000 },
  { id: 'eastasia', center: { lat: 35, lng: 130 }, radius: 550000 },
  { id: 'eastcoast', center: { lat: 41, lng: -72 }, radius: 480000 },
];

function createLighthouseIcon(lh) {
  const coreSize = lh.isYou ? 12 : 8;
  const glowSize = Math.round(coreSize * 3.2);
  const opacity = lh.intensity * 0.18;
  const innerOpacity = lh.intensity * 0.35;
  const color = 'rgba(196,151,47,' + lh.intensity + ')';
  const ring = lh.isYou ? '<span class="lh-marker-ring" style="width:20px;height:20px;margin-left:-10px;margin-top:-10px;left:20px;top:20px;border-radius:50%;border:1.5px solid rgba(196,151,47,0.7);"></span>' : '';
  return (
    '<div class="lh-marker-wrap" style="width:40px;height:40px;position:relative;">' +
    '<span class="lh-marker-glow lh-marker-pulse" style="width:' + glowSize + 'px;height:' + glowSize + 'px;margin-left:-' + glowSize / 2 + 'px;margin-top:-' + glowSize / 2 + 'px;left:20px;top:20px;border-radius:50%;background:rgba(196,151,47,' + opacity + ');"></span>' +
    '<span class="lh-marker-inner" style="width:' + coreSize * 2 + 'px;height:' + coreSize * 2 + 'px;margin-left:-' + coreSize + 'px;margin-top:-' + coreSize + 'px;left:20px;top:20px;border-radius:50%;background:rgba(196,151,47,' + innerOpacity + ');"></span>' +
    '<span class="lh-marker-core" style="width:' + coreSize + 'px;height:' + coreSize + 'px;margin-left:-' + coreSize / 2 + 'px;margin-top:-' + coreSize / 2 + 'px;left:20px;top:20px;border-radius:50%;background:' + color + ';"></span>' +
    ring +
    '</div>'
  );
}

function initLeafletMap(container) {
  if (!window.L || !container) return null;
  const map = window.L.map(container, {
    zoomControl: false,
    attributionControl: false,
  });
  window.L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 8,
    tileSize: 256,
  }).addTo(map);
  map.setView([30, 10], 2);
  map.setMinZoom(1.5);
  map.setMaxZoom(7);
  map.scrollWheelZoom.enable();
  const L = window.L;
  STORM_ZONES.forEach((zone) => {
    L.circle([zone.center.lat, zone.center.lng], {
      radius: zone.radius,
      fillColor: 'rgba(60,100,220,0.07)',
      fillOpacity: 1,
      color: 'rgba(80,130,255,0.2)',
      weight: 1,
    }).addTo(map);
  });
  LIGHTHOUSES.forEach((lh) => {
    const icon = L.divIcon({
      className: 'lh-div-icon',
      html: createLighthouseIcon(lh),
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
    L.marker([lh.coordinate.lat, lh.coordinate.lng], { icon }).addTo(map);
  });
  return map;
}

export function renderMap(state) {
  const lightSystem = state.lightSystem || {};
  const reached = lightSystem.reached ?? 42;

  const wrap = document.createElement('div');
  wrap.className = 'screen active';
  wrap.id = 'map-screen';

  const screen = document.createElement('div');
  screen.className = 'map-screen';
  screen.innerHTML =
    '<div class="map-header"><div class="map-title">Map of Harbors</div><div class="map-subtitle" id="mapLiveCount">● 2,847 lights active</div></div>' +
    '<div class="map-canvas-wrap map-wrapper"><div id="worldMap" class="map-leaflet"></div>' +
    '<div class="map-legend"><div class="legend-item"><span class="legend-dot active"></span>Active lighthouse</div>' +
    '<div class="legend-item"><span class="legend-dot storm"></span>Storm zone</div><div class="legend-item"><span class="legend-dot drift"></span>Letter in transit</div></div>' +
    '<div class="map-attribution">© Stadia Maps  © OpenMapTiles  © OpenStreetMap</div></div>' +
    '<div class="map-you-section"><div class="map-you-label">Your light</div><div class="map-you-stat">reached <strong id="reachedCount">' +
    reached +
    '</strong> strangers across <strong>17</strong> countries</div></div>' +
    '<div class="map-recent"><div class="map-recent-label">recently active near you</div><div class="map-beacons" id="mapBeacons"></div></div>';

  const beaconData = [
    { name: 'Northern Flame', loc: 'Milan, Italy', dist: 'writing now', color: 'rgba(196,151,47,0.9)' },
    { name: 'Lunar Tide', loc: 'Reykjavík, Iceland', dist: '2h ago', color: 'rgba(196,151,47,0.6)' },
    { name: 'Hollow Crest', loc: 'Kyoto, Japan', dist: 'yesterday', color: 'rgba(196,151,47,0.35)' },
  ];
  const container = screen.querySelector('#mapBeacons');
  container.innerHTML = beaconData
    .map(
      (b) =>
        '<div class="beacon-row"><div class="beacon-dot-live" style="background:' +
        b.color +
        ';box-shadow:0 0 6px ' +
        b.color +
        '"></div><div class="beacon-name">' +
        b.name +
        '</div><div class="beacon-loc">' +
        b.loc +
        '</div><div class="beacon-dist">' +
        b.dist +
        '</div></div>'
    )
    .join('');

  let count = 2847;
  const liveEl = screen.querySelector('#mapLiveCount');
  const countInterval = setInterval(() => {
    if (!liveEl.parentNode) {
      clearInterval(countInterval);
      return;
    }
    count += Math.floor(Math.random() * 3) - 1;
    liveEl.textContent = '● ' + count.toLocaleString() + ' lights active';
  }, 4000);

  const mapEl = screen.querySelector('#worldMap');
  requestAnimationFrame(() => {
    initLeafletMap(mapEl);
  });

  const tabBar = document.createElement('div');
  tabBar.className = 'tab-bar';
  tabBar.innerHTML =
    '<div class="tab-item" id="map-tab-letters"><span class="tab-icon-wrap"><span class="tab-icon">' +
    getTabIcon('letters', false) +
    '</span></span><span class="tab-label">Letters</span></div>' +
    '<div class="tab-item" id="map-tab-chats"><span class="tab-icon-wrap"><span class="tab-icon">' +
    getTabIcon('chats', false) +
    '</span></span><span class="tab-label">Chats</span></div>' +
    '<div class="tab-item active"><span class="tab-icon-wrap"><span class="tab-icon">' +
    getTabIcon('map', true) +
    '</span></span><span class="tab-label">Map</span></div>' +
    '<div class="tab-item" id="map-tab-profile"><span class="tab-icon-wrap"><span class="tab-icon">' +
    getTabIcon('profile', false) +
    '</span></span><span class="tab-label">Profile</span></div>';
  tabBar.querySelector('#map-tab-letters').addEventListener('click', () => window.harborNavigate('home'));
  tabBar.querySelector('#map-tab-chats').addEventListener('click', () => window.harborNavigate('/chat/thread-1'));
  tabBar.querySelector('#map-tab-profile').addEventListener('click', () => window.harborNavigate('profile'));
  screen.appendChild(tabBar);

  wrap.appendChild(screen);
  return wrap;
}
