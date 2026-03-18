// ===== Reports View =====
import { DB } from '../db.js';
import { formatCurrency, formatDate, todayISO, isToday, printContent, generateWaiterIncentivePrintHTML, showToast, showModal, closeModal, formatTime } from '../utils.js';

// Cache master data in memory to drastically reduce DB reads on date change
let masterItems = [];
let masterSuppliers = [];
let masterIngredients = [];
let masterRecipes = [];
let masterGrocerySuppliers = [];

export async function renderReportsView(container) {
  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">analytics</span>
        <div>
          <h2 class="view-title">Reports</h2>
          <p class="view-subtitle">End of Day & Business Reports</p>
        </div>
      </div>
      <div class="date-filter">
        <label class="form-label" style="margin:0;white-space:nowrap">Report Date:</label>
        <input type="date" class="form-input" id="report-date" value="${todayISO()}">
        <button class="btn btn-secondary" id="btn-generate-report">
          <span class="material-symbols-outlined">refresh</span> Generate
        </button>
        <button class="btn btn-secondary" id="btn-print-current-report">
          <span class="material-symbols-outlined">print</span> Print
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab-btn active" data-tab="sales">
        <span class="material-symbols-outlined" style="font-size:18px">point_of_sale</span> Sales Report
      </button>
      <button class="tab-btn" data-tab="incentive">
        <span class="material-symbols-outlined" style="font-size:18px">payments</span> Waiter Incentive
      </button>
      <button class="tab-btn" data-tab="consumption">
        <span class="material-symbols-outlined" style="font-size:18px">inventory_2</span> Ingredient Consumption
      </button>
      <button class="tab-btn" data-tab="purchase">
        <span class="material-symbols-outlined" style="font-size:18px">shopping_cart</span> Purchase Report
      </button>
      <button class="tab-btn" data-tab="product-stock">
        <span class="material-symbols-outlined" style="font-size:18px">local_drink</span> Product Stock
      </button>
      <button class="tab-btn" data-tab="expenses">
        <span class="material-symbols-outlined" style="font-size:18px">payments</span> Expense Report
      </button>
      <button class="tab-btn" data-tab="custom-range">
        <span class="material-symbols-outlined" style="font-size:18px">calendar_month</span> Custom Range
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="tab-content active" id="tab-sales"></div>
    <div class="tab-content" id="tab-incentive"></div>
    <div class="tab-content" id="tab-consumption"></div>
    <div class="tab-content" id="tab-purchase"></div>
    <div class="tab-content" id="tab-product-stock"></div>
    <div class="tab-content" id="tab-expenses"></div>
    <div class="tab-content" id="tab-custom-range"></div>
  `;

  // Tab switching
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  // Generate on date change or button click
  const generateAll = () => generateReports(container);
  document.getElementById('report-date')?.addEventListener('change', generateAll);
  document.getElementById('btn-generate-report')?.addEventListener('click', generateAll);

  // Initial generation
  generateAll();

  // Global Print handler
  document.getElementById('btn-print-current-report')?.addEventListener('click', () => {
    const activeBtn = container.querySelector('.tab-btn.active');
    const activeTab = activeBtn?.dataset.tab;
    
    if (activeTab === 'sales') {
        document.getElementById('btn-print-sales')?.click();
    } else if (activeTab === 'purchase') {
        document.getElementById('btn-print-purchase')?.click();
    } else if (activeTab === 'expenses') {
        document.getElementById('btn-print-expenses-full')?.click();
    } else if (activeTab === 'consumption') {
        document.getElementById('btn-print-consumption')?.click();
    } else if (activeTab === 'product-stock') {
        document.getElementById('btn-print-product-stock')?.click();
    } else if (activeTab === 'incentive') {
        showToast('Please print individual waiter slips from the report.', 'info');
    } else {
        window.print();
    }
  });
}

async function generateReports(container) {
  const dateStr = document.getElementById('report-date')?.value || todayISO();
  
  // 1. Fetch Master Data (cached)
  if (masterItems.length === 0) masterItems = await DB.getAll('items');
  if (masterSuppliers.length === 0) masterSuppliers = await DB.getAll('suppliers');
  if (masterIngredients.length === 0) masterIngredients = await DB.getAll('ingredients');
  if (masterRecipes.length === 0) masterRecipes = await DB.getAll('itemIngredients');
  if (masterGrocerySuppliers.length === 0) masterGrocerySuppliers = await DB.getAll('grocerySuppliers');

  // 2. Fetch all stock adjustments (small collection, vital for tracking)
  const stockAdjustments = await DB.getAll('stockAdjustments');

  // 3. OPTIMIZATION: Determine how much history we REALLY need
  // For standard reports (Sales, Expense, etc), we only need the selected day.
  // For Product Stock, we need history back to the LATEST adjustment for each product.
  
  let earliestAnchorDate = dateStr;
  let needsFullHistory = false;

  masterItems.forEach(prod => {
    const prodAdjs = stockAdjustments
      .filter(a => a.productId === prod.id && a.date < dateStr)
      .sort((a, b) => b.date.localeCompare(a.date));

    if (prodAdjs.length > 0) {
      if (prodAdjs[0].date < earliestAnchorDate) {
        earliestAnchorDate = prodAdjs[0].date;
      }
    } else {
      // If ANY product has no past adjustment, we might need full history for accuracy
      needsFullHistory = true;
    }
  });

  // 4. Targeted Database Reads: ONLY for the selected date to save costs
  let orders = await DB.getFiltered('orders', {
    where: [
      ['status', '==', 'billed'],
      ['date', '==', dateStr]
    ]
  });

  // 5. HYBRID FALLBACK: Include orders where 'date' field is missing but 'billedAt' matches.
  // This syncs up the report with the "Completed Bills" modal which uses billedAt prefix.
  const allBilled = await DB.getByIndex('orders', 'status', 'billed');
  const missingDateOrders = allBilled.filter(o => 
    !o.date && o.billedAt && o.billedAt.startsWith(dateStr)
  );
  
  if (missingDateOrders.length > 0) {
    console.log(`Found ${missingDateOrders.length} bills missing 'date' field, adding to report.`);
    orders = [...orders, ...missingDateOrders];
    // Sort by sequence to keep it clean
    orders.sort((a, b) => (a.orderNumber || '').localeCompare(b.orderNumber || ''));
  }

  const purchases = await DB.getFiltered('purchases', {
    where: [['date', '==', dateStr]]
  });

  const expenses = await DB.getFiltered('expenses', {
    where: [['date', '==', dateStr]]
  });

  const payments = await DB.getFiltered('walletTransactions', {
    where: [['date', '==', dateStr]]
  });
  const incentivePayments = payments.filter(p => p.sourceId?.startsWith('INC-PAY-'));

  // Special check: If no orders with 'date' field, try falling back to today if it is today
  if (orders.length === 0 && isToday(dateStr)) {
    // This handles the transition period for old records
  }

  const itemMap = Object.fromEntries(masterItems.map(i => [i.id, i]));
  const supplierMap = Object.fromEntries(masterSuppliers.map(s => [s.id, s]));
  const ingredientMap = Object.fromEntries(masterIngredients.map(i => [i.id, i]));
  const grocerySupplierMap = Object.fromEntries(masterGrocerySuppliers.map(s => [s.id, s]));
  const dayAdjustments = stockAdjustments.filter(a => a.date === dateStr);

  generateSalesReport(container, orders, itemMap, dateStr, dayAdjustments);
  generateIncentiveReport(container, orders, itemMap, supplierMap, dateStr, incentivePayments);
  generateConsumptionReport(container, orders, masterRecipes, ingredientMap, dateStr);
  generatePurchaseReport(container, purchases, ingredientMap, itemMap, grocerySupplierMap, dateStr);
  generateProductStockReport(orders, purchases, masterItems, dateStr, stockAdjustments, orders);
  generateExpenseReport(container, expenses, dateStr, incentivePayments);
  generateCustomRangeReport(container, orders, itemMap, supplierMap);
}

function generateSalesReport(container, orders, itemMap, dateStr, dayAdjustments = []) {
  const tab = document.getElementById('tab-sales');

  const totalBills = orders.length;
  const rawTotalAmount = orders.reduce((s, o) => s + o.totalAmount, 0);

  // Item-wise breakdown
  const itemSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const key = item.itemId;
      if (!itemSales[key]) {
        const masterItem = itemMap[item.itemId];
        itemSales[key] = { 
          name: item.itemName, 
          category: item.category || masterItem?.category || '', 
          isLiquor: item.isLiquor || masterItem?.isLiquor || false,
          quantity: 0, 
          amount: 0 
        };
      }
      itemSales[key].quantity += item.quantity;
      itemSales[key].amount += item.amount;
      
      if (!itemSales[key].billDetails) itemSales[key].billDetails = [];
      itemSales[key].billDetails.push({
        num: order.orderNumber,
        time: (order.billedAt || order.createdAt),
        qty: item.quantity
      });
    });
  });

  const sortedItems = Object.values(itemSales).sort((a, b) => b.amount - a.amount);
  const rawTotalQty = sortedItems.reduce((s, i) => s + i.quantity, 0);

  // Extract Liquor or products with isLiquor flag to exclude them from the reports
  const liquorItems = sortedItems.filter(i => (i.category || '').toUpperCase().trim() === 'LIQUOR' || i.isLiquor);
  const otherItems = sortedItems.filter(i => !((i.category || '').toUpperCase().trim() === 'LIQUOR' || i.isLiquor));

  const liquorQty = liquorItems.reduce((s, i) => s + i.quantity, 0);
  const liquorAmount = liquorItems.reduce((s, i) => s + i.amount, 0);
  const otherQty = otherItems.reduce((s, i) => s + i.quantity, 0);
  const otherAmount = otherItems.reduce((s, i) => s + i.amount, 0);

  // Exclude Liquor from metrics
  const totalQty = rawTotalQty - liquorQty;
  const totalAmount = rawTotalAmount - liquorAmount;

  // Stock Adjustment (Counter/Unbilled Sales)
  const adjustmentItems = dayAdjustments
    .filter(a => a.adjustedQty > 0)
    .map(a => ({
      name: a.productName,
      category: a.category,
      quantity: a.adjustedQty,
      amount: a.adjustedAmount,
    }));
  const adjustmentQty = adjustmentItems.reduce((s, i) => s + i.quantity, 0);
  const adjustmentAmount = adjustmentItems.reduce((s, i) => s + i.amount, 0);

  // Stock Adjustment (Surplus - actual stock > expected stock)
  const negativeAdjustmentItems = dayAdjustments
    .filter(a => a.adjustedQty < 0)
    .map(a => ({
      name: a.productName,
      category: a.category,
      quantity: a.adjustedQty,
      amount: a.adjustedAmount,
    }));
  const negativeAdjustmentQty = negativeAdjustmentItems.reduce((s, i) => s + i.quantity, 0);
  const negativeAdjustmentAmount = negativeAdjustmentItems.reduce((s, i) => s + i.amount, 0);

  // Grand totals including adjustments
  const grandTotalQty = totalQty + adjustmentQty + negativeAdjustmentQty;
  const grandTotalAmount = totalAmount + adjustmentAmount + negativeAdjustmentAmount;

  // Helper to build a section table
  const buildSectionTable = (title, icon, items, sectionQty, sectionAmount, extraStyle = '') => {
    if (items.length === 0) return '';
    return `
      <div class="card mb-2" ${extraStyle}>
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <span class="card-title">${icon} ${title} — ${formatDate(dateStr)}</span>
          <div style="display:flex;gap:16px;align-items:center">
            <span class="text-muted" style="font-size:0.85rem">${sectionQty} items</span>
            <span style="font-weight:700;font-size:1.05rem;color:var(--primary)">${formatCurrency(sectionAmount)}</span>
          </div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:40px">#</th>
              <th>Item Name</th>
              <th>Category</th>
              <th class="text-right">Qty Sold</th>
              <th class="text-right">Total Amount</th>
              <th style="width:50px"></th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item, i) => `
              <tr class="searchable-row" data-search="${(item.name + ' ' + (item.category || '')).toLowerCase()}">
                <td class="text-muted">${i + 1}</td>
                <td><strong>${item.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${item.category}</span></td>
                <td class="text-right font-mono">${item.quantity}</td>
                <td class="text-right amount font-mono">${formatCurrency(item.amount)}</td>
                <td class="text-center">
                  ${item.billDetails ? `
                    <button class="btn btn-sm btn-ghost btn-view-item-bills" 
                      data-name="${item.name}" 
                      data-bills='${JSON.stringify(item.billDetails)}'
                      title="View bill breakdown">
                      <span class="material-symbols-outlined" style="font-size:18px">visibility</span>
                    </button>
                  ` : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Subtotal</td>
              <td class="text-right font-mono">${sectionQty}</td>
              <td class="text-right amount total font-mono" colspan="2">${formatCurrency(sectionAmount)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;
  };

  tab.innerHTML = `
    <div style="margin-bottom:20px; display:flex; gap:12px; align-items:center; justify-content: space-between;">
      <div style="display:flex; gap:12px; align-items:center; flex:1">
        <div class="search-container" style="flex:1; max-width:400px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" id="sales-report-search" class="form-input" placeholder="Search items or categories...">
        </div>
        <div class="text-muted" style="font-size:0.85rem" id="sales-search-results"></div>
      </div>
      <button class="btn btn-secondary" id="btn-print-sales">
        <span class="material-symbols-outlined">print</span> Print Sales Report
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${formatCurrency(rawTotalAmount)}</div><div class="stat-label">Total Billed Sale</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt</span></div>
        <div><div class="stat-value">${totalBills}</div><div class="stat-label">Total Bills</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${formatCurrency(grandTotalAmount)}</div><div class="stat-label">Kitchen Sales (Excl. Liquor) ${(adjustmentAmount > 0 || negativeAdjustmentAmount < 0) ? '(Adjusted)' : ''}</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">lunch_dining</span></div>
        <div><div class="stat-value">${grandTotalQty}</div><div class="stat-label">Items Sold</div></div>
      </div>
      ${(adjustmentAmount > 0 || negativeAdjustmentAmount < 0) ? `
      <div class="stat-card">
        <div class="stat-icon" style="background:#f59e0b20;color:#d97706"><span class="material-symbols-outlined">swap_horiz</span></div>
        <div><div class="stat-value">${formatCurrency(adjustmentAmount + negativeAdjustmentAmount)}</div><div class="stat-label">Net Counter Margin</div></div>
      </div>
      ` : `
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">avg_pace</span></div>
        <div><div class="stat-value">${totalBills > 0 ? formatCurrency(totalAmount / totalBills) : '₹0'}</div><div class="stat-label">Avg Bill Value</div></div>
      </div>
      `}
    </div>

    ${otherItems.length === 0 && adjustmentItems.length === 0 && negativeAdjustmentItems.length === 0 ?
      '<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">point_of_sale</span><p>No sales for this date</p></div></div>' :
      `
        ${buildSectionTable('Item Sales', '🍽️', otherItems, otherQty, otherAmount)}
        ${buildSectionTable('Counter Sales (Unbilled)', '🏪', adjustmentItems, adjustmentQty, adjustmentAmount,
          'style="border-left:3px solid #d97706"')}
        ${buildSectionTable('Stock Surplus (Overstock)', '📉', negativeAdjustmentItems, negativeAdjustmentQty, negativeAdjustmentAmount,
          'style="border-left:3px solid var(--danger)"')}

        <div class="card">
          <table class="data-table">
            <tfoot>
              <tr style="font-weight:600;font-size:0.9rem;color:var(--text-secondary)">
                <td class="text-right" style="padding:12px 16px">Billed Sales</td>
                <td class="text-right font-mono" style="padding:12px 16px">${totalQty}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${formatCurrency(totalAmount)}</td>
              </tr>
              ${adjustmentAmount > 0 ? `
              <tr style="font-weight:600;font-size:0.9rem;color:#d97706">
                <td class="text-right" style="padding:12px 16px">+ Counter Sales (Unbilled)</td>
                <td class="text-right font-mono" style="padding:12px 16px">${adjustmentQty}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${formatCurrency(adjustmentAmount)}</td>
              </tr>
              ` : ''}
              ${negativeAdjustmentAmount < 0 ? `
              <tr style="font-weight:600;font-size:0.9rem;color:var(--danger)">
                <td class="text-right" style="padding:12px 16px">- Stock Surplus / Returned</td>
                <td class="text-right font-mono" style="padding:12px 16px">${Math.abs(negativeAdjustmentQty)}</td>
                <td class="text-right font-mono" style="padding:12px 16px">${formatCurrency(negativeAdjustmentAmount)}</td>
              </tr>
              ` : ''}
              <tr style="font-weight:700;font-size:1.05rem">
                <td class="text-right" style="padding:16px">Grand Total</td>
                <td class="text-right font-mono" style="padding:16px">${grandTotalQty}</td>
                <td class="text-right amount total font-mono" style="padding:16px">${formatCurrency(grandTotalAmount)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `
    }
  `;

  // Wire up detail view buttons
  tab.querySelectorAll('.btn-view-item-bills').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const bills = JSON.parse(btn.dataset.bills);
      
      const contentHTML = `
        <div style="margin-bottom:12px">
          <p>Sales distribution for <strong>${name}</strong> on ${formatDate(dateStr)}</p>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Bill #</th>
              <th>Time</th>
              <th class="text-right">Qty</th>
            </tr>
          </thead>
          <tbody>
            ${bills.sort((a,b) => b.time.localeCompare(a.time)).map(b => `
              <tr>
                <td><strong class="text-accent">${b.num}</strong></td>
                <td class="text-muted font-mono">${formatTime(b.time)}</td>
                <td class="text-right font-mono" style="font-weight:600">${b.qty}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="2" class="text-right">Total Quantity</td>
              <td class="text-right font-mono">${bills.reduce((s, b) => s + b.qty, 0)}</td>
            </tr>
          </tfoot>
        </table>
      `;

      showModal(`Item Sales Details`, contentHTML, { 
        footer: '<button class="btn btn-ghost" onclick="document.getElementById(\'modal-overlay\').classList.add(\'hidden\')">Close</button>'
      });
    });
  });

  // Wire up search
  const searchInput = tab.querySelector('#sales-report-search');
  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const rows = tab.querySelectorAll('.searchable-row');
    let visibleCount = 0;

    rows.forEach(row => {
      const match = row.dataset.search.includes(q);
      row.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    const resultsLabel = tab.querySelector('#sales-search-results');
    if (resultsLabel) {
      resultsLabel.textContent = q ? `Found ${visibleCount} items` : '';
    }
  });

  // Print Sales Report
  tab.querySelector('#btn-print-sales')?.addEventListener('click', () => {
    let printHTML = `
      <div class="print-header">
        <h2>DAILY SALES REPORT</h2>
        <p>${formatDate(dateStr)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${formatDate(dateStr)}</span></div>
        <div><span>Total Billed Sales:</span><span>${formatCurrency(rawTotalAmount)}</span></div>
        ${adjustmentAmount > 0 ? `<div><span>Counter Sales (Unbilled):</span><span>${formatCurrency(adjustmentAmount)}</span></div>` : ''}
        <div><span>Total Revenue:</span><span>${formatCurrency(grandTotalAmount)}</span></div>
      </div>
      <table class="print-items" style="width:100%; border-collapse:collapse; margin-top:20px">
        <thead>
          <tr style="border-bottom:2px solid #000">
            <th style="text-align:left; padding:8px 4px">Item Name</th>
            <th style="text-align:left; padding:8px 4px">Category</th>
            <th style="text-align:right; padding:8px 4px">Qty</th>
            <th style="text-align:right; padding:8px 4px">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${otherItems.map(item => `
            <tr style="border-bottom:1px dashed #ccc">
              <td style="padding:6px 4px">${item.name}</td>
              <td style="padding:6px 4px">${item.category}</td>
              <td style="text-align:right; padding:6px 4px">${item.quantity}</td>
              <td style="text-align:right; padding:6px 4px">${formatCurrency(item.amount)}</td>
            </tr>
          `).join('')}
          ${adjustmentItems.length > 0 ? `
            <tr style="background:#f9f9f9"><td colspan="4" style="padding:8px 4px; font-weight:bold; border-top:2px solid #000">Counter Sales (Unbilled)</td></tr>
            ${adjustmentItems.map(item => `
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${item.name}</td>
                <td style="padding:6px 4px">${item.category}</td>
                <td style="text-align:right; padding:6px 4px">${item.quantity}</td>
                <td style="text-align:right; padding:6px 4px">${formatCurrency(item.amount)}</td>
              </tr>
            `).join('')}
          ` : ''}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">GRAND TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${grandTotalQty}</td>
            <td style="padding:8px 4px; text-align:right">${formatCurrency(grandTotalAmount)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Sales Report ---</p>
      </div>
    `;
    printContent(printHTML, 'a4');
  });
}

