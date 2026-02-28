/**
 * Modal / bottom sheet for report, contact exchange, overflow menu
 */

let activeBackdrop = null;

export function closeActive() {
  if (activeBackdrop) {
    activeBackdrop.classList.remove('open');
    activeBackdrop = null;
  }
}

export function openModal(options = {}) {
  const { title, bodyHtml, onClose, onOpen, type = 'sheet' } = options;

  closeActive();

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  if (title) backdrop.setAttribute('aria-label', title);

  const sheet = document.createElement('div');
  sheet.className = 'modal-sheet';

  if (title) {
    const header = document.createElement('div');
    header.className = 'modal-sheet-header';
    header.innerHTML = `<span class="modal-sheet-title">${escapeHtml(title)}</span>`;
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn-ghost';
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => {
      closeActive();
      onClose?.();
    });
    header.appendChild(closeBtn);
    sheet.appendChild(header);
  }

  if (bodyHtml) {
    const body = document.createElement('div');
    body.className = 'modal-sheet-body';
    body.innerHTML = bodyHtml;
    sheet.appendChild(body);
  }

  backdrop.appendChild(sheet);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeActive();
      onClose?.();
    }
  });
  document.body.appendChild(backdrop);
  requestAnimationFrame(() => {
    backdrop.classList.add('open');
    if (onOpen && typeof onOpen === 'function') onOpen(sheet);
  });
  activeBackdrop = backdrop;
  return { close: () => closeActive(), onClose };
}

export function openReportModal(onReport) {
  return openModal({
    title: 'Report',
    bodyHtml: `
      <p>If this letter or conversation violates our guidelines, you can report it. Our team will review within 24 hours.</p>
      <p>Reports are anonymous. You can also block this sender from future letters.</p>
      <button type="button" class="btn-primary" id="modal-report-confirm">Report</button>
    `,
    onClose: () => {},
  });
}

export function openContactExchangeModal(onConfirm) {
  return openModal({
    title: 'Exchange contacts',
    bodyHtml: `
      <p><strong>Safety first.</strong> Only share contact details when you feel ready. We recommend meeting in a public place and telling someone you trust.</p>
      <p>Once you exchange contacts, this conversation can continue outside Harbor.</p>
      <button type="button" class="btn-primary" id="modal-contact-confirm">I understand, continue</button>
    `,
    onClose: () => {},
    onOpen: (sheet) => {
      sheet.querySelector('#modal-contact-confirm')?.addEventListener('click', () => {
        closeActive();
        onConfirm?.();
      });
    },
  });
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

// Report confirm is wired via onOpen in callers that need it
