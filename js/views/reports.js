// ===== Reports View =====
import { DB } from '../db.js';
import { formatCurrency, formatDate, todayISO, isToday, printContent, generateWaiterIncentivePrintHTML } from '../utils.js';

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
    </div>

    <!-- Tab Contents -->
    <div class="tab-content active" id="tab-sales"></div>
    <div class="tab-content" id="tab-incentive"></div>
    <div class="tab-content" id="tab-consumption"></div>
    <div class="tab-content" id="tab-purchase"></div>
    <div class="tab-content" id="tab-product-stock"></div>
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
}

async function generateReports(container) {
  const dateStr = document.getElementById('report-date')?.value || todayISO();
  const orders = await DB.getAll('orders');
  const items = await DB.getAll('items');
  const suppliers = await DB.getAll('suppliers');
  const ingredients = await DB.getAll('ingredients');
  const allRecipes = await DB.getAll('itemIngredients');
  const purchases = await DB.getAll('purchases');
  const grocerySuppliers = await DB.getAll('grocerySuppliers');

  // Filter orders by date and billed status
  const dayOrders = orders.filter(o => {
    if (o.status !== 'billed') return false;
    const d = o.billedAt || o.createdAt;
    return d && d.startsWith(dateStr);
  });

  const itemMap = Object.fromEntries(items.map(i => [i.id, i]));
  const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s]));
  const ingredientMap = Object.fromEntries(ingredients.map(i => [i.id, i]));
  const grocerySupplierMap = Object.fromEntries(grocerySuppliers.map(s => [s.id, s]));

  generateSalesReport(container, dayOrders, itemMap, dateStr);
  generateIncentiveReport(container, dayOrders, itemMap, supplierMap, dateStr);
  generateConsumptionReport(container, dayOrders, allRecipes, ingredientMap, dateStr);
  generatePurchaseReport(container, purchases, ingredientMap, itemMap, grocerySupplierMap, dateStr);
  generateProductStockReport(dayOrders, purchases, items, dateStr);
}

function generateSalesReport(container, orders, itemMap, dateStr) {
  const tab = document.getElementById('tab-sales');

  const totalBills = orders.length;
  const totalAmount = orders.reduce((s, o) => s + o.totalAmount, 0);

  // Item-wise breakdown
  const itemSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const key = item.itemId;
      if (!itemSales[key]) {
        itemSales[key] = { name: item.itemName, category: item.category || itemMap[item.itemId]?.category || '', quantity: 0, amount: 0 };
      }
      itemSales[key].quantity += item.quantity;
      itemSales[key].amount += item.amount;
    });
  });

  const sortedItems = Object.values(itemSales).sort((a, b) => b.amount - a.amount);
  const totalQty = sortedItems.reduce((s, i) => s + i.quantity, 0);

  tab.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">receipt</span></div>
        <div><div class="stat-value">${totalBills}</div><div class="stat-label">Total Bills</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${formatCurrency(totalAmount)}</div><div class="stat-label">Total Sales</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">lunch_dining</span></div>
        <div><div class="stat-value">${totalQty}</div><div class="stat-label">Items Sold</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">avg_pace</span></div>
        <div><div class="stat-value">${totalBills > 0 ? formatCurrency(totalAmount / totalBills) : '₹0'}</div><div class="stat-label">Avg Bill Value</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">Item-wise Sales — ${formatDate(dateStr)}</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Category</th>
            <th class="text-right">Qty Sold</th>
            <th class="text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          ${sortedItems.length === 0 ?
      '<tr><td colspan="5"><div class="empty-state" style="padding:30px"><p>No sales for this date</p></div></td></tr>' :
      sortedItems.map((item, i) => `
              <tr>
                <td class="text-muted">${i + 1}</td>
                <td><strong>${item.name}</strong></td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${item.category}</span></td>
                <td class="text-right font-mono">${item.quantity}</td>
                <td class="text-right amount font-mono">${formatCurrency(item.amount)}</td>
              </tr>
            `).join('')}
        </tbody>
        ${sortedItems.length > 0 ? `
          <tfoot>
            <tr style="font-weight:700">
              <td colspan="3" class="text-right">Total</td>
              <td class="text-right font-mono">${totalQty}</td>
              <td class="text-right amount total font-mono">${formatCurrency(totalAmount)}</td>
            </tr>
          </tfoot>
        ` : ''}
      </table>
    </div>
  `;
}

function generateIncentiveReport(container, orders, itemMap, supplierMap, dateStr) {
  const tab = document.getElementById('tab-incentive');

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

  const supplierEntries = Object.entries(supplierIncentives);
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
              <button class="btn btn-sm btn-secondary btn-print-incentive" data-waiter-id="${si._id}" title="Print Incentive Slip">
                <span class="material-symbols-outlined" style="font-size:16px">print</span> Print
              </button>
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

  // Wire up print buttons
  tab.querySelectorAll('.btn-print-incentive').forEach(btn => {
    btn.addEventListener('click', () => {
      const waiterId = btn.dataset.waiterId;
      const waiterData = supplierIncentives[waiterId];
      if (waiterData) {
        const printHTML = generateWaiterIncentivePrintHTML(waiterData, dateStr);
        printContent(printHTML);
      }
    });
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

    ${usageList.length === 0 ?
      '<div class="card"><div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">inventory_2</span><p>No consumption data for this date</p></div></div>' :
      `<div class="card">
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
      </div>`
    }
  `;
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
      <div class="card-header">
        <span class="card-title">Purchases — ${formatDate(dateStr)}</span>
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
}

