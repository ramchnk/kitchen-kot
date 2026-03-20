import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { formatCurrency, formatDate, formatTime, todayISO, showToast, showModal, closeModal, printContent } from '../utils.js';

export async function renderExpensesView(container) {
    container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">payments</span>
        <div>
          <h2 class="view-title">Daily Expenses</h2>
          <p class="view-subtitle">Manage and track your restaurant's daily expenses</p>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="date-filter">
          <label class="form-label" style="margin:0;white-space:nowrap">Filter Date:</label>
          <input type="date" class="form-input" id="expense-filter-date" value="${todayISO()}">
        </div>
        <button class="btn btn-primary" id="btn-add-expense">
          <span class="material-symbols-outlined">add</span> Add Expense
        </button>
      </div>
    </div>

    <div class="stats-grid" id="expense-summary">
      <!-- Summary cards will be rendered here -->
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Expense Log</span>
        <div class="card-actions">
          <button class="btn btn-sm btn-secondary" id="btn-print-expenses">
            <span class="material-symbols-outlined">print</span> Print Report
          </button>
        </div>
      </div>
      <table class="data-table" id="expenses-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th class="text-right">Amount</th>
            ${Auth.isAdmin() ? '<th class="text-center">Actions</th>' : ''}
          </tr>
        </thead>
        <tbody id="expenses-list">
          <tr><td colspan="${Auth.isAdmin() ? 5 : 4}" class="text-center p-4">Loading expenses...</td></tr>
        </tbody>
      </table>
    </div>
  `;

    // Event Listeners
    document.getElementById('btn-add-expense')?.addEventListener('click', () => showAddExpenseModal(container));
    document.getElementById('expense-filter-date').onchange = () => loadExpenses(container);
    document.getElementById('btn-print-expenses').onclick = () => printExpenseReport();

    // Initial Load
    loadExpenses(container);
}

async function loadExpenses(container) {
    const filterDate = document.getElementById('expense-filter-date').value;
    
    // Fetch manual expenses
    const manualExpenses = await DB.getFiltered('expenses', {
        where: [['date', '==', filterDate]]
    });

    // Fetch wallet transaction expenses (Incentives)
    const walletPayments = await DB.getFiltered('walletTransactions', {
        where: [['date', '==', filterDate]]
    });
    
    const incentiveExpenses = walletPayments
        .filter(p => p.sourceId?.startsWith('INC-PAY-'))
        .map(p => ({
            id: p.id,
            category: 'Waiter Incentive',
            description: p.description,
            amount: p.amount,
            date: p.date,
            createdAt: p.createdAt,
            isLocked: true 
        }));

    const supplierExpenses = walletPayments
        .filter(p => p.type === 'purchase')
        .map(p => ({
            id: p.id,
            category: 'Supplier Payment',
            description: p.description,
            amount: p.amount,
            date: p.date,
            createdAt: p.createdAt,
            isLocked: true
        }));

    const allExpenses = [...manualExpenses, ...incentiveExpenses, ...supplierExpenses];
    allExpenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    renderExpensesList(container, allExpenses);
    renderSummary(container, allExpenses);
}

function renderExpensesList(container, expenses) {
    const tbody = document.getElementById('expenses-list');

    if (expenses.length === 0) {
        tbody.innerHTML = `
      <tr>
        <td colspan="${Auth.isAdmin() ? 5 : 4}">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">payments</span>
            <p>No expenses recorded for this date.</p>
          </div>
        </td>
      </tr>
    `;
        return;
    }

    tbody.innerHTML = expenses.map(e => `
    <tr>
      <td class="font-mono">
        <div>${formatDate(e.date)}</div>
        <div class="text-muted" style="font-size:0.75rem">${e.createdAt ? formatTime(e.createdAt) : '—'}</div>
      </td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.category}</span></td>
      <td><strong>${e.description}</strong></td>
      <td class="text-right amount font-mono">${formatCurrency(e.amount)}</td>
      ${Auth.isAdmin() ? `
      <td class="text-center">
        ${e.isLocked ? `
          <span class="material-symbols-outlined" title="Automatic Entry (${e.category})" style="font-size:18px;color:var(--text-muted)">lock</span>
        ` : `
          <button class="btn btn-sm btn-ghost btn-delete-expense" data-id="${e.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--danger)">delete</span>
          </button>
        `}
      </td>
      ` : ''}
    </tr>
  `).join('');

    // Wire up delete buttons
    tbody.querySelectorAll('.btn-delete-expense').forEach(btn => {
        btn.onclick = async () => {
            if (confirm('Are you sure you want to delete this expense?')) {
                const id = btn.dataset.id;
                await DB.remove('expenses', id);
                await DB.deleteWalletTransactionBySourceId(id);
                showToast('Expense deleted and wallet updated', 'success');
                loadExpenses(container);
            }
        };
    });
}

function renderSummary(container, expenses) {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const categories = {};
    expenses.forEach(e => {
        categories[e.category] = (categories[e.category] || 0) + Number(e.amount);
    });

    const summaryContainer = document.getElementById('expense-summary');
    summaryContainer.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon red"><span class="material-symbols-outlined">trending_down</span></div>
      <div>
        <div class="stat-value">${formatCurrency(total)}</div>
        <div class="stat-label">Total Expenses Today</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
      <div>
        <div class="stat-value">${Object.keys(categories).length}</div>
        <div class="stat-label">Categories Used</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
      <div>
        <div class="stat-value">${expenses.length}</div>
        <div class="stat-label">Total Entries</div>
      </div>
    </div>
  `;
}

