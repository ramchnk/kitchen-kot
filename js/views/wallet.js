// ===== Wallet View =====
import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { formatCurrency, formatDateTime, showToast, showModal, closeModal } from '../utils.js';

export async function renderWalletView(container) {
  const transactions = await DB.getAll('walletTransactions');
  transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const account = Auth.getCurrentAccount();
  const openingBalance = Number(account?.walletBalance || 0);

  const totals = transactions.reduce((acc, t) => {
    if (t.type === 'income') acc.income += t.amount;
    else acc.expense += t.amount;
    return acc;
  }, { income: 0, expense: 0 });

  const balance = openingBalance + totals.income - totals.expense;

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">account_balance_wallet</span>
        <div>
          <h2 class="view-title">Wallet Management</h2>
          <p class="view-subtitle">Cash flow tracking and withdrawals</p>
        </div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-secondary" id="btn-refresh-wallet">
          <span class="material-symbols-outlined">refresh</span>
        </button>
        ${Auth.isAdmin() ? `
        <button class="btn btn-primary" id="btn-withdraw">
          <span class="material-symbols-outlined">outbox</span> Withdraw Cash
        </button>
        ` : ''}
      </div>
    </div>

    <div class="stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 24px;">
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(34, 197, 94, 0.1); color: #22c55e">
          <span class="material-symbols-outlined">trending_up</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Income</p>
          <h3 class="stat-value" style="color: #22c55e">${formatCurrency(totals.income)}</h3>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
          <span class="material-symbols-outlined">trending_down</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value" style="color: #ef4444">${formatCurrency(totals.expense)}</h3>
        </div>
      </div>
      <div class="stat-card" style="border: 2px solid var(--accent-primary)">
        <div class="stat-icon" style="background: var(--accent-primary-transparent); color: var(--accent-primary)">
          <span class="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Available Balance</p>
          <h3 class="stat-value">${formatCurrency(balance)}</h3>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="flex-wrap: wrap; gap: 15px;">
        <h3 class="card-title">Transaction History</h3>
        <div style="display:flex; gap:10px; align-items:center;">
          <div class="form-group" style="margin:0; width:150px">
            <input type="date" class="form-input" id="filter-wallet-date" title="Filter by Date">
          </div>
          <div class="form-group" style="margin:0; width:150px">
            <select class="form-select" id="filter-wallet-type">
              <option value="all">All Types</option>
              <option value="income">Credits (Bills)</option>
              <option value="debit">Debits (All Outflows)</option>
              <option value="expense">Expenses Only</option>
              <option value="purchase">Purchases Only</option>
              <option value="withdrawal">Withdrawals Only</option>
            </select>
          </div>
          <button class="btn btn-sm btn-ghost" id="btn-clear-wallet-filters">Clear</button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Description</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody id="wallet-transactions-body">
          ${renderTransactionRows(transactions, openingBalance)}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('btn-refresh-wallet')?.addEventListener('click', () => renderWalletView(container));
  document.getElementById('btn-withdraw')?.addEventListener('click', () => showWithdrawModal(container, balance));
  attachWalletFilters(container, transactions, openingBalance);
}

function renderTransactionRows(transactions, openingBalance) {
  let rows = '';

  if (openingBalance > 0) {
    rows += `
            <tr style="background: var(--bg-surface)">
              <td class="text-muted">—</td>
              <td><span class="status-badge" style="background:rgba(59, 130, 246, 0.1); color:#3b82f6">OPENING</span></td>
              <td><div style="font-weight:600">Initial Balance (From Database)</div></td>
              <td class="text-right font-mono" style="font-weight:700; color:#3b82f6">+${formatCurrency(openingBalance)}</td>
            </tr>
        `;
  }

  if (transactions.length === 0 && openingBalance === 0) {
    return `<tr><td colspan="4"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found</p></div></td></tr>`;
  }

  rows += transactions.map(t => {
    const isPositive = t.type === 'income';
    return `
            <tr>
              <td class="text-muted" style="white-space:nowrap">${formatDateTime(t.createdAt)}</td>
              <td>
                <span class="status-badge" style="background:${isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; color:${isPositive ? '#22c55e' : '#ef4444'}">
                  ${t.type.toUpperCase()}
                </span>
              </td>
              <td>
                <div style="font-weight:600">${t.description}</div>
                ${t.sourceId ? `<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">Ref ID: ${t.sourceId}</div>` : ''}
              </td>
              <td class="text-right font-mono" style="font-weight:700; color:${isPositive ? '#22c55e' : '#ef4444'}">
                ${isPositive ? '+' : '-'}${formatCurrency(t.amount)}
              </td>
            </tr>`;
  }).join('');

  return rows;
}

function attachWalletFilters(container, allTransactions, openingBalance) {
  const dateInput = document.getElementById('filter-wallet-date');
  const typeSelect = document.getElementById('filter-wallet-type');
  const clearBtn = document.getElementById('btn-clear-wallet-filters');
  const tbody = document.getElementById('wallet-transactions-body');

  const updateFilters = () => {
    const dateVal = dateInput.value;
    const typeVal = typeSelect.value;

    let filtered = allTransactions;

    // Apply Date Filter
    if (dateVal) {
      filtered = filtered.filter(t => (t.date || t.createdAt || '').startsWith(dateVal));
    }

    // Apply Type Filter
    if (typeVal !== 'all') {
      if (typeVal === 'debit') {
        filtered = filtered.filter(t => t.type !== 'income');
      } else {
        filtered = filtered.filter(t => t.type === typeVal);
      }
    }

    // When filtering, we usually don't want the opening balance stuck at the top if it doesn't match the date
    // But if all filters are cleared, we show it.
    const showOpening = !dateVal && (typeVal === 'all' || typeVal === 'income');
    tbody.innerHTML = renderTransactionRows(filtered, showOpening ? openingBalance : 0);
  };

  dateInput?.addEventListener('change', updateFilters);
  typeSelect?.addEventListener('change', updateFilters);
  clearBtn?.addEventListener('click', () => {
    dateInput.value = '';
    typeSelect.value = 'all';
    updateFilters();
  });
}

function showWithdrawModal(container, currentBalance) {
  showModal('Withdraw Cash', `
    <div class="form-group">
      <label class="form-label">Available Balance: <strong>${formatCurrency(currentBalance)}</strong></label>
    </div>
    <div class="form-group">
      <label class="form-label">Withdrawal Amount *</label>
      <input type="number" class="form-input" id="modal-withdraw-amount" placeholder="0.00" min="0.01" max="${currentBalance}" step="0.01">
    </div>
    <div class="form-group">
      <label class="form-label">Description / Purpose *</label>
      <input type="text" class="form-input" id="modal-withdraw-desc" placeholder="e.g. Bank deposit, Personal use">
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-withdrawal">Confirm Withdrawal</button>
    `
  });

  document.getElementById('btn-save-withdrawal')?.addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('modal-withdraw-amount').value);
    const desc = document.getElementById('modal-withdraw-desc').value.trim();

    if (isNaN(amount) || amount <= 0) {
      showToast('Enter a valid amount', 'error');
      return;
    }
    if (amount > currentBalance) {
      showToast('Insufficient wallet balance', 'error');
      return;
    }
    if (!desc) {
      showToast('Description is required', 'error');
      return;
    }

    try {
      await DB.recordWalletTransaction('withdrawal', amount, `Withdrawal: ${desc}`);
      showToast('Withdrawal recorded successfully', 'success');
      closeModal();
      renderWalletView(container);
    } catch (err) {
      showToast('Failed to record withdrawal: ' + err.message, 'error');
    }
  });
}
