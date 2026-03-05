// ===== Utility Functions =====

export function formatCurrency(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export function formatTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function isToday(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date();
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

export function debounce(fn, ms = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// Toast Notification System
export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined">${type === 'success' ? 'check_circle' :
      type === 'error' ? 'error' :
        type === 'warning' ? 'warning' :
          'info'
    }</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Modal System
export function showModal(title, contentHTML, options = {}) {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');

  if (options.large) {
    container.classList.add('modal-lg');
  } else {
    container.classList.remove('modal-lg');
  }

  content.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">${title}</h2>
      <button class="modal-close" id="modal-close-btn" title="Close (Esc)">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body">${contentHTML}</div>
    ${options.footer ? `<div class="modal-footer">${options.footer}</div>` : ''}
  `;

  overlay.classList.remove('hidden');

  // Close handlers
  const closeBtn = document.getElementById('modal-close-btn');
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Focus first input
  setTimeout(() => {
    const firstInput = content.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
  }, 100);

  return content;
}

export function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
  document.getElementById('modal-content').innerHTML = '';
}

// Print Helpers
export function printContent(html) {
  const container = document.getElementById('print-container');
  container.innerHTML = html;
  window.print();
  setTimeout(() => { container.innerHTML = ''; }, 1000);
}

export function generateKOTPrintHTML(order, supplierName, tableName) {
  const itemsHTML = order.items.map(item => `
    <tr>
      <td class="item-name">${item.itemName}</td>
      <td class="item-qty">${item.quantity}</td>
    </tr>
  `).join('');

  return `
    <div class="print-header">
      <h2>KITCHEN ORDER</h2>
    </div>
    <div class="print-kot-title">KOT #${order.orderNumber}</div>
    <div class="print-meta">
      <div><span>Table:</span><span><strong>${tableName}</strong></span></div>
      <div><span>Time:</span><span>${formatTime(order.createdAt)}</span></div>
      ${supplierName ? `<div><span>Waiter:</span><span>${supplierName}</span></div>` : ''}
    </div>
    <table class="print-kot-items">${itemsHTML}</table>
    <div class="print-footer">
      <p>--- Kitchen Copy ---</p>
    </div>
  `;
}

export function generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems) {
  const itemsHTML = counterItems.map(item => `
    <tr>
      <td class="item-name">${item.itemName}</td>
      <td class="item-qty">${item.quantity}</td>
    </tr>
  `).join('');

  return `
    <div class="print-header">
      <h2>COUNTER ORDER</h2>
    </div>
    <div class="print-kot-title">KOT #${order.orderNumber}</div>
    <div class="print-meta">
      <div><span>Table:</span><span><strong>${tableName}</strong></span></div>
      <div><span>Time:</span><span>${formatTime(order.createdAt)}</span></div>
      ${supplierName ? `<div><span>Waiter:</span><span>${supplierName}</span></div>` : ''}
    </div>
    <table class="print-kot-items">${itemsHTML}</table>
    <div class="print-footer">
      <p>--- Counter Copy ---</p>
    </div>
  `;
}

export function generateBillPrintHTML(order, supplierName, tableName) {
  const itemsHTML = order.items.map((item, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${item.itemName}</td>
      <td style="text-align:center">${item.quantity}</td>
      <td style="text-align:right">${formatCurrency(item.price)}</td>
      <td style="text-align:right">${formatCurrency(item.amount)}</td>
    </tr>
  `).join('');

  return `
    <div class="print-header">
      <h2>RESTAURANT</h2>
      <p>Thank you for dining with us!</p>
    </div>
    <div class="print-title">BILL</div>
    <div class="print-meta">
      <div><span>Bill No:</span><span>${order.orderNumber}</span></div>
      <div><span>Table:</span><span>${tableName}</span></div>
      <div><span>Date:</span><span>${formatDateTime(order.billedAt || order.createdAt)}</span></div>
      ${supplierName ? `<div><span>Waiter:</span><span>${supplierName}</span></div>` : ''}
    </div>
    <table class="print-items">
      <thead>
        <tr><th>#</th><th>Item</th><th>Qty</th><th>Rate</th><th>Amt</th></tr>
      </thead>
      <tbody>${itemsHTML}</tbody>
    </table>
    <div class="print-total">
      <div><span>Sub Total:</span><span>${formatCurrency(order.totalAmount)}</span></div>
      <div class="grand-total"><span>TOTAL:</span><span>${formatCurrency(order.totalAmount)}</span></div>
    </div>
    <div class="print-footer">
      <p>Thank you! Visit Again!</p>
    </div>
  `;
}

export function generateWaiterIncentivePrintHTML(waiterData, dateStr) {
  const formattedDate = formatDate(dateStr);

  const itemsHTML = Object.values(waiterData.items).map(item => `
    <tr>
      <td>${item.name}</td>
      <td style="text-align:center">${item.quantity}</td>
      <td style="text-align:right">${item.incentivePercent}%</td>
      <td style="text-align:right">${formatCurrency(item.incentiveAmount)}</td>
    </tr>
  `).join('');

  return `
    <div class="print-header">
      <h2>WAITER INCENTIVE</h2>
      <p>Daily Earnings Report</p>
    </div>
    <div class="print-title">${waiterData.name}</div>
    <div class="print-meta">
      <div><span>Date:</span><span>${formattedDate}</span></div>
      <div><span>Total Sales:</span><span>${formatCurrency(waiterData.totalSales)}</span></div>
    </div>
    <table class="print-items">
      <thead>
        <tr><th>Item</th><th>Qty</th><th>Inc%</th><th>Amount</th></tr>
      </thead>
      <tbody>${itemsHTML}</tbody>
    </table>
    <div class="print-total">
      <div><span>Total Sales:</span><span>${formatCurrency(waiterData.totalSales)}</span></div>
      <div class="grand-total"><span>INCENTIVE EARNED:</span><span>${formatCurrency(waiterData.totalIncentive)}</span></div>
    </div>
    <div class="print-footer">
      <p>--- Waiter Copy ---</p>
    </div>
  `;
}
