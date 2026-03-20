import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { formatCurrency, formatDate, formatDateTime, showToast, showModal, closeModal } from '../utils.js';

export async function renderGrocerySuppliersView(container) {
  const suppliers = await DB.getAll('grocerySuppliers');
  const bills = await DB.getAll('supplierBills');
  const payments = await DB.getAll('supplierPayments');

  // Calculate outstanding per supplier
  const supplierOutstanding = {};
  suppliers.forEach(s => {
    const supplierBills = bills.filter(b => b.supplierId === s.id);
    const supplierPayments = payments.filter(p => p.supplierId === s.id);
    const totalBilled = supplierBills.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const totalPaid = supplierPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    supplierOutstanding[s.id] = { totalBilled, totalPaid, outstanding: totalBilled - totalPaid, billCount: supplierBills.length };
  });

  const totalOutstanding = Object.values(supplierOutstanding).reduce((s, o) => s + o.outstanding, 0);
  const totalBilled = Object.values(supplierOutstanding).reduce((s, o) => s + o.totalBilled, 0);
  const totalPaid = Object.values(supplierOutstanding).reduce((s, o) => s + o.totalPaid, 0);

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">local_shipping</span>
        <div>
          <h2 class="view-title">Suppliers</h2>
          <p class="view-subtitle">${suppliers.length} supplier(s) • Grocery & Material Vendors</p>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        ${Auth.isAdmin() ? `
        <button class="btn btn-primary" id="btn-add-gsupplier">
          <span class="material-symbols-outlined">add</span> Add Supplier
        </button>
        ` : ''}
      </div>
    </div>

    <!-- Outstanding Summary Cards -->
    <div class="stats-grid" style="margin-bottom:16px">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${formatCurrency(totalBilled)}</div><div class="stat-label">Total Billed</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${formatCurrency(totalPaid)}</div><div class="stat-label">Total Paid</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ${totalOutstanding > 0 ? 'orange' : 'green'}"><span class="material-symbols-outlined">account_balance_wallet</span></div>
        <div><div class="stat-value">${formatCurrency(totalOutstanding)}</div><div class="stat-label">Outstanding</div></div>
      </div>
    </div>

    <!-- Supplier List -->
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th class="text-right">Total Billed</th>
            <th class="text-right">Paid</th>
            <th class="text-right">Outstanding</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${suppliers.length === 0 ? `
            <tr><td colspan="8"><div class="empty-state"><span class="material-symbols-outlined">local_shipping</span><p>No suppliers added yet</p></div></td></tr>
          ` : suppliers.map(s => {
    const out = supplierOutstanding[s.id] || { totalBilled: 0, totalPaid: 0, outstanding: 0 };
    return `
            <tr>
              <td class="text-muted">${s.id}</td>
              <td><strong>${s.name}</strong>${s.gstNumber ? `<br><span class="text-muted" style="font-size:0.75rem">GST: ${s.gstNumber}</span>` : ''}</td>
              <td>${s.contact || '—'}</td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.address || '—'}</td>
              <td class="text-right font-mono">${formatCurrency(out.totalBilled)}</td>
              <td class="text-right font-mono text-success">${formatCurrency(out.totalPaid)}</td>
              <td class="text-right font-mono ${out.outstanding > 0 ? 'text-danger' : 'text-success'}" style="font-weight:600">
                ${formatCurrency(out.outstanding)}
              </td>
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-success btn-add-payment" data-id="${s.id}" title="Add Payment">
                    <span class="material-symbols-outlined" style="font-size:14px">payments</span>
                  </button>
                  <button class="btn btn-sm btn-ghost btn-view-ledger" data-id="${s.id}" title="View Ledger">
                    <span class="material-symbols-outlined" style="font-size:14px">account_balance</span>
                  </button>
                  ${Auth.isAdmin() ? `
                  <button class="btn btn-sm btn-ghost btn-edit-gsupplier" data-id="${s.id}" title="Edit">
                    <span class="material-symbols-outlined" style="font-size:14px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-gsupplier" data-id="${s.id}" title="Delete">
                    <span class="material-symbols-outlined" style="font-size:14px">delete</span>
                  </button>
                  ` : ''}
                </div>
              </td>
            </tr>
          `;
  }).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Add supplier
  document.getElementById('btn-add-gsupplier')?.addEventListener('click', () => showSupplierForm(null, container));

  // Edit
  container.querySelectorAll('.btn-edit-gsupplier').forEach(btn => {
    btn.addEventListener('click', async () => {
      const s = await DB.getById('grocerySuppliers', parseInt(btn.dataset.id));
      if (s) showSupplierForm(s, container);
    });
  });

  // Delete
  container.querySelectorAll('.btn-delete-gsupplier').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const s = await DB.getById('grocerySuppliers', id);
      if (s && confirm(`Delete supplier "${s.name}"?`)) {
        await DB.remove('grocerySuppliers', id);
        showToast(`"${s.name}" deleted`, 'warning');
        renderGrocerySuppliersView(container);
      }
    });
  });


  // Add Payment
  container.querySelectorAll('.btn-add-payment').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const s = await DB.getById('grocerySuppliers', id);
      const out = supplierOutstanding[id] || { outstanding: 0 };
      if (s) showPaymentForm(s, out.outstanding, container);
    });
  });

  // View Ledger
  container.querySelectorAll('.btn-view-ledger').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const s = await DB.getById('grocerySuppliers', id);
      if (s) showLedger(s, container);
    });
  });
}