// ===== Product Stock Report (Cool Drinks & Cigarettes) =====
function generateProductStockReport(dayOrders, allPurchases, allItems, dateStr) {
  const tab = document.getElementById('tab-product-stock');
  const DIRECT_CATEGORIES = ['COOL DRINKS', 'CIGARETTE'];

  const products = allItems.filter(i => DIRECT_CATEGORIES.includes((i.category || '').toUpperCase()));

  if (products.length === 0) {
    tab.innerHTML = `<div class="empty-state" style="padding:40px"><span class="material-symbols-outlined">local_drink</span><p>No Cool Drinks or Cigarette products found in Item Master</p></div>`;
    return;
  }

  const dayPurchases = allPurchases.filter(p => p.date === dateStr && p.productId);

  const productData = products.map(prod => {
    const purchased = dayPurchases
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

    return {
      id: prod.id,
      name: prod.name,
      category: prod.category,
      currentStock: prod.currentStock || 0,
      purchased,
      purchaseCost,
      sold,
      saleAmount,
    };
  });

  const totalPurchased = productData.reduce((s, p) => s + p.purchased, 0);
  const totalSold = productData.reduce((s, p) => s + p.sold, 0);
  const totalPurchaseCost = productData.reduce((s, p) => s + p.purchaseCost, 0);
  const totalSaleAmount = productData.reduce((s, p) => s + p.saleAmount, 0);

  const categories = {};
  productData.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  tab.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">add_shopping_cart</span></div>
        <div><div class="stat-value">${totalPurchased}</div><div class="stat-label">Purchased Today</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><span class="material-symbols-outlined">shopping_bag</span></div>
        <div><div class="stat-value">${totalSold}</div><div class="stat-label">Sold Today</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">currency_rupee</span></div>
        <div><div class="stat-value">${formatCurrency(totalPurchaseCost)}</div><div class="stat-label">Purchase Cost</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">point_of_sale</span></div>
        <div><div class="stat-value">${formatCurrency(totalSaleAmount)}</div><div class="stat-label">Sale Amount</div></div>
      </div>
    </div>

    ${Object.entries(categories).map(([cat, items]) => `
      <div class="card mb-2">
        <div class="card-header">
          <span class="card-title">${cat.toUpperCase() === 'COOL DRINKS' ? '\ud83e\udd64' : '\ud83d\udeac'} ${cat} \u2014 ${formatDate(dateStr)}</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th class="text-right">Purchased</th>
              <th class="text-right">Purchase Cost</th>
              <th class="text-right">Sold</th>
              <th class="text-right">Sale Amount</th>
              <th class="text-right">Current Stock</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td class="text-right font-mono">${p.purchased > 0 ? `<span class="text-success">+${p.purchased}</span>` : '\u2014'}</td>
                <td class="text-right font-mono">${p.purchaseCost > 0 ? formatCurrency(p.purchaseCost) : '\u2014'}</td>
                <td class="text-right font-mono">${p.sold > 0 ? `<span class="text-danger">-${p.sold}</span>` : '\u2014'}</td>
                <td class="text-right font-mono">${p.saleAmount > 0 ? formatCurrency(p.saleAmount) : '\u2014'}</td>
                <td class="text-right font-mono">
                  <span class="status-badge ${p.currentStock > 0 ? 'status-active' : 'status-inactive'}" style="font-weight:700">
                    ${p.currentStock}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="font-weight:700">
              <td>Total</td>
              <td class="text-right font-mono text-success">+${items.reduce((s, p) => s + p.purchased, 0)}</td>
              <td class="text-right font-mono">${formatCurrency(items.reduce((s, p) => s + p.purchaseCost, 0))}</td>
              <td class="text-right font-mono text-danger">-${items.reduce((s, p) => s + p.sold, 0)}</td>
              <td class="text-right font-mono">${formatCurrency(items.reduce((s, p) => s + p.saleAmount, 0))}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    `).join('')}
  `;
}