function showAddExpenseModal(container) {
    const categories = ['Salary', 'Rent', 'Electricity', 'Cleaning', 'Grocery', 'Maintenance', 'Marketing', 'Taxes', 'Others'];

    const content = `
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-input" id="exp-category">
        ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <input type="text" class="form-input" id="exp-desc" placeholder="e.g. Milk for tea, Staff breakfast">
    </div>
    <div class="form-group">
      <label class="form-label">Amount (₹)</label>
      <input type="number" class="form-input" id="exp-amount" step="0.01" placeholder="0.00">
    </div>
    <div class="form-group">
      <label class="form-label">Date</label>
      <input type="date" class="form-input" id="exp-date" value="${todayISO()}">
    </div>
  `;

    const footer = `
    <button class="btn btn-secondary" id="btn-cancel-exp">Cancel</button>
    <button class="btn btn-primary" id="btn-save-exp">Save Expense</button>
  `;

    const modal = showModal('Add New Expense', content, { footer });

    document.getElementById('btn-cancel-exp').onclick = closeModal;
    document.getElementById('btn-save-exp').onclick = async () => {
        const category = document.getElementById('exp-category').value;
        const description = document.getElementById('exp-desc').value.trim();
        const amount = parseFloat(document.getElementById('exp-amount').value);
        const date = document.getElementById('exp-date').value;

        if (!description || isNaN(amount) || amount <= 0) {
            showToast('Please fill all fields accurately', 'error');
            return;
        }

        try {
            const expenseId = await DB.add('expenses', {
                category,
                description,
                amount,
                date,
                createdAt: new Date().toISOString()
            });

            // Record Wallet Transaction (Expense reduces wallet)
            await DB.recordWalletTransaction('expense', amount, `Expense: ${category} - ${description}`, expenseId, date);

            showToast('Expense recorded!', 'success');
            closeModal();
            loadExpenses(container);
        } catch (err) {
            console.error(err);
            showToast('Failed to record expense', 'error');
        }
    };
}

function printExpenseReport() {
    const dateStr = document.getElementById('expense-filter-date').value;
    const tbody = document.getElementById('expenses-list');
    const summaryCards = document.getElementById('expense-summary').innerHTML;

    // Clone the table to avoid modifying the UI
    const tableClone = document.getElementById('expenses-table').cloneNode(true);
    // Remove the actions column from clone ONLY if it exists (Admin role)
    if (Auth.isAdmin()) {
        tableClone.querySelectorAll('th:last-child, td:last-child').forEach(el => el.remove());
    }

    const printHTML = `
    <div class="print-header">
      <h2>Daily Expenses Report</h2>
      <p>Date: ${formatDate(dateStr)}</p>
    </div>
    <div style="margin-bottom: 20px;">
      ${summaryCards}
    </div>
    <div class="card">
       ${tableClone.outerHTML}
    </div>
    <div class="print-footer">
      <p>Report generated on ${new Date().toLocaleString()}</p>
    </div>
  `;

    // We need generic print styles for this, or just use the existing one
    printContent(printHTML, 'a4');
}