// ---- Supplier Form ----
function showSupplierForm(supplier, container) {
  const isEdit = !!supplier;

  showModal(isEdit ? 'Edit Supplier' : 'Add New Supplier', `
    <div class="form-group">
      <label class="form-label">Supplier Name *</label>
      <input type="text" class="form-input" id="modal-gs-name" value="${supplier?.name || ''}" placeholder="e.g. Metro Wholesale">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Contact Number</label>
        <input type="text" class="form-input" id="modal-gs-contact" value="${supplier?.contact || ''}" placeholder="Phone number">
      </div>
      <div class="form-group">
        <label class="form-label">GST Number</label>
        <input type="text" class="form-input" id="modal-gs-gst" value="${supplier?.gstNumber || ''}" placeholder="GST number (optional)">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Address</label>
      <input type="text" class="form-input" id="modal-gs-address" value="${supplier?.address || ''}" placeholder="Address">
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-gs-active" ${supplier?.active !== false ? 'checked' : ''}>
      <label for="modal-gs-active">Active</label>
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-gs-save"><span class="material-symbols-outlined">save</span> ${isEdit ? 'Update' : 'Save'}</button>
    `
  });

  document.getElementById('modal-gs-save')?.addEventListener('click', async () => {
    const name = document.getElementById('modal-gs-name').value.trim();
    if (!name) { showToast('Supplier name is required', 'error'); return; }

    const data = {
      name,
      contact: document.getElementById('modal-gs-contact').value.trim(),
      gstNumber: document.getElementById('modal-gs-gst').value.trim(),
      address: document.getElementById('modal-gs-address').value.trim(),
      active: document.getElementById('modal-gs-active').checked,
      createdAt: supplier?.createdAt || new Date().toISOString(),
    };

    if (isEdit) { data.id = supplier.id; await DB.update('grocerySuppliers', data); showToast(`"${name}" updated`, 'success'); }
    else { await DB.add('grocerySuppliers', data); showToast(`"${name}" added`, 'success'); }

    closeModal();
    renderGrocerySuppliersView(container);
  });
}

// ---- Bill Form ----
function showBillForm(supplier, container) {
  const today = new Date().toISOString().split('T')[0];

  showModal(`Add Bill — ${supplier.name}`, `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Bill Number *</label>
        <input type="text" class="form-input" id="modal-bill-number" placeholder="INV-001">
      </div>
      <div class="form-group">
        <label class="form-label">Bill Date *</label>
        <input type="date" class="form-input" id="modal-bill-date" value="${today}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input type="text" class="form-input" id="modal-bill-desc" placeholder="e.g. Vegetables, Chicken, Spices...">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Bill Amount (₹) *</label>
        <input type="number" class="form-input" id="modal-bill-amount" min="0" step="0.01" placeholder="0.00" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input type="text" class="form-input" id="modal-bill-notes" placeholder="Optional notes">
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-warning" id="modal-bill-save"><span class="material-symbols-outlined">receipt</span> Add Bill</button>
    `
  });

  document.getElementById('modal-bill-save')?.addEventListener('click', async () => {
    const billNumber = document.getElementById('modal-bill-number').value.trim();
    const billDate = document.getElementById('modal-bill-date').value;
    const totalAmount = parseFloat(document.getElementById('modal-bill-amount').value) || 0;

    if (!billNumber || !billDate || totalAmount <= 0) {
      showToast('Please fill bill number, date, and amount', 'error');
      return;
    }

    const bill = {
      supplierId: supplier.id,
      billNumber,
      billDate,
      description: document.getElementById('modal-bill-desc').value.trim(),
      totalAmount,
      notes: document.getElementById('modal-bill-notes').value.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await DB.add('supplierBills', bill);
    showToast(`Bill ${billNumber} added for ${supplier.name} — ${formatCurrency(totalAmount)}`, 'success');
    closeModal();
    renderGrocerySuppliersView(container);
  });
}

