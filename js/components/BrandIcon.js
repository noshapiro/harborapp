/**
 * Brand icon — logo image from assets, fallback to anchor SVG.
 * Put logo at assets/logo.png (or logo.webp / logo.jpg).
 */

function getLogoUrl() {
  const path = 'assets/logo.png';
  if (typeof window !== 'undefined' && window.location?.protocol === 'file:') return path;
  return `/${path}`;
}

function getAnchorSvg(size, color) {
  const s = size;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="brand-icon brand-icon-fallback" aria-hidden="true">
  <circle cx="12" cy="5" r="2" stroke="${color}" stroke-width="1.5"/>
  <line x1="12" y1="7" x2="12" y2="20" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="6" y1="10" x2="18" y2="10" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6 10 Q3 15 6 19" stroke="${color}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M18 10 Q21 15 18 19" stroke="${color}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M6 19 Q9 21 12 20 Q15 21 18 19" stroke="${color}" stroke-width="1.5" stroke-linecap="round" fill="none"/>
</svg>`;
}

export function getBrandIconHtml(size = 48, color = '#c9b99a') {
  const logoUrl = getLogoUrl();
  const fallback = getAnchorSvg(size, color);
  return `<span class="brand-icon-wrap" style="display:inline-block;width:${size}px;height:${size}px;position:relative;">
  <img src="${logoUrl}" alt="" class="brand-icon-logo" width="${size}" height="${size}" style="width:100%;height:100%;object-fit:contain;display:block;" onerror="this.style.display='none';var n=this.nextElementSibling;if(n)n.style.display='block';">
  <span class="brand-icon-fallback-wrap" style="display:none;width:100%;height:100%;position:absolute;top:0;left:0;">${fallback}</span>
</span>`;
}
