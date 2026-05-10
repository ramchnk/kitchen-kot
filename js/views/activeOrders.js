import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { formatCurrency, formatDateTime, showToast, showModal, closeModal, printContent, generateKOTPrintHTML, generateCounterKOTPrintHTML, generateBillPrintHTML, isCounterItem } from '../utils.js';

let _unsubscribe = null;

export async function renderActiveOrdersView(container) {
  if (_unsubscribe) _unsubscribe();

  // Load static data first
  const suppliers = await DB.getAll('suppliers');
  const tables = await DB.getAll('tables');
  const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s.name]));
  const tableMap = Object.fromEntries(tables.map(t => [t.id, t.name]));

  // Setup real-time listener
  _unsubscribe = DB.onActiveOrdersChange((orders) => {
    updateTable(container, orders, supplierMap, tableMap);
  });
}

export function destroyActiveOrdersView() {
  if (_unsubscribe) {
    _unsubscribe();
    _unsubscribe = null;
  }
}

function updateTable(container, orders, supplierMap, tableMap) {
  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">pending_actions</span>
        <div>
          <h2 class="view-title">Active Orders</h2>
          <p class="view-subtitle">${orders.length} open order(s)</p>
        </div>
      </div>
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

  setupEventListeners(container, supplierMap, tableMap);
}

function setupEventListeners(container, supplierMap, tableMap) {
  // Convert to bill
  container.querySelectorAll('.btn-convert-bill').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (btn.disabled) return;
      
      const id = parseInt(btn.dataset.id);
      const order = await DB.getById('orders', id);
      if (!order || order.status !== 'open') {
        showToast('Order not found or already billed', 'error');
        return;
      }

      btn.disabled = true;
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined spinning" style="font-size:16px">sync</span>';

      try {
        const now = new Date().toISOString();
        const today = now.substring(0, 10);
        
        const totals = order.items.reduce((acc, item) => {
          acc.subTotal += (item.amount || 0);
          return acc;
        }, { subTotal: 0 });

        order.status = 'billed';
        order.subTotal = totals.subTotal;
        order.totalAmount = totals.subTotal;
        order.billedAt = now;
        order.date = today;
        await DB.update('orders', order);

        // Update ingredient/product consumption
        const DIRECT_PURCHASE_CATEGORIES = ['COOL DRINKS', 'CIGARETTE', 'CIGARETTES', 'CIGARATE', 'COOLDRINKS', 'CUP'];
        for (const orderItem of order.items) {
          const item = await DB.getById('items', orderItem.itemId);
          if (item && DIRECT_PURCHASE_CATEGORIES.includes((item.category || '').toUpperCase())) {
            item.currentStock = Math.max(0, (item.currentStock || 0) - orderItem.quantity);
            await DB.update('items', item);
          } else {
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
        }

        // Record Wallet Transaction
        const isLiquor = (item) => (item.category || '').toUpperCase().trim() === 'LIQUOR' || item.isLiquor;
        const nonLiquorSubtotal = order.items
          .filter(item => !isLiquor(item))
          .reduce((sum, item) => sum + item.amount, 0);

        if (nonLiquorSubtotal > 0) {
          const subTotal = totals.subTotal;
          const acCharge = 0;
          const proportionalAc = subTotal > 0 ? (nonLiquorSubtotal / subTotal) * acCharge : 0;
          const walletAmount = nonLiquorSubtotal + proportionalAc;
          await DB.recordWalletTransaction('income', walletAmount, `Bill Income: #${order.orderNumber}`, order.id, order.date);
        }

        // ---- PRINTING LOGIC (KOTs then Bill) ----
        const supplierName = supplierMap[order.supplierId] || '';
        const tableName = tableMap[order.tableId] || 'N/A';

        // Filter and split items for KOT printing
        const printableItems = order.items.filter(item => {
          const cat = (item.category || '').toUpperCase().trim();
          const name = (item.itemName || '').toUpperCase().trim();
          return cat !== 'LIQUOR' && !item.isLiquor && 
                 cat !== 'AC-CHARGES' && cat !== 'AC CHARGES' && 
                 name !== 'AC-CHARGES' && name !== 'AC CHARGES';
        });

        const kitchenItems = printableItems.filter(item => !isCounterItem(item));
        const counterItems = printableItems.filter(item => isCounterItem(item));

        // 1. Print Kitchen KOT
        if (kitchenItems.length > 0) {
          const kitchenOrder = { ...order, items: kitchenItems };
          printContent(generateKOTPrintHTML(kitchenOrder, supplierName, tableName));
        }

        // 2. Print Counter KOT
        if (counterItems.length > 0) {
          setTimeout(() => {
            printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
          }, kitchenItems.length > 0 ? 1000 : 0);
        }

        // 3. Print Final Bill
        setTimeout(() => {
          const printHTML = generateBillPrintHTML(order, supplierName, tableName);
          printContent(printHTML);
        }, (kitchenItems.length > 0 || counterItems.length > 0) ? 2000 : 0);

        showToast(`Bill #${order.orderNumber} successfully generated!`, 'success');
      } catch (err) {
        console.error(err);
        showToast('Error billing order: ' + err.message, 'error');
        btn.disabled = false;
        btn.innerHTML = originalHtml;
      }
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
      `, {
        footer: `
          <button class="btn btn-ghost" onclick="closeModal()">Close</button>
          <button class="btn btn-success" id="btn-modal-bill" data-id="${order.id}">
            <span class="material-symbols-outlined">receipt</span> Generate Bill
          </button>
        `
      });

      document.getElementById('btn-modal-bill')?.addEventListener('click', () => {
        closeModal();
        const billBtn = container.querySelector(`.btn-convert-bill[data-id="${order.id}"]`);
        if (billBtn) billBtn.click();
      });
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
      }
    });
  });
}


