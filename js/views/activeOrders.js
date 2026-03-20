import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { formatCurrency, formatDateTime, showToast, showModal, closeModal, printContent, generateKOTPrintHTML, generateCounterKOTPrintHTML, generateBillPrintHTML, isCounterItem } from '../utils.js';

export async function renderActiveOrdersView(container) {
  const orders = (await DB.getByIndex('orders', 'status', 'open'))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const suppliers = await DB.getAll('suppliers');
  const tables = await DB.getAll('tables');
  const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s.name]));
  const tableMap = Object.fromEntries(tables.map(t => [t.id, t.name]));

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">pending_actions</span>
        <div>
          <h2 class="view-title">Active Orders</h2>
          <p class="view-subtitle">${orders.length} open order(s)</p>
        </div>
      </div>
      <button class="btn btn-secondary" id="btn-refresh-active">
        <span class="material-symbols-outlined">refresh</span> Refresh
      </button>
    </div>

    ${orders.length === 0 ? `
      <div class="empty-state">
        <span class="material-symbols-outlined">check_circle</span>
        <p>No active orders. All clear!</p>
      </div>
    ` : `
      <div class="card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Waiter</th>
              <th>Table</th>
              <th>Items</th>
              <th class="text-right">Total</th>
              <th>Time</th>
              <th>Type</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(order => `
              <tr>
                <td><strong class="text-accent">${order.orderNumber}</strong></td>
                <td>${supplierMap[order.supplierId] || '—'}</td>
                <td>${tableMap[order.tableId] || '—'}</td>
                <td>${order.items.length} items</td>
                <td class="text-right amount">${formatCurrency(order.totalAmount)}</td>
                <td class="text-muted">${formatDateTime(order.createdAt)}</td>
                <td><span class="order-info-badge badge-kot">${order.type?.toUpperCase() || 'KOT'}</span></td>
                <td class="text-center">
                  <div style="display:flex;gap:6px;justify-content:center">
                    <button class="btn btn-sm btn-success btn-convert-bill" data-id="${order.id}" title="Convert to Bill">
                      <span class="material-symbols-outlined" style="font-size:16px">receipt</span> Bill
                    </button>
                    <button class="btn btn-sm btn-ghost btn-view-order" data-id="${order.id}" title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${Auth.isAdmin() ? `
                    <button class="btn btn-sm btn-ghost btn-reprint-kot" data-id="${order.id}" title="Reprint KOT">
                      <span class="material-symbols-outlined" style="font-size:16px">print</span> Reprint
                    </button>
                    <button class="btn btn-sm btn-ghost text-danger btn-cancel-order" data-id="${order.id}" title="Cancel Order">
                      <span class="material-symbols-outlined" style="font-size:16px">cancel</span>
                    </button>
                    ` : ''}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;

  // Refresh
  document.getElementById('btn-refresh-active')?.addEventListener('click', () => renderActiveOrdersView(container));

  // Convert to bill
  container.querySelectorAll('.btn-convert-bill').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const order = await DB.getById('orders', id);
      if (!order) return;

      const now = new Date().toISOString();
      const today = now.substring(0, 10); // YYYY-MM-DD

      const totals = order.items.reduce((acc, item) => {
        acc.subTotal += (item.amount || 0);
        return acc;
      }, { subTotal: 0 });

      order.status = 'billed';
      order.billedAt = now;
      order.date = today;
      order.subTotal = totals.subTotal;
      order.totalAmount = totals.subTotal; // Assuming no AC charge for now as per calculateTotals
      await DB.update('orders', order);

      // Update ingredient consumption
      for (const orderItem of order.items) {
        const recipes = await DB.getByIndex('itemIngredients', 'itemId', orderItem.itemId);
        for (const recipe of recipes) {
          const ingredient = await DB.getById('ingredients', recipe.ingredientId);
          if (ingredient) {
            const consumed = recipe.quantity * orderItem.quantity;
            ingredient.currentStock = Math.max(0, (ingredient.currentStock || 0) - consumed);
            await DB.update('ingredients', ingredient);
          }
        }
      }

      // Print bill
      const supplier = order.supplierId ? supplierMap[order.supplierId] : '';
      const table = order.tableId ? tableMap[order.tableId] : 'N/A';
      const printHTML = generateBillPrintHTML(order, supplier, table);
      printContent(printHTML);

      // Record Wallet Transaction (Income adds to wallet, excluding LIQUOR items only)
      const isLiquor = (item) => (item.category || '').toUpperCase().trim() === 'LIQUOR' || item.isLiquor;
      const nonLiquorSubtotal = order.items
        .filter(item => !isLiquor(item))
        .reduce((sum, item) => sum + item.amount, 0);

      if (nonLiquorSubtotal > 0) {
        const subTotal = order.subTotal || order.items.reduce((sum, item) => sum + item.amount, 0);
        const acCharge = order.acCharge || 0;
        const proportionalAc = subTotal > 0 ? (nonLiquorSubtotal / subTotal) * acCharge : 0;
        const walletAmount = nonLiquorSubtotal + proportionalAc;
        await DB.recordWalletTransaction('income', walletAmount, `Bill Income: #${order.orderNumber}`, order.id, order.date);
      }

      showToast(`Order #${order.orderNumber} billed!`, 'success');
      renderActiveOrdersView(container);
    });
  });

  // Reprint KOT (Admin Only)
  container.querySelectorAll('.btn-reprint-kot').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!Auth.isAdmin()) {
        showToast('Only admins can reprint KOT', 'error');
        return;
      }

      const id = parseInt(btn.dataset.id);
      const order = await DB.getById('orders', id);
      if (!order) return;

      const supplierName = supplierMap[order.supplierId] || '';
      const tableName = tableMap[order.tableId] || 'N/A';

      const kitchenItems = order.items.filter(item => !isCounterItem(item));
      const counterItems = order.items.filter(item => isCounterItem(item));

      if (kitchenItems.length > 0) {
        const kitchenOrder = { ...order, items: kitchenItems };
        printContent(generateKOTPrintHTML(kitchenOrder, supplierName, tableName));
      }

      if (counterItems.length > 0) {
        // Delay slighty if both are printed to avoid print dialog overlap in some browsers
        if (kitchenItems.length > 0) {
          setTimeout(() => {
            printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
          }, 1000);
        } else {
          printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
        }
      }

      showToast(`Reprinting KOT #${order.orderNumber}`, 'success');
    });
  });

  // View details
  container.querySelectorAll('.btn-view-order').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const order = await DB.getById('orders', id);
      if (!order) return;

      const itemsHTML = order.items.map((item, i) =>
        `<tr>
          <td>${i + 1}</td>
          <td>${item.itemName}</td>
          <td class="text-center">${item.quantity}</td>
          <td class="text-right font-mono">${formatCurrency(item.price)}</td>
          <td class="text-right font-mono amount">${formatCurrency(item.amount)}</td>
        </tr>`
      ).join('');

      showModal(`Order #${order.orderNumber}`, `
        <div class="summary-row">
          <span class="summary-label">Waiter</span>
          <span class="summary-value">${supplierMap[order.supplierId] || '—'}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Table</span>
          <span class="summary-value">${tableMap[order.tableId] || '—'}</span>
        </div>
        <div class="summary-row mb-2">
          <span class="summary-label">Created</span>
          <span class="summary-value">${formatDateTime(order.createdAt)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Item</th><th class="text-center">Qty</th><th class="text-right">Rate</th><th class="text-right">Amount</th></tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right"><strong>Total</strong></td>
              <td class="text-right amount total">${formatCurrency(order.totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      `);
    });
  });

  // Cancel order
  container.querySelectorAll('.btn-cancel-order').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const order = await DB.getById('orders', id);
      if (!order) return;

      if (confirm(`Cancel order #${order.orderNumber}?`)) {
        order.status = 'cancelled';
        await DB.update('orders', order);
        showToast(`Order #${order.orderNumber} cancelled`, 'warning');
        renderActiveOrdersView(container);
      }
    });
  });
}
