/**
 * Add a sketch — matches harbor-iphone.html (canvas-box, cdot, c-btn)
 */

let ctx = null;
let currentColor = '#1a1a2e';
let drawing = false;

function pos(e, canvas) {
  const r = canvas.getBoundingClientRect();
  return [e.clientX - r.left, e.clientY - r.top];
}

function posTouch(e, canvas) {
  const r = canvas.getBoundingClientRect();
  return [e.touches[0].clientX - r.left, e.touches[0].clientY - r.top];
}

function setupCanvas(canvas) {
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  const start = (x, y) => { drawing = true; ctx.beginPath(); ctx.moveTo(x, y); };
  const move = (x, y) => { if (!drawing) return; ctx.strokeStyle = currentColor; ctx.lineTo(x, y); ctx.stroke(); };
  const end = () => (drawing = false);
  canvas.onmousedown = (e) => start(...pos(e, canvas));
  canvas.onmousemove = (e) => move(...pos(e, canvas));
  canvas.onmouseup = canvas.onmouseleave = end;
  canvas.ontouchstart = (e) => { e.preventDefault(); start(...posTouch(e, canvas)); };
  canvas.ontouchmove = (e) => { e.preventDefault(); move(...posTouch(e, canvas)); };
  canvas.ontouchend = end;
}

const COLORS = ['#1a1a2e', '#5a3e2b', '#0f3460', '#c4972f', '#8b6b4a'];

let modalEl = null;

export function openCanvasModal(options = {}) {
  const { onDone } = options;

  if (modalEl) {
    modalEl.classList.add('open');
    return;
  }

  modalEl = document.createElement('div');
  modalEl.className = 'canvas-modal';
  modalEl.id = 'canvasModal';

  modalEl.innerHTML = `
    <div class="canvas-box">
      <div class="canvas-title">Add a sketch to your letter</div>
      <canvas id="drawCanvas" width="280" height="180"></canvas>
      <div class="canvas-tools" id="canvas-tools"></div>
    </div>
  `;

  const tools = modalEl.querySelector('#canvas-tools');
  COLORS.forEach((hex, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'cdot' + (i === 0 ? ' sel' : '');
    dot.style.background = hex;
    dot.dataset.c = hex;
    dot.addEventListener('click', () => {
      modalEl.querySelectorAll('.cdot').forEach((d) => d.classList.remove('sel'));
      dot.classList.add('sel');
      currentColor = hex;
    });
    tools.appendChild(dot);
  });
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'c-btn';
  clearBtn.textContent = 'Clear';
  clearBtn.addEventListener('click', () => { if (ctx) ctx.clearRect(0, 0, 280, 180); });
  tools.appendChild(clearBtn);
  const doneBtn = document.createElement('button');
  doneBtn.type = 'button';
  doneBtn.className = 'c-btn done-btn';
  doneBtn.textContent = 'Done';
  doneBtn.addEventListener('click', () => { modalEl.classList.remove('open'); onDone?.(); });
  tools.appendChild(doneBtn);

  const canvas = modalEl.querySelector('#drawCanvas');
  const container = document.querySelector('.iphone-screen') || document.body;
  container.appendChild(modalEl);

  requestAnimationFrame(() => {
    modalEl.classList.add('open');
    setupCanvas(canvas);
  });
}

export function closeCanvasModal() {
  if (modalEl) modalEl.classList.remove('open');
}
