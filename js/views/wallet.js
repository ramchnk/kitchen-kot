// ===== Wallet View =====
import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { formatCurrency, formatDateTime, todayISO, showToast, showModal, closeModal } from '../utils.js';

export async function renderWalletView(container) {
  // 1. Fetch persistent totals from the dedicated summary record
  const walletSummary = await DB.getWalletSummary();
  
  // 2. Fetch history and account opening balance to compute running ledger
  const openingBalance = await DB.getAccountBalance();
  const allTransactions = await DB.getAll('walletTransactions');
  
  // Sort by date then createdAt to ensure logical flow and accurate running balance
  allTransactions.sort((a, b) => {
    const dateA = a.date || a.createdAt?.substring(0, 10);
    const dateB = b.date || b.createdAt?.substring(0, 10);
    if (dateA !== dateB) return dateA.localeCompare(dateB);
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  let currentLoopBalance = openingBalance;
  const ledger = allTransactions.map(t => {
    const op = currentLoopBalance;
    const numAmount = Number(t.amount || 0);
    if (t.type === 'income') {
      currentLoopBalance += numAmount;
    } else if (t.type === 'adjustment-surplus') {
      currentLoopBalance -= numAmount;
    } else {
      currentLoopBalance -= numAmount;
    }
    return { ...t, opening: op, closing: currentLoopBalance };
  });

  // Reverse ledger for display (newest first)
  const displayTransactions = [...ledger].reverse();

  const totalIncome = walletSummary.totalIncome || 0;
  const totalOutflow = walletSummary.totalOutflow || 0;
  const balance = walletSummary.currentBalance || 0;

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
        <button class="btn btn-secondary" id="btn-recalculate-wallet" title="Correct balance from history">
          <span class="material-symbols-outlined">refresh</span> Recalculate
        </button>
        <button class="btn btn-secondary" id="btn-add-wallet-entry">
          <span class="material-symbols-outlined">add</span> New Entry
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
          <h3 class="stat-value" style="color: #22c55e">${formatCurrency(totalIncome)}</h3>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444">
          <span class="material-symbols-outlined">trending_down</span>
        </div>
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value" style="color: #ef4444">${formatCurrency(totalOutflow)}</h3>
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
          <span style="font-size: 0.85rem; color: var(--text-muted)">From</span>
          <div class="form-group" style="margin:0; width:130px">
            <input type="date" class="form-input" id="filter-wallet-from" title="From Date">
          </div>
          <span style="font-size: 0.85rem; color: var(--text-muted)">To</span>
          <div class="form-group" style="margin:0; width:130px">
            <input type="date" class="form-input" id="filter-wallet-to" title="To Date">
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
            <th class="text-right">Opening Bal</th>
            <th class="text-right">Amount</th>
            <th class="text-right">Closing Bal</th>
            ${Auth.isAdmin() ? '<th class="text-center">Actions</th>' : ''}
          </tr>
        </thead>
        <tbody id="wallet-transactions-body">
          ${renderTransactionRows(displayTransactions.slice(0, 100), openingBalance)}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('btn-recalculate-wallet')?.addEventListener('click', async () => {
    if (confirm('Recalculate wallet totals from entire transaction history? This will fix any balance discrepancies.')) {
      showToast('Recalculating...', 'info');
      await DB.recalculateWalletTotals();
      showToast('Wallet balance corrected!', 'success');
      renderWalletView(container);
    }
  });
  document.getElementById('btn-add-wallet-entry')?.addEventListener('click', () => showAddEntryModal(container));
  document.getElementById('btn-withdraw')?.addEventListener('click', () => showWithdrawModal(container, balance));
  
  // Wire up delete buttons
  container.querySelectorAll('.btn-delete-wallet-txn').forEach(btn => {
    btn.onclick = async () => {
      if (confirm('Are you sure you want to permanently delete this wallet record? The balance will be adjusted accordingly.')) {
        try {
          await DB.deleteWalletTransaction(btn.dataset.id);
          showToast('Record deleted and balance updated', 'success');
          renderWalletView(container);
        } catch (err) {
          showToast('Error: ' + err.message, 'error');
        }
      }
    };
  });

  attachWalletFilters(container, ledger, openingBalance);
}

function showAddEntryModal(container) {
  showModal('Add Manual Entry', `
    <div class="form-group">
      <label class="form-label">Type *</label>
      <select class="form-select" id="modal-entry-type">
        <option value="income">Income (Cash In)</option>
        <option value="expense">Expense (Cash Out)</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Amount *</label>
      <input type="number" class="form-input" id="modal-entry-amount" placeholder="0.00" min="0.01" step="0.01">
    </div>
    <div class="form-group">
      <label class="form-label">Description *</label>
      <input type="text" class="form-input" id="modal-entry-desc" placeholder="e.g. Staff Deduction, Cash Injection">
    </div>
    <div class="form-group">
      <label class="form-label">Date *</label>
      <input type="date" class="form-input" id="modal-entry-date" value="${todayISO()}">
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="btn-save-entry">Save Entry</button>
    `
  });

  document.getElementById('btn-save-entry')?.addEventListener('click', async () => {
    const type = document.getElementById('modal-entry-type').value;
    const amount = parseFloat(document.getElementById('modal-entry-amount').value);
    const desc = document.getElementById('modal-entry-desc').value.trim();

    if (isNaN(amount) || amount <= 0) { showToast('Enter a valid amount', 'error'); return; }
    if (!desc) { showToast('Description is required', 'error'); return; }

    try {
      const date = document.getElementById('modal-entry-date').value;
      await DB.recordWalletTransaction(type, amount, desc, null, date);
      showToast('Entry recorded successfully', 'success');
      closeModal();
      renderWalletView(container);
    } catch (err) {
      showToast('Failed to record: ' + err.message, 'error');
    }
  });
}

function renderTransactionRows(transactions, initialOpeningBalance) {
  let rows = '';

  // Only show the global opening balance if we are at the very end of the list (oldest items)
  // or if we explicitly passed it in for a small list. 
  // However, with the new ledger logic, every row has its own opening/closing.

  if (transactions.length === 0) {
    return `<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found</p></div></td></tr>`;
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
              <td class="text-right font-mono" style="color:var(--text-muted)">${formatCurrency(t.opening)}</td>
              <td class="text-right font-mono" style="font-weight:700; color:${isPositive ? '#22c55e' : '#ef4444'}">
                ${isPositive ? '+' : '-'}${formatCurrency(t.amount)}
              </td>
              <td class="text-right font-mono" style="font-weight:700;color:var(--text-primary)">${formatCurrency(t.closing)}</td>
              ${Auth.isAdmin() ? `
              <td class="text-center">
                <button class="btn btn-sm btn-ghost text-danger btn-delete-wallet-txn" data-id="${t.id}" title="Delete Record">
                  <span class="material-symbols-outlined" style="font-size:18px">delete</span>
                </button>
              </td>
              ` : ''}
            </tr>`;
  }).join('');

  return rows;
}

// In the main renderWalletView function, I need to add the header for the Actions column
// Let's find where the table head is.

function attachWalletFilters(container, ledger, openingBalance) {
  const fromInput = document.getElementById('filter-wallet-from');
  const toInput = document.getElementById('filter-wallet-to');
  const typeSelect = document.getElementById('filter-wallet-type');
  const clearBtn = document.getElementById('btn-clear-wallet-filters');
  const tbody = document.getElementById('wallet-transactions-body');

  const updateFilters = async () => {
    const fromVal = fromInput.value;
    const toVal = toInput.value;
    const typeVal = typeSelect.value;

    // Immediately show loading
    tbody.innerHTML = '<tr><td colspan="7" class="text-center p-4"><span class="material-symbols-outlined spinning">sync</span> Searching...</td></tr>';

    let filtered = [...ledger];

    if (fromVal) {
      filtered = filtered.filter(t => {
        const itemDate = t.date || (t.createdAt ? t.createdAt.split('T')[0] : '');
        return itemDate >= fromVal;
      });
    }

    if (toVal) {
      filtered = filtered.filter(t => {
        const itemDate = t.date || (t.createdAt ? t.createdAt.split('T')[0] : '');
        return itemDate <= toVal;
      });
    }

    // Apply Type Filter
    if (typeVal !== 'all') {
      if (typeVal === 'debit') {
        filtered = filtered.filter(t => t.type !== 'income');
      } else {
        filtered = filtered.filter(t => t.type === typeVal);
      }
    }

    // Always sort by time (newest first for display)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Render results
     if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state"><span class="material-symbols-outlined">history</span><p>No transactions found for this selection</p></div></td></tr>';
     } else {
        tbody.innerHTML = renderTransactionRows(filtered, openingBalance);
        // Re-wire delete buttons for filtered results
        tbody.querySelectorAll('.btn-delete-wallet-txn').forEach(btn => {
          btn.onclick = async () => {
            if (confirm('Are you sure you want to delete this record?')) {
               await DB.deleteWalletTransaction(btn.dataset.id);
               showToast('Record deleted', 'success');
               renderWalletView(container);
            }
          };
        });
     }
   };

  fromInput?.addEventListener('change', updateFilters);
  toInput?.addEventListener('change', updateFilters);
  typeSelect?.addEventListener('change', updateFilters);
  clearBtn?.addEventListener('click', () => {
    fromInput.value = '';
    toInput.value = '';
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
    <div class="form-group">
      <label class="form-label">Withdrawal Date *</label>
      <input type="date" class="form-input" id="modal-withdraw-date" value="${todayISO()}">
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
      const date = document.getElementById('modal-withdraw-date').value;
      await DB.recordWalletTransaction('withdrawal', amount, `Withdrawal: ${desc}`, null, date);
      showToast('Withdrawal recorded successfully', 'success');
      closeModal();
      renderWalletView(container);
    } catch (err) {
      showToast('Failed to record withdrawal: ' + err.message, 'error');
    }
  });
}