// ---- Payment Form ----
function showPaymentForm(supplier, outstanding, container) {
  const today = new Date().toISOString().split('T')[0];

  showModal(`Record Payment — ${supplier.name}`, `
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label" style="font-size:0.9rem">Outstanding Balance</span>
      <span class="summary-value ${outstanding > 0 ? 'text-danger' : 'text-success'}" style="font-size:1.2rem;font-weight:700;font-family:'JetBrains Mono',monospace">
        ${formatCurrency(outstanding)}
      </span>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Payment Amount (₹) *</label>
        <input type="number" class="form-input" id="modal-pay-amount" min="0" step="0.01" placeholder="0.00" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem">
      </div>
      <div class="form-group">
        <label class="form-label">Payment Date *</label>
        <input type="date" class="form-input" id="modal-pay-date" value="${today}">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Payment Mode</label>
      <select class="form-select" id="modal-pay-mode">
        <option value="cash">Cash</option>
        <option value="bank">Bank Transfer</option>
        <option value="upi">UPI</option>
        <option value="cheque">Cheque</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input type="text" class="form-input" id="modal-pay-notes" placeholder="Optional reference or notes">
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-success" id="modal-pay-save"><span class="material-symbols-outlined">payments</span> Record Payment</button>
    `
  });

  document.getElementById('modal-pay-save')?.addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('modal-pay-amount').value) || 0;
    const paymentDate = document.getElementById('modal-pay-date').value;

    if (amount <= 0 || !paymentDate) {
      showToast('Please enter amount and date', 'error');
      return;
    }

    const payment = {
      supplierId: supplier.id,
      billId: null,
      amount,
      paymentDate,
      paymentMode: document.getElementById('modal-pay-mode').value,
      notes: document.getElementById('modal-pay-notes').value.trim(),
      createdAt: new Date().toISOString(),
    };

    const paymentId = await DB.add('supplierPayments', payment);

    // Record Wallet Transaction (Payment reduces wallet)
    await DB.recordWalletTransaction('purchase', amount, `Supplier Payment: ${supplier.name} (${payment.paymentMode.toUpperCase()})`, paymentId, paymentDate);

    showToast(`Payment of ${formatCurrency(amount)} recorded for ${supplier.name}`, 'success');
    closeModal();
    renderGrocerySuppliersView(container);
  });
}

// ---- Ledger View ----
async function showLedger(supplier, container) {
  const bills = (await DB.getAll('supplierBills')).filter(b => b.supplierId === supplier.id);
  const payments = (await DB.getAll('supplierPayments')).filter(p => p.supplierId === supplier.id);

  // Combine and sort chronologically
  const entries = [
    ...bills.map(b => ({ type: 'bill', date: b.billDate, ref: b.billNumber, description: b.description || 'Bill', amount: b.totalAmount, id: b.id, createdAt: b.createdAt })),
    ...payments.map(p => ({ type: 'payment', date: p.paymentDate, ref: p.paymentMode?.toUpperCase(), description: p.notes || 'Payment', amount: p.amount, id: p.id, createdAt: p.createdAt })),
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Build running balance
  let runningBalance = 0;
  const ledgerRows = entries.map(entry => {
    if (entry.type === 'bill') {
      runningBalance += entry.amount;
    } else {
      runningBalance -= entry.amount;
    }
    return { ...entry, balance: runningBalance };
  });

  const totalBilled = bills.reduce((s, b) => s + b.totalAmount, 0);
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);
  const outstanding = totalBilled - totalPaid;

  showModal(`Ledger — ${supplier.name}`, `
    <div class="stats-grid" style="margin-bottom:12px;grid-template-columns:repeat(3,1fr)">
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value" style="font-size:1rem">${formatCurrency(totalBilled)}</div><div class="stat-label">Billed</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value text-success" style="font-size:1rem">${formatCurrency(totalPaid)}</div><div class="stat-label">Paid</div></div>
      </div>
      <div class="stat-card" style="padding:12px">
        <div><div class="stat-value ${outstanding > 0 ? 'text-danger' : 'text-success'}" style="font-size:1rem">${formatCurrency(outstanding)}</div><div class="stat-label">Outstanding</div></div>
      </div>
    </div>

    ${ledgerRows.length === 0 ? '<div class="empty-state" style="padding:30px"><p>No transactions recorded</p></div>' : `
    <div style="max-height:400px;overflow-y:auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Reference</th>
            <th>Description</th>
            <th class="text-right">Debit</th>
            <th class="text-right">Credit</th>
            <th class="text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          ${ledgerRows.map(row => `
            <tr>
              <td class="text-muted">${formatDate(row.date)}</td>
              <td>
                <span class="order-info-badge ${row.type === 'bill' ? 'badge-kot' : 'badge-bill'}" style="font-size:0.7rem">
                  ${row.type === 'bill' ? '📄 BILL' : '💰 PAID'}
                </span>
              </td>
              <td><strong>${row.ref}</strong></td>
              <td class="text-muted" style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${row.description}</td>
              <td class="text-right font-mono ${row.type === 'bill' ? 'text-danger' : ''}">${row.type === 'bill' ? formatCurrency(row.amount) : '—'}</td>
              <td class="text-right font-mono ${row.type === 'payment' ? 'text-success' : ''}">${row.type === 'payment' ? formatCurrency(row.amount) : '—'}</td>
              <td class="text-right font-mono" style="font-weight:600;color:${row.balance > 0 ? 'var(--danger)' : 'var(--success)'}">${formatCurrency(row.balance)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    `}
  `, { large: true });
}