function generateIncentiveReport(container, orders, itemMap, supplierMap, dateStr, incentivePayments = []) {
  const tab = document.getElementById('tab-incentive');

  // Map payments by waiterId for quick lookup
  const paymentMap = {};
  incentivePayments.forEach(p => {
    // sourceId format: INC-PAY-${waiterId}-${dateStr}
    const parts = p.sourceId.split('-');
    const waiterId = parts[2];
    if (waiterId) paymentMap[waiterId] = p;
  });

  // Calculate incentives per waiter
  const supplierIncentives = {};

  orders.forEach(order => {
    if (!order.supplierId) return;
    const supplier = supplierMap[order.supplierId];
    if (!supplier || !supplier.incentiveEnabled) return;

    if (!supplierIncentives[order.supplierId]) {
      supplierIncentives[order.supplierId] = {
        name: supplier.name,
        items: {},
        totalSales: 0,
        totalIncentive: 0,
      };
    }

    order.items.forEach(item => {
      const category = (item.category || itemMap[item.itemId]?.category || '').toUpperCase().trim();
      if (category === 'LIQUOR') return; // no need to show liquor

      const incentivePercent = item.incentivePercent || itemMap[item.itemId]?.incentivePercent || 0;
      const incentiveAmt = (item.amount * incentivePercent) / 100;

      if (!supplierIncentives[order.supplierId].items[item.itemId]) {
        supplierIncentives[order.supplierId].items[item.itemId] = {
          name: item.itemName,
          quantity: 0,
          amount: 0,
          incentivePercent,
          incentiveAmount: 0,
        };
      }

      supplierIncentives[order.supplierId].items[item.itemId].quantity += item.quantity;
      supplierIncentives[order.supplierId].items[item.itemId].amount += item.amount;
      supplierIncentives[order.supplierId].items[item.itemId].incentiveAmount += incentiveAmt;
      supplierIncentives[order.supplierId].totalSales += item.amount;
      supplierIncentives[order.supplierId].totalIncentive += incentiveAmt;
    });
  });

  const supplierEntries = Object.entries(supplierIncentives).filter(([id, data]) => Object.keys(data.items).length > 0);
  const supplierList = supplierEntries.map(([id, data]) => ({ ...data, _id: id }));
  const grandTotalIncentive = supplierList.reduce((s, si) => s + si.totalIncentive, 0);

  tab.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${formatCurrency(grandTotalIncentive)}</div><div class="stat-label">Total Incentives</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">groups</span></div>
        <div><div class="stat-value">${supplierList.length}</div><div class="stat-label">Waiters</div></div>
      </div>
    </div>

    ${supplierList.length === 0 ?
      '<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">payments</span><p>No waiter incentive data for this date</p></div></div>' :
      supplierList.map(si => `
        <div class="card mb-2">
          <div class="card-header">
            <span class="card-title">${si.name}</span>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="text-success font-mono" style="font-size:1.1rem;font-weight:700">${formatCurrency(si.totalIncentive)}</span>
              ${(() => {
                const payment = paymentMap[si._id];
                if (payment) {
                  return `
                    <div style="text-align:right">
                      <span class="status-badge status-active" style="background:#10b98120;color:#059669;padding:4px 8px">
                        <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:4px">check_circle</span>
                        Paid on ${formatDate(payment.date)}
                      </span>
                    </div>
                  `;
                }
                if (si.totalIncentive > 0) {
                  return `
                    <button class="btn btn-sm btn-secondary btn-print-incentive" data-waiter-id="${si._id}" title="Print Incentive Slip">
                      <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
                    </button>
                    <button class="btn btn-sm btn-primary btn-pay-incentive" data-waiter-id="${si._id}" data-amount="${si.totalIncentive}" data-name="${si.name}" title="Record Payment in Wallet">
                      <span class="material-symbols-outlined" style="font-size:16px">payments</span> Pay
                    </button>
                  `;
                }
                return '';
              })()}
            </div>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Sale Amount</th>
                <th class="text-right">Incentive %</th>
                <th class="text-right">Incentive Amount</th>
              </tr>
            </thead>
            <tbody>
              ${Object.values(si.items).map(item => `
                <tr>
                  <td><strong>${item.name}</strong></td>
                  <td class="text-right font-mono">${item.quantity}</td>
                  <td class="text-right font-mono">${formatCurrency(item.amount)}</td>
                  <td class="text-right font-mono">${item.incentivePercent}%</td>
                  <td class="text-right amount font-mono">${formatCurrency(item.incentiveAmount)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="font-weight:700">
                <td colspan="2">Total</td>
                <td class="text-right font-mono">${formatCurrency(si.totalSales)}</td>
                <td></td>
                <td class="text-right amount total font-mono">${formatCurrency(si.totalIncentive)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `).join('')}
  `;

  tab.querySelectorAll('.btn-pay-incentive').forEach(btn => {
    btn.addEventListener('click', async () => {
      const { waiterId, amount, name } = btn.dataset;
      const numAmount = parseFloat(amount);
      
      const modalContent = `
        <div style="padding:10px 0">
          <p>Confirm payment of <strong>${formatCurrency(numAmount)}</strong> to <strong>${name}</strong>?</p>
          <div class="form-group" style="margin-top:16px">
            <label class="form-label">Payment Date</label>
            <input type="date" class="form-input" id="incentive-pay-date" value="${todayISO()}">
          </div>
        </div>
      `;
      
      const modalFooter = `
        <button class="btn btn-ghost" id="btn-cancel-pay-incentive">Cancel</button>
        <button class="btn btn-primary" id="btn-confirm-pay-incentive">Confirm & Pay</button>
      `;
      
      showModal('Pay Waiter Incentive', modalContent, { footer: modalFooter });
      
      document.getElementById('btn-cancel-pay-incentive').onclick = closeModal;
      document.getElementById('btn-confirm-pay-incentive').onclick = async () => {
        const payDate = document.getElementById('incentive-pay-date').value;
        const btnConfirm = document.getElementById('btn-confirm-pay-incentive');
        btnConfirm.disabled = true;
        btnConfirm.textContent = 'Processing...';

        try {
          // Record transaction with the chosen payment date
          // sourceId links it to the original report date and waiter
          const sourceId = `INC-PAY-${waiterId}-${dateStr}`;
          
          await DB.recordWalletTransaction('expense', numAmount, `Incentive Paid: ${name}`, sourceId, payDate);
          
          showToast(`Payment of ${formatCurrency(numAmount)} recorded for ${name}`, 'success');
          closeModal();
          
          // Force immediate re-generation of reports for the current date
          await generateReports(container);
        } catch (err) {
          console.error(err);
          showToast('Failed to record payment: ' + err.message, 'error');
          btnConfirm.disabled = false;
          btnConfirm.textContent = 'Confirm & Pay';
        }
      };
    });
  });
}

function generateExpenseReport(container, expenses, dateStr, incentivePayments = []) {
  const tab = document.getElementById('tab-expenses');
  
  // Convert incentive payments to expense-like objects for reporting
  const formattedIncentiveExpenses = incentivePayments.map(p => ({
    category: 'Waiter Incentive',
    description: p.description,
    amount: p.amount,
    date: p.date,
    isManual: false
  }));

  const dayExpenses = [...expenses.filter(e => e.date === dateStr), ...formattedIncentiveExpenses];
  const total = dayExpenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);

  const categories = {};
  dayExpenses.forEach(e => {
    categories[e.category] = (categories[e.category] || 0) + Number(e.amount);
  });

  tab.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">payments</span></div>
        <div><div class="stat-value">${formatCurrency(total)}</div><div class="stat-label">Total Expenses</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">category</span></div>
        <div><div class="stat-value">${Object.keys(categories).length}</div><div class="stat-label">Categories</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">receipt_long</span></div>
        <div><div class="stat-value">${dayExpenses.length}</div><div class="stat-label">Entries</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Daily Expenses — ${formatDate(dateStr)}</span>
        <button class="btn btn-sm btn-secondary" id="btn-print-expenses-full">
          <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
        </button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${dayExpenses.length === 0 ?
      '<tr><td colspan="4"><div class="empty-state" style="padding:30px"><p>No expenses recorded for this date</p></div></td></tr>' :
      dayExpenses.map((e, i) => `
              <tr>
                <td class="text-muted">${i + 1}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${e.category}</span></td>
                <td><strong>${e.description}</strong></td>
                <td class="text-right amount font-mono">${formatCurrency(e.amount)}</td>
              </tr>
            `).join('')}
        </tbody>
        ${dayExpenses.length > 0 ? `
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${formatCurrency(total)}</td>
            </tr>
          </tfoot>
        ` : ''}
      </table>
    </div>

    ${Object.keys(categories).length > 0 ? `
      <div class="card mt-2">
        <div class="card-header">
          <span class="card-title">Category Breakdown</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th class="text-right">Total Amount</th>
              <th class="text-right">% of Total</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(categories).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => `
              <tr>
                <td><strong>${cat}</strong></td>
                <td class="text-right font-mono">${formatCurrency(amt)}</td>
                <td class="text-right font-mono">${total > 0 ? ((amt / total) * 100).toFixed(1) : '0.0'}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}
  `;

  // Print Expenses
  tab.querySelector('#btn-print-expenses-full')?.addEventListener('click', () => {
    let printHTML = `
      <div class="print-header">
        <h2>EXPENSE REPORT</h2>
        <p>${formatDate(dateStr)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${formatDate(dateStr)}</span></div>
        <div><span>Total Expenses:</span><span>${formatCurrency(total)}</span></div>
      </div>
      <table class="print-items" style="width:100%; border-collapse:collapse; margin-top:20px">
        <thead>
          <tr style="border-bottom:2px solid #000">
            <th style="text-align:left; padding:8px 4px">Category</th>
            <th style="text-align:left; padding:8px 4px">Description</th>
            <th style="text-align:right; padding:8px 4px">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${dayExpenses.map(e => `
            <tr style="border-bottom:1px dashed #ccc">
              <td style="padding:6px 4px">${e.category}</td>
              <td style="padding:6px 4px">${e.description}</td>
              <td style="text-align:right; padding:6px 4px">${formatCurrency(e.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="2" style="padding:8px 4px; text-align:right">TOTAL</td>
            <td style="padding:8px 4px; text-align:right">${formatCurrency(total)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Report ---</p>
      </div>
    `;
    printContent(printHTML, 'a4');
  });
}

function generateConsumptionReport(container, orders, allRecipes, ingredientMap, dateStr) {
  const tab = document.getElementById('tab-consumption');

  // Calculate ingredient consumption based on recipes
  const ingredientUsage = {};

  orders.forEach(order => {
    order.items.forEach(orderItem => {
      const recipes = allRecipes.filter(r => r.itemId === orderItem.itemId);
      recipes.forEach(recipe => {
        const ing = ingredientMap[recipe.ingredientId];
        if (!ing) return;

        if (!ingredientUsage[recipe.ingredientId]) {
          ingredientUsage[recipe.ingredientId] = {
            name: ing.name,
            unit: ing.unit,
            totalConsumed: 0,
            currentStock: ing.currentStock || 0,
            itemBreakdown: {},
          };
        }

        const consumed = recipe.quantity * orderItem.quantity;
        ingredientUsage[recipe.ingredientId].totalConsumed += consumed;

        if (!ingredientUsage[recipe.ingredientId].itemBreakdown[orderItem.itemId]) {
          ingredientUsage[recipe.ingredientId].itemBreakdown[orderItem.itemId] = {
            itemName: orderItem.itemName,
            qtySold: 0,
            perUnit: recipe.quantity,
            totalUsed: 0,
          };
        }
        ingredientUsage[recipe.ingredientId].itemBreakdown[orderItem.itemId].qtySold += orderItem.quantity;
        ingredientUsage[recipe.ingredientId].itemBreakdown[orderItem.itemId].totalUsed += consumed;
      });
    });
  });

  const usageList = Object.values(ingredientUsage).sort((a, b) => b.totalConsumed - a.totalConsumed);

  tab.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">inventory_2</span></div>
        <div><div class="stat-value">${usageList.length}</div><div class="stat-label">Ingredients Used</div></div>
      </div>
    </div>

      <div class="card">
        <div class="card-header" style="justify-content:space-between">
          <span class="card-title">Ingredient Consumption — ${formatDate(dateStr)}</span>
          <button class="btn btn-sm btn-secondary" id="btn-print-consumption">
            <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
          </button>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th class="text-right">Total Consumed</th>
              <th>Unit</th>
              <th class="text-right">Current Stock</th>
              <th>Breakdown</th>
            </tr>
          </thead>
          <tbody>
            ${usageList.map(ing => `
              <tr>
                <td><strong>${ing.name}</strong></td>
                <td class="text-right font-mono" style="color:var(--danger)">${ing.totalConsumed.toFixed(1)}</td>
                <td>${ing.unit}</td>
                <td class="text-right font-mono ${ing.currentStock < ing.totalConsumed ? 'text-danger' : 'text-success'}">${ing.currentStock.toFixed(1)} ${ing.unit}</td>
                <td class="text-muted" style="font-size:0.78rem">
                  ${Object.values(ing.itemBreakdown).map(b =>
        `${b.itemName}: ${b.qtySold} × ${b.perUnit}${ing.unit} = ${b.totalUsed.toFixed(1)}${ing.unit}`
      ).join(' | ')}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

  // Print Consumption
  tab.querySelector('#btn-print-consumption')?.addEventListener('click', () => {
    let printHTML = `
      <div class="print-header">
        <h2>INGREDIENT CONSUMPTION</h2>
        <p>${formatDate(dateStr)}</p>
      </div>
      <table class="print-items" style="width:100%; border-collapse:collapse; margin-top:20px">
        <thead>
          <tr style="border-bottom:2px solid #000">
            <th style="text-align:left; padding:8px 4px">Ingredient</th>
            <th style="text-align:right; padding:8px 4px">Consumed</th>
            <th style="text-align:left; padding:8px 4px">Unit</th>
          </tr>
        </thead>
        <tbody>
          ${usageList.map(ing => `
            <tr style="border-bottom:1px dashed #ccc">
              <td style="padding:6px 4px">${ing.name}</td>
              <td style="text-align:right; padding:6px 4px">${ing.totalConsumed.toFixed(2)}</td>
              <td style="padding:6px 4px">${ing.unit}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Report ---</p>
      </div>
    `;
    printContent(printHTML, 'a4');
  });
}

function generatePurchaseReport(container, purchases, ingredientMap, itemMap, supplierMap, dateStr) {
  const tab = document.getElementById('tab-purchase');

  const dayPurchases = purchases.filter(p => p.date === dateStr);
  const totalCost = dayPurchases.reduce((s, p) => s + (p.cost || 0), 0);
  const totalQty = dayPurchases.reduce((s, p) => s + (p.quantity || 0), 0);

  tab.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">shopping_cart</span></div>
        <div><div class="stat-value">${dayPurchases.length}</div><div class="stat-label">Purchases</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${formatCurrency(totalCost)}</div><div class="stat-label">Total Cost</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" style="justify-content:space-between">
        <span class="card-title">Purchases — ${formatDate(dateStr)}</span>
        <button class="btn btn-sm btn-secondary" id="btn-print-purchase">
          <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
        </button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th class="text-right">Quantity</th>
            <th>Unit</th>
            <th class="text-right">Cost</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          ${dayPurchases.length === 0 ?
      '<tr><td colspan="6"><div class="empty-state" style="padding:30px"><p>No purchases on this date</p></div></td></tr>' :
      dayPurchases.map((p, i) => {
        let name, unit;
        if (p.productId) {
          const prod = itemMap[p.productId];
          name = (prod?.name || 'Unknown') + ' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem">PRODUCT</span>';
          unit = 'pcs';
        } else {
          const ing = ingredientMap[p.ingredientId];
          name = ing?.name || 'Unknown';
          unit = ing?.unit || '—';
        }
        const sup = supplierMap[p.supplierId];
        return `
                <tr>
                  <td class="text-muted">${i + 1}</td>
                  <td><strong>${name}</strong></td>
                  <td class="text-right font-mono">${p.quantity}</td>
                  <td>${unit}</td>
                  <td class="text-right amount font-mono">${formatCurrency(p.cost)}</td>
                  <td>${sup?.name || '—'}</td>
                </tr>
              `;
      }).join('')}
        </tbody>
        ${dayPurchases.length > 0 ? `
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="4" class="text-right">Total</td>
              <td class="text-right amount total font-mono">${formatCurrency(totalCost)}</td>
              <td></td>
            </tr>
          </tfoot>
        ` : ''}
      </table>
    </div>
  `;

  // Print Purchases
  tab.querySelector('#btn-print-purchase')?.addEventListener('click', () => {
    let printHTML = `
      <div class="print-header">
        <h2>PURCHASE REPORT</h2>
        <p>${formatDate(dateStr)}</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${formatDate(dateStr)}</span></div>
        <div><span>Total Cost:</span><span>${formatCurrency(totalCost)}</span></div>
        <div><span>Total Items:</span><span>${dayPurchases.length}</span></div>
      </div>
      <table class="print-items" style="width:100%; border-collapse:collapse; margin-top:20px">
        <thead>
          <tr style="border-bottom:2px solid #000">
            <th style="text-align:left; padding:8px 4px">Item</th>
            <th style="text-align:right; padding:8px 4px">Qty</th>
            <th style="text-align:left; padding:8px 4px">Unit</th>
            <th style="text-align:right; padding:8px 4px">Cost</th>
            <th style="text-align:left; padding:8px 4px">Supplier</th>
          </tr>
        </thead>
        <tbody>
          ${dayPurchases.map(p => {
            let name, unit;
            if (p.productId) {
              const prod = itemMap[p.productId];
              name = prod?.name || 'Unknown';
              unit = 'pcs';
            } else {
              const ing = ingredientMap[p.ingredientId];
              name = ing?.name || 'Unknown';
              unit = ing?.unit || '—';
            }
            const sup = supplierMap[p.supplierId];
            return `
              <tr style="border-bottom:1px dashed #ccc">
                <td style="padding:6px 4px">${name}</td>
                <td style="text-align:right; padding:6px 4px">${p.quantity}</td>
                <td style="padding:6px 4px">${unit}</td>
                <td style="text-align:right; padding:6px 4px">${formatCurrency(p.cost)}</td>
                <td style="padding:6px 4px">${sup?.name || '—'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
        <tfoot style="border-top:2px solid #000">
          <tr style="font-weight:bold">
            <td colspan="3" style="padding:8px 4px; text-align:right">TOTAL COST</td>
            <td style="padding:8px 4px; text-align:right">${formatCurrency(totalCost)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="print-footer" style="margin-top:30px">
        <p>--- End of Purchase Report ---</p>
      </div>
    `;
    printContent(printHTML, 'a4');
  });
}

// ===== Product Stock Report (Cool Drinks & Cigarettes) =====
function generateProductStockReport(dayOrders, allPurchases, allItems, dateStr, allStockAdjustments = [], allOrders = []) {
  const tab = document.getElementById('tab-product-stock');
  const DIRECT_CATEGORIES = ['COOL DRINKS', 'CIGARETTE', 'CIGARATE', 'CIGARETTES'];

  const products = allItems.filter(i => DIRECT_CATEGORIES.includes((i.category || '').toUpperCase().trim()));

  if (products.length === 0) {
    tab.innerHTML = `<div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">local_drink</span><p>No Cool Drinks or Cigarette products found in Item Master</p></div>`;
    return;
  }

  // Find stock adjustments that happened strictly before the selected date
  const pastAdjustments = allStockAdjustments.filter(a => a.date < dateStr);

  // Find stock adjustments that happened exactly on the selected date
  const todayAdjustments = allStockAdjustments.filter(a => a.date === dateStr);
  const todayAdjMap = Object.fromEntries(todayAdjustments.map(a => [a.productId, a]));

  // Purchases on the selected date
  const dayPurchases = allPurchases.filter(p => p.productId);

  const productData = products.map(prod => {
    // Purchased on selected date
    const purchasedToday = dayPurchases
      .filter(p => p.productId === prod.id)
      .reduce((s, p) => s + (p.quantity || 0), 0);

    const purchaseCost = dayPurchases
      .filter(p => p.productId === prod.id)
      .reduce((s, p) => s + (p.cost || 0), 0);

    let sold = 0;
    let saleAmount = 0;
    dayOrders.forEach(order => {
      (order.items || []).forEach(item => {
        if (item.itemId === prod.id) {
          sold += item.quantity;
          saleAmount += item.amount || (item.quantity * item.price);
        }
      });
    });

    // Opening Stock Logic:
    // We roll forward from the LATEST available stock adjustment.
    // If no past stock adjustment exists for this product, we roll forward from the beginning of time.
    let openingStock = 0;

    const prodPastAdjustments = pastAdjustments
      .filter(a => a.productId === prod.id)
      .sort((a, b) => b.date.localeCompare(a.date));

    if (isToday(dateStr)) {
      // Today optimization: Opening = Current - Today's Changes
      openingStock = (prod.currentStock || 0) - purchasedToday + sold;
    } else if (prodPastAdjustments.length > 0) {
      const latestAdj = prodPastAdjustments[0];
      const anchorDate = latestAdj.date;
      const baseStock = latestAdj.actualClosing;

      // Sum purchases from (anchorDate to dateStr) exclusive of anchorDate, exclusive of dateStr
      const interveningPurchases = allPurchases
        .filter(p => p.productId === prod.id && p.date > anchorDate && p.date < dateStr)
        .reduce((s, p) => s + (p.quantity || 0), 0);
      
      // Sum sales from (anchorDate to dateStr) exclusive of anchorDate, exclusive of dateStr
      const interveningSales = allOrders.filter(o => {
        const d = (o.date || (o.billedAt || '').substring(0, 10));
        return d > anchorDate && d < dateStr;
      }).reduce((sum, o) => {
        const item = o.items.find(i => i.itemId === prod.id);
        return sum + (item ? item.quantity : 0);
      }, 0);

      openingStock = baseStock + interveningPurchases - interveningSales;
    } else {
      // No adjustment and not today, and no history loaded. 
      // We show 0 or indicate missing link. 
      openingStock = 0; 
    }

    // Expected Closing = Opening + Purchased Today - Sold
    const expectedClosing = Math.max(0, openingStock + purchasedToday - sold);
    const actualClosing = todayAdjMap[prod.id] ? todayAdjMap[prod.id].actualClosing : expectedClosing;

    return {
      id: prod.id,
      name: prod.name,
      category: prod.category,
      currentStock: prod.currentStock || 0,
      openingStock,
      purchased: purchasedToday,
      purchaseCost,
      sold,
      saleAmount,
      expectedClosing,
      actualClosing,
    };
  });

  const totalOpeningStock = productData.reduce((s, p) => s + p.openingStock, 0);
  const totalPurchased = productData.reduce((s, p) => s + p.purchased, 0);
  const totalSold = productData.reduce((s, p) => s + p.sold, 0);
  const totalPurchaseCost = productData.reduce((s, p) => s + p.purchaseCost, 0);
  const totalSaleAmount = productData.reduce((s, p) => s + p.saleAmount, 0);
  const totalExpectedClosing = productData.reduce((s, p) => s + p.expectedClosing, 0);

  const categories = {};
  productData.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  tab.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">inventory</span></div>
        <div><div class="stat-value">${totalOpeningStock}</div><div class="stat-label">Opening Stock</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">shopping_bag</span></div>
        <div><div class="stat-value">${totalSold}</div><div class="stat-label">Sold (${formatDate(dateStr)})</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${formatCurrency(totalSaleAmount)}</div><div class="stat-label">Sale Amount</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">calculate</span></div>
        <div><div class="stat-value">${totalExpectedClosing}</div><div class="stat-label">Expected Closing</div></div>
      </div>
    </div>

    <div style="display:flex;justify-content:flex-end;margin-bottom:12px;gap:8px">
      <button class="btn btn-secondary" id="btn-print-product-stock">
        <span class="material-symbols-outlined">print</span> Print Stock Report
      </button>
      <button class="btn btn-primary" id="btn-save-closing-stock">
        <span class="material-symbols-outlined">save</span> Save Closing Stock
      </button>
    </div>

    ${Object.entries(categories).map(([cat, items]) => `
      <div class="card mb-2">
        <div class="card-header">
          <span class="card-title">${cat.toUpperCase().includes('COOL') ? '🥤' : '🚬'} ${cat} — ${formatDate(dateStr)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th class="text-right">Opening Stock</th>
              <th class="text-right">Purchased</th>
              <th class="text-right">Sold</th>
              <th class="text-right">Sale Amount</th>
              <th class="text-right">Expected Closing</th>
              <th class="text-right" style="background:var(--primary-light, #e0e7ff);color:var(--primary)">Actual Closing Stock</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td class="text-right font-mono" style="font-weight:600">${p.openingStock}</td>
                <td class="text-right font-mono">${p.purchased > 0 ? `<span class="text-success">+${p.purchased}</span>` : '—'}</td>
                <td class="text-right font-mono">${p.sold > 0 ? `<span class="text-danger">-${p.sold}</span>` : '—'}</td>
                <td class="text-right font-mono">${p.saleAmount > 0 ? formatCurrency(p.saleAmount) : '—'}</td>
                <td class="text-right font-mono" style="font-weight:600">${p.expectedClosing}</td>
                <td class="text-right" style="background:var(--primary-light, #e0e7ff)">
                  <input type="number" class="form-input closing-stock-input" 
                    data-product-id="${p.id}" 
                    value="${p.actualClosing}" 
                    min="0" 
                    style="width:80px;text-align:center;padding:4px 8px;font-weight:700;font-size:0.95rem;margin:0 0 0 auto;display:block"
                  >
                </td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td>Total</td>
              <td class="text-right font-mono">${items.reduce((s, p) => s + p.openingStock, 0)}</td>
              <td class="text-right font-mono text-success">+${items.reduce((s, p) => s + p.purchased, 0)}</td>
              <td class="text-right font-mono text-danger">-${items.reduce((s, p) => s + p.sold, 0)}</td>
              <td class="text-right font-mono">${formatCurrency(items.reduce((s, p) => s + p.saleAmount, 0))}</td>
              <td class="text-right font-mono">${items.reduce((s, p) => s + p.expectedClosing, 0)}</td>
              <td class="text-right font-mono" style="background:var(--primary-light, #e0e7ff)" id="closing-stock-total-${cat.replace(/\s+/g, '-').toLowerCase()}">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `).join('')}
  `;

  // Calculate and display closing stock totals dynamically
  function updateClosingTotals() {
    Object.keys(categories).forEach(cat => {
      const totalEl = document.getElementById(`closing-stock-total-${cat.replace(/\s+/g, '-').toLowerCase()}`);
      if (!totalEl) return;
      let total = 0;
      categories[cat].forEach(p => {
        const input = tab.querySelector(`.closing-stock-input[data-product-id="${p.id}"]`);
        total += parseInt(input?.value) || 0;
      });
      totalEl.textContent = total;
    });
  }

  // Initial total calculation
  updateClosingTotals();

  // Update totals on input change
  tab.querySelectorAll('.closing-stock-input').forEach(input => {
    input.addEventListener('input', updateClosingTotals);
  });

  // Save Closing Stock button
  document.getElementById('btn-save-closing-stock')?.addEventListener('click', async () => {
    const inputs = tab.querySelectorAll('.closing-stock-input');
    let updatedCount = 0;
    let adjustmentCount = 0;

    // First, delete any existing adjustments for this date to avoid duplicates
    const existingAdjustments = await DB.getAll('stockAdjustments');
    for (const adj of existingAdjustments.filter(a => a.date === dateStr)) {
      await DB.remove('stockAdjustments', adj.id);
    }

    // Delete any existing wallet transactions for this date's stock adjustments
    // to prevent duplicate entries when user clicks Save multiple times
    const allWalletTxns = await DB.getAll('walletTransactions');
    const stockAdjSourceId = `STOCK-ADJ-${dateStr}`;
    const stockSurpSourceId = `STOCK-SURP-${dateStr}`;
    const existingStockWalletTxns = allWalletTxns.filter(t => 
      t.sourceId === stockAdjSourceId || t.sourceId === stockSurpSourceId
    );
    for (const txn of existingStockWalletTxns) {
      await DB.remove('walletTransactions', txn.id);
    }
    // If we deleted old wallet transactions, recalculate the wallet totals
    if (existingStockWalletTxns.length > 0) {
      await DB.recalculateWalletTotals();
    }

    for (const input of inputs) {
      const productId = parseInt(input.dataset.productId);
      const actualClosing = parseInt(input.value) || 0;

      // Find the product data to get expected closing and selling price
      const prodData = productData.find(p => p.id === productId);
      const product = await DB.getById('items', productId);
      if (!product || !prodData) continue;

      // Update currentStock
      product.currentStock = actualClosing;
      await DB.update('items', product);
      updatedCount++;

      // Calculate adjustment (unbilled counter sales)
      const adjustedQty = prodData.expectedClosing - actualClosing;
      const adjustedAmount = adjustedQty * (product.sellingPrice || 0);

      // Always add an adjustment record so next day can pull the correct actualClosing
      await DB.add('stockAdjustments', {
        productId: productId,
        productName: product.name,
        category: product.category,
        date: dateStr,
        openingStock: prodData.openingStock,
        expectedClosing: prodData.expectedClosing,
        actualClosing: actualClosing,
        adjustedQty: adjustedQty,
        adjustedAmount: adjustedAmount,
        sellingPrice: product.sellingPrice || 0,
        createdAt: new Date().toISOString(),
      });

      if (adjustedQty !== 0) {
        adjustmentCount++;
        // Record Wallet Transaction for adjustments
        if (adjustedQty > 0) {
           // EOD Counter Sales (Unbilled) -> Income
           await DB.recordWalletTransaction('income', adjustedAmount, `EOD Counter Sale (Unbilled): ${product.name}`, `STOCK-ADJ-${dateStr}`);
        } else {
           // EOD Stock Surplus (Overstock) -> Deduct Income, Add Outflow
           await DB.recordWalletTransaction('adjustment-surplus', Math.abs(adjustedAmount), `EOD Stock Surplus: ${product.name}`, `STOCK-SURP-${dateStr}`);
        }
      }
    }

    const msg = adjustmentCount > 0
      ? `Stock updated for ${updatedCount} product(s) with ${adjustmentCount} adjustment(s). Sales Report updated!`
      : `Stock updated for ${updatedCount} product(s). No adjustments needed.`;
    showToast(msg, 'success');

    // Refresh the report to reflect updated stock and adjustments in Sales Report
    const reportDate = document.getElementById('report-date');
    if (reportDate) {
      document.getElementById('btn-generate-report')?.click();
    }
  });

  // Print Product Stock Report
  document.getElementById('btn-print-product-stock')?.addEventListener('click', () => {
    // Read actual closing stock values from inputs
    const inputValues = {};
    tab.querySelectorAll('.closing-stock-input').forEach(input => {
      inputValues[input.dataset.productId] = parseInt(input.value) || 0;
    });

    let printHTML = `
      <div class="print-header">
        <h2>PRODUCT STOCK REPORT</h2>
        <p>Cool Drinks & Cigarettes</p>
      </div>
      <div class="print-meta">
        <div><span>Date:</span><span>${formatDate(dateStr)}</span></div>
        <div><span>Printed:</span><span>${new Date().toLocaleString('en-IN')}</span></div>
      </div>
    `;

    Object.entries(categories).forEach(([cat, items]) => {
      const catIcon = cat.toUpperCase().includes('COOL') ? '🥤' : '🚬';
      printHTML += `
        <div style="margin-top:12px;font-weight:700;font-size:1.1em;border-bottom:2px solid #000;padding-bottom:4px">
          ${catIcon} ${cat}
        </div>
        <table class="print-items" style="width:100%;border-collapse:collapse;margin-top:4px">
          <thead>
            <tr>
              <th style="text-align:left;padding:4px 6px;border-bottom:1px solid #000">Product</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Opening</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Purchased</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Sold</th>
              <th style="text-align:right;padding:4px 6px;border-bottom:1px solid #000">Sale Amt</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Expected</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Actual</th>
              <th style="text-align:center;padding:4px 6px;border-bottom:1px solid #000">Diff</th>
            </tr>
          </thead>
          <tbody>
      `;

      let catTotals = { opening: 0, purchased: 0, sold: 0, saleAmount: 0, expected: 0, actual: 0, diff: 0 };

      items.forEach(p => {
        const actual = inputValues[p.id] ?? p.expectedClosing;
        const diff = p.expectedClosing - actual;
        catTotals.opening += p.openingStock;
        catTotals.purchased += p.purchased;
        catTotals.sold += p.sold;
        catTotals.saleAmount += p.saleAmount;
        catTotals.expected += p.expectedClosing;
        catTotals.actual += actual;
        catTotals.diff += diff;

        printHTML += `
            <tr>
              <td style="padding:3px 6px;border-bottom:1px dashed #ccc">${p.name}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${p.openingStock}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${p.purchased > 0 ? '+' + p.purchased : '-'}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${p.sold > 0 ? '-' + p.sold : '-'}</td>
              <td style="text-align:right;padding:3px 6px;border-bottom:1px dashed #ccc">${p.saleAmount > 0 ? formatCurrency(p.saleAmount) : '-'}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc">${p.expectedClosing}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;font-weight:700">${actual}</td>
              <td style="text-align:center;padding:3px 6px;border-bottom:1px dashed #ccc;${diff !== 0 ? 'font-weight:700' : ''}">${diff !== 0 ? diff : '-'}</td>
            </tr>
        `;
      });

      printHTML += `
          </tbody>
          <tfoot>
            <tr style="font-weight:700;border-top:2px solid #000">
              <td style="padding:4px 6px">Total</td>
              <td style="text-align:center;padding:4px 6px">${catTotals.opening}</td>
              <td style="text-align:center;padding:4px 6px">+${catTotals.purchased}</td>
              <td style="text-align:center;padding:4px 6px">-${catTotals.sold}</td>
              <td style="text-align:right;padding:4px 6px">${formatCurrency(catTotals.saleAmount)}</td>
              <td style="text-align:center;padding:4px 6px">${catTotals.expected}</td>
              <td style="text-align:center;padding:4px 6px">${catTotals.actual}</td>
              <td style="text-align:center;padding:4px 6px">${catTotals.diff !== 0 ? catTotals.diff : '-'}</td>
            </tr>
          </tfoot>
        </table>
      `;
    });

    // Grand summary
    printHTML += `
      <div style="margin-top:16px;padding-top:8px;border-top:2px solid #000">
        <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05em">
          <span>Total Opening: ${totalOpeningStock}</span>
          <span>Purchased: +${totalPurchased}</span>
          <span>Sold: -${totalSold}</span>
          <span>Expected: ${totalExpectedClosing}</span>
        </div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;font-size:0.9em">
          <span>Total Sale Amount: ${formatCurrency(totalSaleAmount)}</span>
          <span>Purchase Cost: ${formatCurrency(totalPurchaseCost)}</span>
        </div>
      </div>
      <div class="print-footer">
        <p>--- End of Stock Report ---</p>
      </div>
    `;

    printContent(printHTML, 'a4');
  });
}

function generateCustomRangeReport(container, allOrders, itemMap, supplierMap) {
  const tab = document.getElementById('tab-custom-range');
  
  // store date values if they exist
  const existingStart = document.getElementById('custom-start-date')?.value;
  const existingEnd = document.getElementById('custom-end-date')?.value;
  
  const d = new Date();
  const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
  const today = d.toISOString().split('T')[0];
  
  const startVal = existingStart || startOfMonth;
  const endVal = existingEnd || today;

  if (!tab.querySelector('.custom-range-controls')) {
    tab.innerHTML = `
      <div class="card mb-4 custom-range-controls" style="background:var(--bg-elevated); padding:16px;">
        <div style="display:flex; gap:16px; align-items:flex-end; flex-wrap:wrap">
          <div>
            <label class="form-label" style="margin-bottom:4px;">From Date</label>
            <input type="date" class="form-input" id="custom-start-date" value="${startVal}">
          </div>
          <div>
            <label class="form-label" style="margin-bottom:4px;">To Date</label>
            <input type="date" class="form-input" id="custom-end-date" value="${endVal}">
          </div>
          <button class="btn btn-primary" id="btn-generate-custom-range">
            <span class="material-symbols-outlined">analytics</span> Generate Range Report
          </button>
        </div>
      </div>
      <div id="custom-range-results"></div>
    `;

    const btn = tab.querySelector('#btn-generate-custom-range');
    btn.addEventListener('click', () => {
      renderCustomRangeData(itemMap, supplierMap);
    });
  }

  // Initial prompt (optional: can also just render with results if dates are set)
  document.getElementById('custom-range-results').innerHTML = `
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined">date_range</span>
      <p>Select a date range and click "Generate Range Report"</p>
    </div>
  `;
}

async function renderCustomRangeData(itemMap, supplierMap) {
  const resultsContainer = document.getElementById('custom-range-results');
  if (!resultsContainer) return;

  const startStr = document.getElementById('custom-start-date').value;
  const endStr = document.getElementById('custom-end-date').value;

  if (!startStr || !endStr) {
    resultsContainer.innerHTML = '<p class="text-danger">Please select both start and end dates.</p>';
    return;
  }

  resultsContainer.innerHTML = `
    <div class="empty-state" style="padding:40px">
      <span class="material-symbols-outlined spinning">sync</span>
      <p>Fetching range data from database...</p>
    </div>
  `;

  // Fetch only what's needed for the range
  let rangeOrders = await DB.getFiltered('orders', {
    where: [
      ['status', '==', 'billed'],
      ['date', '>=', startStr],
      ['date', '<=', endStr]
    ]
  });

  // Fallback for old orders
  if (rangeOrders.length === 0) {
      const allOrders = await DB.getByIndex('orders', 'status', 'billed');
      rangeOrders = allOrders.filter(o => {
          const d = (o.date || (o.billedAt || '').substring(0, 10));
          return d >= startStr && d <= endStr;
      });
  }


  if (rangeOrders.length === 0) {
    resultsContainer.innerHTML = `
      <div class="card">
        <div class="empty-state" style="padding:40px">
          <span class="material-symbols-outlined">event_note</span>
          <p>No billed orders found in this date range (${formatDate(startStr)} to ${formatDate(endStr)}).</p>
        </div>
      </div>
    `;
    return;
  }

  const totalAmount = rangeOrders.reduce((s, o) => s + o.totalAmount, 0);

  // 1. Item Sales Aggregation
  const itemSales = {};
  // 2. Waiter Sales Aggregation
  const waiterSales = {};

  rangeOrders.forEach(order => {
    // Waiter overall
    if (order.supplierId) {
      const wait = supplierMap[order.supplierId];
      if (wait) {
        if (!waiterSales[order.supplierId]) {
          waiterSales[order.supplierId] = { name: wait.name, totalAmount: 0, orderCount: 0 };
        }
        waiterSales[order.supplierId].totalAmount += order.totalAmount;
        waiterSales[order.supplierId].orderCount += 1;
      }
    }

    // Items
    order.items.forEach(item => {
      const key = item.itemId;
      if (!itemSales[key]) {
        itemSales[key] = {
          name: item.itemName,
          category: item.category || itemMap[item.itemId]?.category || '',
          quantity: 0,
          amount: 0
        };
      }
      itemSales[key].quantity += item.quantity;
      itemSales[key].amount += item.amount;
    });
  });

  const sortedItems = Object.values(itemSales).sort((a, b) => b.amount - a.amount);
  const sortedWaiters = Object.values(waiterSales).sort((a, b) => b.totalAmount - a.totalAmount);

  resultsContainer.innerHTML = `
    <div class="stats-grid mb-4">
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div>
          <div class="stat-value">${formatCurrency(totalAmount)}</div>
          <div class="stat-label">Total Sales (Range)</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt</span></div>
        <div>
          <div class="stat-value">${rangeOrders.length}</div>
          <div class="stat-label">Total Bills (Range)</div>
        </div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap:20px;">
      <!-- Item Sales -->
      <div class="card" style="margin-bottom:0px;">
        <div class="card-header">
          <span class="card-title">🍽️ Items Sold</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${sortedItems.map(item => `
              <tr>
                <td><strong>${item.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${item.category}</span></td>
                <td class="text-right font-mono">${item.quantity}</td>
                <td class="text-right amount font-mono">${formatCurrency(item.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Waiter Sales -->
      <div class="card" style="margin-bottom:0px;align-self: flex-start;">
        <div class="card-header">
          <span class="card-title">👨‍🍳 Waiter Performance</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Waiter Name</th>
              <th class="text-right">Bills Handled</th>
              <th class="text-right">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            ${sortedWaiters.length > 0 ? sortedWaiters.map(w => `
              <tr>
                <td><strong>${w.name}</strong></td>
                <td class="text-right font-mono" style="color:var(--text-secondary)">${w.orderCount}</td>
                <td class="text-right amount font-mono" style="color:var(--success); font-weight:700;">${formatCurrency(w.totalAmount)}</td>
              </tr>
            `).join('') : `<tr><td colspan="3" class="text-muted" style="text-align:center;padding:20px;">No waiter data recorded in bills layer</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
