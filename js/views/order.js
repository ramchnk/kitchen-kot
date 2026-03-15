// ===== Order Entry View (Keyboard-First POS) =====
import { DB } from '../db.js';
import { formatCurrency, showToast, printContent, generateKOTPrintHTML, generateCounterKOTPrintHTML, generateBillPrintHTML, showModal, formatDate, formatDateTime, todayISO, isCounterItem } from '../utils.js';
import { registerShortcut, unregisterShortcut } from '../keyboard.js';
import { LiquorApi } from '../liquorApi.js';
import { Auth } from '../auth.js';

let orderState = {
  supplierId: null,
  tableId: null,
  items: [],
  editingOrderId: null,
};

let suppliers = [];
let tables = [];
let menuItems = [];
let activeTableIds = new Set();

function resetOrder() {
  orderState = { supplierId: null, tableId: null, items: [], editingOrderId: null };
}

function calculateTotals() {
  const subTotal = orderState.items.reduce((sum, item) => sum + item.amount, 0);
  return { subTotal, acCharge: 0, totalAmount: subTotal };
}

function calculateTotal() {
  return calculateTotals().totalAmount;
}

export async function renderOrderView(container) {
  // Master data caching - only load once per session
  if (suppliers.length === 0) suppliers = (await DB.getAll('suppliers')).filter(s => s.active);
  if (tables.length === 0) tables = (await DB.getAll('tables')).filter(t => t.active);
  if (menuItems.length === 0) menuItems = (await DB.getAll('items')).filter(i => i.active);

  // Always load liquor items if account has liquor enabled
  const account = Auth.getCurrentAccount();
  if (account?.isLiquorEnabled) {
    try {
      console.log('Liquor enabled, ensuring ready...');
      await LiquorApi.ensureReady();
      const liquorItems = LiquorApi.getProducts();
      console.log(`Adding ${liquorItems.length} liquor items to menu`);
      if (liquorItems.length > 0) {
        menuItems = [...menuItems, ...liquorItems];
      }
    } catch (e) {
      console.error('Error loading liquor products:', e);
    }
  }

  container.innerHTML = `
    <div class="order-layout">
      <!-- Left Panel: Order Entry -->
      <div class="order-entry-panel">
        <div class="view-header" style="margin-bottom:12px">
          <div class="view-header-left">
            <span class="material-symbols-outlined view-header-icon">receipt_long</span>
            <div>
              <h2 class="view-title" id="order-view-title">New Order</h2>
              <p class="view-subtitle" id="order-view-subtitle">Keyboard-driven order entry</p>
            </div>
          </div>
          <div style="display:flex;gap:6px">
            ${Auth.isAdmin() ? `<button class="btn btn-ghost" id="btn-completed-bills" title="Completed Bills">
              <span class="material-symbols-outlined">receipt_long</span> Completed Bills
            </button>` : ''}
            ${account?.isLiquorEnabled ? `<button class="btn btn-ghost" id="btn-sync-liquor" title="Sync Liquor from API">
              <span class="material-symbols-outlined">sync</span> Sync Liquor
            </button>` : ''}
            <button class="btn btn-ghost" id="btn-clear-order" title="Clear Order">
              <span class="material-symbols-outlined">restart_alt</span> Clear
            </button>
          </div>
        </div>

        <!-- Table & Waiter Selection -->
        <div class="order-meta-row">
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Table</label>
            <div class="search-container">
              <span class="material-symbols-outlined">table_restaurant</span>
              <input type="text" class="form-input" id="table-search" placeholder="Search table..." autocomplete="off">
              <div class="search-dropdown" id="table-dropdown"></div>
            </div>
            <input type="hidden" id="table-id-input">
          </div>
          <div class="form-group" style="margin-bottom:0">
            <label class="form-label">Waiter</label>
            <div class="search-container">
              <span class="material-symbols-outlined">badge</span>
              <input type="text" class="form-input" id="supplier-search" placeholder="Search waiter..." autocomplete="off">
              <div class="search-dropdown" id="supplier-dropdown"></div>
            </div>
            <input type="hidden" id="supplier-id-input">
          </div>
        </div>

        <!-- Item Search -->
        <div class="form-group" style="margin-bottom:0">
          <label class="form-label">Add Item <span class="text-muted" style="text-transform:none;font-weight:400">(Type to search, Enter to add)</span></label>
          <div style="display:flex;gap:10px">
            <div class="search-container" style="flex:1">
              <span class="material-symbols-outlined">search</span>
              <input type="text" class="form-input form-input-lg" id="item-search" placeholder="Type item name..." autocomplete="off">
              <div class="search-dropdown" id="item-dropdown"></div>
            </div>
            <div style="width:90px">
              <input type="number" class="form-input form-input-lg" id="item-qty" value="1" min="1" placeholder="Qty" style="text-align:center;font-family:'JetBrains Mono',monospace">
            </div>
          </div>
        </div>

        <!-- Order Items Table -->
        <div class="order-items-container">
          <div class="order-items-table-wrapper">
            <table class="order-items-table">
              <thead>
                <tr>
                  <th style="width:30px">#</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th class="text-center" style="width:80px">Qty</th>
                  <th class="text-right" style="width:100px">Rate</th>
                  <th class="text-right" style="width:110px">Amount</th>
                  <th style="width:40px"></th>
                </tr>
              </thead>
              <tbody id="order-items-body">
                <tr>
                  <td colspan="7">
                    <div class="empty-state" style="padding:40px">
                      <span class="material-symbols-outlined">add_shopping_cart</span>
                      <p>No items added yet. Start typing to search items.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Panel: Order Summary -->
      <div class="order-summary-panel">
        <div class="order-summary-header">
          <span class="material-symbols-outlined">summarize</span>
          <h3>Order Summary</h3>
        </div>
        <div class="order-summary-body">
          <div class="summary-row">
            <span class="summary-label">Table</span>
            <span class="summary-value" id="summary-table">—</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Waiter</span>
            <span class="summary-value" id="summary-supplier">—</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Items</span>
            <span class="summary-value" id="summary-items-count">0</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Total Quantity</span>
            <span class="summary-value" id="summary-total-qty">0</span>
          </div>

          <div class="summary-row total">
            <span class="summary-label" style="font-size:1rem;font-weight:600;color:var(--text-primary)">Total Amount</span>
            <span class="summary-value total-amount" id="summary-total-amount">${formatCurrency(0)}</span>
          </div>
        </div>
        <div class="order-summary-actions">
          <button class="btn btn-warning btn-lg" id="btn-kot" title="Print Kitchen Order Ticket (F1)">
            <span class="material-symbols-outlined">print</span> Print KOT (F1)
          </button>
          <button class="btn btn-success btn-lg" id="btn-bill" title="Generate Direct Bill (F2)">
            <span class="material-symbols-outlined">receipt</span> Direct Bill (F2)
          </button>
          <button class="btn btn-secondary" id="btn-save-order" title="KOT & Complete — Print KOT only, mark as completed (F3)">
            <span class="material-symbols-outlined">done_all</span> KOT & Complete (F3)
          </button>
        </div>
      </div>
    </div>
  `;

  setupOrderEvents();
  setupOrderShortcuts();

  // Auto-focus table search (first step in workflow)
  setTimeout(() => {
    document.getElementById('table-search')?.focus();
  }, 200);
}

function setupOrderEvents() {
  // Table search (Step 1) — after selection, jump to Waiter
  setupSearchDropdown('table-search', 'table-dropdown', 'table-id-input',
    tables, (t) => t.name, (t) => t.id, (t) => {
      orderState.tableId = t.id;
      document.getElementById('summary-table').textContent = t.name;
      loadExistingOrderForTable(t.id);
    }, 'supplier-search', (item) => {
      return `<div>${item.name}</div>`;
    });

  // Waiter search (Step 2) — after selection, jump to Item Search
  setupSearchDropdown('supplier-search', 'supplier-dropdown', 'supplier-id-input',
    suppliers, (s) => s.name, (s) => s.id, (s) => {
      orderState.supplierId = s.id;
      document.getElementById('summary-supplier').textContent = s.name;
    }, 'item-search', (item) => {
      const codeLabel = item.code ? `<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:6px">${item.code}</code>` : '';
      return `${codeLabel}${item.name}`;
    }, (item, query) => {
      return item.name.toLowerCase().includes(query) ||
        (item.code || '').toLowerCase().includes(query);
    });

  // Item search (Step 3 & 4)
  setupItemSearch();

  // Clear order
  document.getElementById('btn-clear-order')?.addEventListener('click', () => {
    resetOrderAndUI();
    showToast('Order cleared', 'info');
  });

  // Completed Bills
  document.getElementById('btn-completed-bills')?.addEventListener('click', () => showCompletedBills());

  // Sync Liquor
  document.getElementById('btn-sync-liquor')?.addEventListener('click', handleSyncLiquor);

  // KOT button
  document.getElementById('btn-kot')?.addEventListener('click', handleKOT);

  // Bill button
  document.getElementById('btn-bill')?.addEventListener('click', handleBill);

  // Save button
  document.getElementById('btn-save-order')?.addEventListener('click', handleSaveOrder);

  // Listen for background liquor refreshes
  if (!window._liquorRefreshHandler) {
    window._liquorRefreshHandler = (e) => {
      const updatedLiquor = e.detail;
      if (!updatedLiquor || !Array.isArray(updatedLiquor)) return;

      // Update global menuItems: remove old liquor, add fresh
      const foodItems = menuItems.filter(i => !i.isLiquor);
      menuItems = [...foodItems, ...updatedLiquor];
      console.log(`Menu items updated with ${updatedLiquor.length} fresh liquor products`);
    };
    window.addEventListener('liquor-data-refreshed', window._liquorRefreshHandler);
  }

  // Clean up listener when container is cleared (optional but good practice)
  // For this simple SPA, we'll just let it overwrite or add a check
}

function setupSearchDropdown(inputId, dropdownId, hiddenId, data, labelFn, valueFn, onSelect, nextFocusId, renderItemFn, filterFn) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  const hidden = document.getElementById(hiddenId);
  let highlightIdx = -1;

  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const filtered = filterFn
      ? data.filter(d => filterFn(d, query))
      : data.filter(d => labelFn(d).toLowerCase().includes(query));
    highlightIdx = -1;
    renderDropdown(filtered);
  });

  input.addEventListener('focus', () => {
    const query = input.value.toLowerCase().trim();
    const filtered = filterFn
      ? data.filter(d => filterFn(d, query))
      : data.filter(d => labelFn(d).toLowerCase().includes(query));
    renderDropdown(filtered);
  });

  input.addEventListener('blur', () => {
    setTimeout(() => { dropdown.classList.remove('visible'); }, 200);
  });

  input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.search-dropdown-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightIdx = Math.min(highlightIdx + 1, items.length - 1);
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightIdx = Math.max(highlightIdx - 1, 0);
      updateHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectIdx = highlightIdx >= 0 ? highlightIdx : 0;
      if (items[selectIdx]) {
        items[selectIdx].click();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      dropdown.classList.remove('visible');
      // Move to specified next field
      if (nextFocusId) {
        document.getElementById(nextFocusId)?.focus();
      }
    }
  });

  function renderDropdown(filtered) {
    if (filtered.length === 0) {
      dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
    } else {
      dropdown.innerHTML = filtered.map((item, i) =>
        `<div class="search-dropdown-item" data-idx="${i}" data-value="${valueFn(item)}">${renderItemFn ? renderItemFn(item) : labelFn(item)}</div>`
      ).join('');
    }
    dropdown.classList.add('visible');

    dropdown.querySelectorAll('.search-dropdown-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        const item = filtered[i];
        input.value = labelFn(item);
        hidden.value = valueFn(item);
        dropdown.classList.remove('visible');
        onSelect(item);
        // Move to the specified next field
        if (nextFocusId) {
          document.getElementById(nextFocusId)?.focus();
        }
      });
    });
  }

  function updateHighlight(items) {
    items.forEach((el, i) => {
      el.classList.toggle('highlighted', i === highlightIdx);
    });
    if (items[highlightIdx]) {
      items[highlightIdx].scrollIntoView({ block: 'nearest' });
    }
  }
}

function setupItemSearch() {
  const input = document.getElementById('item-search');
  const dropdown = document.getElementById('item-dropdown');
  const qtyInput = document.getElementById('item-qty');
  let highlightIdx = -1;
  let filtered = [];

  if (!input || !dropdown) return;

  // Filter out liquor items with no stock
  function excludeOutOfStockLiquor(items) {
    return items.filter(item => !item.isLiquor || (item.currentStock || 0) > 0);
  }

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    if (query.length === 0) {
      // Show mix of food and liquor in initial list
      const food = menuItems.filter(i => !i.isLiquor).slice(0, 10);
      const liquor = menuItems.filter(i => i.isLiquor && (i.currentStock || 0) > 0).slice(0, 10);
      filtered = [...food, ...liquor];
    } else {
      filtered = excludeOutOfStockLiquor(menuItems).filter(item =>
        item.name.toLowerCase().includes(query) ||
        (item.category || '').toLowerCase().includes(query) ||
        (item.brand || '').toLowerCase().includes(query) ||
        (item.code || '').toLowerCase().includes(query) ||
        (item.barcode || '').toLowerCase().includes(query)
      ).sort((a, b) => {
        const codeA = String(a.code || '');
        const codeB = String(b.code || '');
        if (codeA.toLowerCase() === query && codeB.toLowerCase() !== query) return -1;
        if (codeB.toLowerCase() === query && codeA.toLowerCase() !== query) return 1;
        if (codeA && codeB) {
          const numA = parseInt(codeA);
          const numB = parseInt(codeB);
          if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
          return codeA.localeCompare(codeB, undefined, { numeric: true });
        }
        if (codeA) return -1;
        if (codeB) return 1;
        return a.name.localeCompare(b.name);
      });

      // Barcode Scanner Logic: 
      // If the query exactly matches an item's code/UPC, auto-select it
      if (query.length >= 8) {
        // Search in ALL items to allow finding out-of-stock items via barcode
        const exactMatch = menuItems.find(item =>
          (item.code || '').toLowerCase() === query ||
          (item.barcode || '').toLowerCase() === query
        );
        if (exactMatch) {
          if (!filtered.includes(exactMatch)) {
            filtered = [exactMatch, ...filtered];
          }
          const selectIdx = filtered.indexOf(exactMatch);
          input.dataset.selectedIdx = selectIdx;
          dropdown.classList.remove('visible');
          const qtyEl = document.getElementById('item-qty');
          qtyEl?.focus();
          qtyEl?.select();
          console.log(`Barcode match found: ${exactMatch.name}`);
        }
      }
    }
    highlightIdx = filtered.length > 0 ? 0 : -1;
    renderItemDropdown();
  });

  input.addEventListener('focus', () => {
    const query = input.value.toLowerCase().trim();
    if (query.length === 0) {
      // Show mix of food and liquor in initial list
      const food = menuItems.filter(i => !i.isLiquor).slice(0, 10);
      const liquor = menuItems.filter(i => i.isLiquor && (i.currentStock || 0) > 0).slice(0, 10);
      filtered = [...food, ...liquor];
    } else {
      filtered = excludeOutOfStockLiquor(menuItems).filter(item =>
        item.name.toLowerCase().includes(query) ||
        (item.category || '').toLowerCase().includes(query) ||
        (item.brand || '').toLowerCase().includes(query) ||
        (item.code || '').toLowerCase().includes(query) ||
        (item.barcode || '').toLowerCase().includes(query)
      ).sort((a, b) => {
        const codeA = String(a.code || '');
        const codeB = String(b.code || '');
        if (codeA.toLowerCase() === query && codeB.toLowerCase() !== query) return -1;
        if (codeB.toLowerCase() === query && codeA.toLowerCase() !== query) return 1;
        if (codeA && codeB) {
          const numA = parseInt(codeA);
          const numB = parseInt(codeB);
          if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
          return codeA.localeCompare(codeB, undefined, { numeric: true });
        }
        if (codeA) return -1;
        if (codeB) return 1;
        return a.name.localeCompare(b.name);
      });
    }
    highlightIdx = filtered.length > 0 ? 0 : -1;
    renderItemDropdown();
  });

  input.addEventListener('blur', () => {
    setTimeout(() => { dropdown.classList.remove('visible'); }, 200);
  });

  input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.search-dropdown-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightIdx = Math.min(highlightIdx + 1, items.length - 1);
      updateItemHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightIdx = Math.max(highlightIdx - 1, 0);
      updateItemHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectIdx = highlightIdx >= 0 ? highlightIdx : 0;
      if (filtered[selectIdx]) {
        // Move to Qty field (Step 4) instead of adding immediately
        const qtyEl = document.getElementById('item-qty');
        // Store the selected item index so Enter in qty can add it
        input.dataset.selectedIdx = selectIdx;
        dropdown.classList.remove('visible');
        qtyEl?.focus();
        qtyEl?.select();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      qtyInput.focus();
      qtyInput.select();
    }
  });

  // Qty input - Enter to add item (Step 4: final step)
  qtyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Get the selected item from item search
      const selectedIdx = parseInt(input.dataset.selectedIdx);
      if (!isNaN(selectedIdx) && filtered[selectedIdx]) {
        addItemToOrder(filtered[selectedIdx]);
      } else if (highlightIdx >= 0 && filtered[highlightIdx]) {
        addItemToOrder(filtered[highlightIdx]);
      } else {
        showToast('Please select an item first', 'warning');
        input.focus();
      }
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      input.focus();
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      input.focus();
    }
  });

  function renderItemDropdown() {
    if (filtered.length === 0) {
      dropdown.innerHTML = '<div class="search-no-results">No items found</div>';
    } else {
      dropdown.innerHTML = filtered.map((item, i) =>
        `<div class="search-dropdown-item ${i === highlightIdx ? 'highlighted' : ''}" data-idx="${i}">
          <div style="flex:1">
            ${item.code ? `<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.7rem;font-weight:700;margin-right:4px">${item.code}</code>` : ''}
            ${item.barcode ? `<span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--text-muted);margin-right:8px">[${item.barcode}]</span>` : ''}
            <span style="font-weight:600">${item.name}</span>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
              ${item.category} ${item.brand ? `• ${item.brand}` : ''}
              ${item.isLiquor ? `<span class="status-badge" style="background:#7c3aed20;color:#7c3aed;font-size:0.6rem;padding:1px 4px;margin-left:4px">🍺 LIQUOR</span>
              <span style="margin-left:8px">Stock: <strong>${item.currentStock || 0}</strong></span>` : ''}
            </div>
          </div>
          <span class="item-price">${formatCurrency(item.sellingPrice)}</span>
        </div>`
      ).join('');
    }
    dropdown.classList.add('visible');

    dropdown.querySelectorAll('.search-dropdown-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        addItemToOrder(filtered[i]);
      });
    });
  }

  function updateItemHighlight(items) {
    items.forEach((el, i) => {
      el.classList.toggle('highlighted', i === highlightIdx);
    });
    if (items[highlightIdx]) {
      items[highlightIdx].scrollIntoView({ block: 'nearest' });
    }
  }

  function addItemToOrder(menuItem) {
    // Validate: Table and Waiter must be selected first
    if (!orderState.tableId) {
      showToast('Please select a Table first', 'warning');
      document.getElementById('table-search')?.focus();
      return;
    }
    if (!orderState.supplierId) {
      showToast('Please select a Waiter first', 'warning');
      document.getElementById('supplier-search')?.focus();
      return;
    }

    const qty = parseInt(qtyInput.value) || 1;
    if (qty <= 0) {
      showToast('Quantity must be at least 1', 'warning');
      qtyInput.focus();
      qtyInput.select();
      return;
    }

    const existing = orderState.items.find(i => i.itemId === menuItem.id);

    if (existing) {
      existing.quantity += qty;
      existing.amount = existing.quantity * existing.price;
    } else {
      orderState.items.push({
        itemId: menuItem.id,
        itemName: menuItem.name,
        category: menuItem.category,
        quantity: qty,
        price: menuItem.sellingPrice,
        amount: qty * menuItem.sellingPrice,
        incentivePercent: menuItem.incentivePercent || 0,
        kotPrintedQty: 0,
      });
    }

    renderOrderItems();
    updateSummary();

    // Reset item search & qty, keep table/waiter selected
    input.value = '';
    input.dataset.selectedIdx = '';
    qtyInput.value = '1';
    dropdown.classList.remove('visible');
    input.focus();

    showToast(`${menuItem.name} × ${qty} added`, 'success', 1500);
  }
}

function renderOrderItems() {
  const tbody = document.getElementById('order-items-body');
  if (!tbody) return;

  if (orderState.items.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state" style="padding:40px">
            <span class="material-symbols-outlined">add_shopping_cart</span>
            <p>No items added yet. Start typing to search items.</p>
          </div>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = orderState.items.map((item, i) => `
    <tr>
      <td class="text-muted">${i + 1}</td>
      <td><strong>${item.itemName}</strong></td>
      <td><span class="status-badge status-active" style="background:var(--bg-elevated);color:var(--text-secondary)">${item.category}</span></td>
      <td class="text-center">
        <input type="number" class="qty-input" data-index="${i}" value="${item.quantity}" min="1">
      </td>
      <td class="text-right font-mono">${formatCurrency(item.price)}</td>
      <td class="text-right amount font-mono">${formatCurrency(item.amount)}</td>
      <td>
        <button class="remove-btn" data-index="${i}" title="Remove (Delete)">
          <span class="material-symbols-outlined" style="font-size:18px">close</span>
        </button>
      </td>
    </tr>
  `).join('');

  // Qty change handlers
  tbody.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.index);
      const newQty = parseInt(e.target.value) || 1;
      orderState.items[idx].quantity = newQty;
      orderState.items[idx].amount = newQty * orderState.items[idx].price;
      renderOrderItems();
      updateSummary();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('item-search')?.focus();
      }
    });
  });

  // Remove handlers
  tbody.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const removed = orderState.items.splice(idx, 1)[0];
      renderOrderItems();
      updateSummary();
      showToast(`${removed.itemName} removed`, 'warning', 1500);
    });
  });
}

function updateSummary() {
  const totals = calculateTotals();
  const totalQty = orderState.items.reduce((s, i) => s + i.quantity, 0);
  const el = (id) => document.getElementById(id);

  if (el('summary-items-count')) el('summary-items-count').textContent = orderState.items.length;
  if (el('summary-total-qty')) el('summary-total-qty').textContent = totalQty;



  if (el('summary-total-amount')) el('summary-total-amount').textContent = formatCurrency(totals.totalAmount);
}

function setupOrderShortcuts() {
  registerShortcut('f1', handleKOT, 'Print KOT');
  registerShortcut('f2', handleBill, 'Direct Bill');
  registerShortcut('f3', handleSaveOrder, 'KOT & Complete');
  registerShortcut('escape', () => {
    resetOrderAndUI();
    showToast('Order cleared', 'info');
  }, 'Cancel');
  registerShortcut('alt+n', () => {
    resetOrderAndUI();
    showToast('New order started', 'info');
  }, 'New Order');
}


async function handleKOT() {
  if (orderState.items.length === 0) {
    showToast('Add items before printing KOT', 'warning');
    return;
  }

  try {
    // Compute delta items (only new or increased-quantity items since last KOT)
    const deltaItems = [];
    for (const item of orderState.items) {
      const printed = item.kotPrintedQty || 0;
      const newQty = item.quantity - printed;
      if (newQty > 0) {
        deltaItems.push({ ...item, quantity: newQty });
      }
    }

    if (deltaItems.length === 0) {
      showToast('No new items to print. All items already sent via KOT.', 'warning');
      return;
    }

    let order;
    if (orderState.editingOrderId) {
      // Update existing order — save full items with updated kotPrintedQty
      order = await DB.getById('orders', orderState.editingOrderId);
      // Update kotPrintedQty to current quantity for all items
      const updatedItems = orderState.items.map(item => ({ ...item, kotPrintedQty: item.quantity }));
      order.items = updatedItems;
      const totals = calculateTotals();
      order.subTotal = totals.subTotal;
      order.acCharge = totals.acCharge;
      order.totalAmount = totals.totalAmount;
      order.supplierId = orderState.supplierId;
      order.tableId = orderState.tableId;
      await DB.update('orders', order);
      // Sync local state
      orderState.items = updatedItems;
    } else {
      // Create new order — all items are new, set kotPrintedQty = quantity
      const orderNumber = await DB.getNextOrderNumber();
      const savedItems = orderState.items.map(item => ({ ...item, kotPrintedQty: item.quantity }));
      const totals = calculateTotals();
      order = {
        orderNumber,
        supplierId: orderState.supplierId,
        tableId: orderState.tableId,
        items: savedItems,
        subTotal: totals.subTotal,
        acCharge: totals.acCharge,
        totalAmount: totals.totalAmount,
        status: 'open',
        type: 'kot',
        createdAt: new Date().toISOString(),
        billedAt: null,
      };
      await DB.add('orders', order);
      // Sync local state
      orderState.items = savedItems;
    }

    // Get names for print
    const supplier = orderState.supplierId ? suppliers.find(s => s.id === orderState.supplierId) : null;
    const table = orderState.tableId ? tables.find(t => t.id === orderState.tableId) : null;
    const supplierName = supplier?.name || '';
    const tableName = table?.name || 'N/A';

    // Split delta items into Kitchen vs Counter
    const kitchenItems = deltaItems.filter(item => !isCounterItem(item));
    const counterItems = deltaItems.filter(item => isCounterItem(item));

    if (kitchenItems.length > 0 && counterItems.length > 0) {
      // Both types — print Kitchen KOT first, then Counter KOT after a delay
      const kitchenOrder = { ...order, items: kitchenItems };
      printContent(generateKOTPrintHTML(kitchenOrder, supplierName, tableName));

      setTimeout(() => {
        printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
      }, 1000);
    } else if (counterItems.length > 0) {
      printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
    } else {
      const printOrder = { ...order, items: kitchenItems };
      printContent(generateKOTPrintHTML(printOrder, supplierName, tableName));
    }

    const deltaLabel = deltaItems.map(i => `${i.itemName} ×${i.quantity}`).join(', ');
    showToast(`KOT #${order.orderNumber} — ${deltaLabel}`, 'success');

    // Reset order
    resetOrderAndUI();
  } catch (err) {
    showToast('Failed to create KOT: ' + err.message, 'error');
  }
}

async function handleBill() {
  if (orderState.items.length === 0) {
    showToast('Add items before generating bill', 'warning');
    return;
  }

  try {
    const now = new Date().toISOString();
    let order;

    // 1. Identify unprinted items (delta)
    const deltaItems = [];
    for (const item of orderState.items) {
      const printed = item.kotPrintedQty || 0;
      const newQty = item.quantity - printed;
      if (newQty > 0) {
        deltaItems.push({ ...item, quantity: newQty });
      }
    }

    // 2. Prepare order with updated kotPrintedQty
    const finalizedItems = orderState.items.map(item => ({ ...item, kotPrintedQty: item.quantity }));

    if (orderState.editingOrderId) {
      // Update existing order → mark as billed
      order = await DB.getById('orders', orderState.editingOrderId);
      order.items = finalizedItems;
      const totals = calculateTotals();
      order.subTotal = totals.subTotal;
      order.acCharge = totals.acCharge;
      order.totalAmount = totals.totalAmount;
      order.supplierId = orderState.supplierId;
      order.tableId = orderState.tableId;
      order.status = 'billed';
      order.type = 'bill';
      order.billedAt = now;
      order.date = todayISO();
      await DB.update('orders', order);
    } else {
      // Create new billed order
      const orderNumber = await DB.getNextOrderNumber();
      const totals = calculateTotals();
      order = {
        orderNumber,
        supplierId: orderState.supplierId,
        tableId: orderState.tableId,
        items: finalizedItems,
        subTotal: totals.subTotal,
        acCharge: totals.acCharge,
        totalAmount: totals.totalAmount,
        status: 'billed',
        type: 'bill',
        createdAt: now,
        billedAt: now,
        date: todayISO(),
      };
      await DB.add('orders', order);
    }

    // 3. Print KOT if there were unprinted items
    if (deltaItems.length > 0) {
      const supplierName = suppliers.find(s => s.id === orderState.supplierId)?.name || '';
      const tableName = tables.find(t => t.id === orderState.tableId)?.name || 'N/A';

      const kitchenItems = deltaItems.filter(item => !isCounterItem(item));
      const counterItems = deltaItems.filter(item => isCounterItem(item));

      if (kitchenItems.length > 0) {
        const kitchenOrder = { ...order, items: kitchenItems };
        printContent(generateKOTPrintHTML(kitchenOrder, supplierName, tableName));
      }
      if (counterItems.length > 0) {
        printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
      }
    }

    // Update ingredient stock (consumption)
    await updateIngredientConsumption(order.items);

    const supplier = orderState.supplierId ? suppliers.find(s => s.id === orderState.supplierId) : null;
    const table = orderState.tableId ? tables.find(t => t.id === orderState.tableId) : null;

    // Print Bill
    const printHTML = generateBillPrintHTML(order, supplier?.name || '', table?.name || 'N/A');
    printContent(printHTML);

    // Record Wallet Transaction (Income adds to wallet, excluding LIQUOR items only)
    const isLiquor = (item) => (item.category || '').toUpperCase().trim() === 'LIQUOR' || item.isLiquor;
    const nonLiquorSubtotal = finalizedItems
      .filter(item => !isLiquor(item))
      .reduce((sum, item) => sum + item.amount, 0);

    if (nonLiquorSubtotal > 0) {
      const totals = calculateTotals();
      const proportionalAc = totals.subTotal > 0 ? (nonLiquorSubtotal / totals.subTotal) * totals.acCharge : 0;
      const walletAmount = nonLiquorSubtotal + proportionalAc;
      await DB.recordWalletTransaction('income', walletAmount, `Bill Income: #${order.orderNumber}`, order.id);
    }

    showToast(`Bill #${order.orderNumber} generated!`, 'success');

    // Reset
    resetOrderAndUI();
  } catch (err) {
    showToast('Failed to generate bill: ' + err.message, 'error');
  }
}

async function handleSaveOrder() {
  // KOT & Complete: Print KOT, mark as billed/completed, update stock/wallet, NO bill print
  if (orderState.items.length === 0) {
    showToast('Add items before saving', 'warning');
    return;
  }

  try {
    const now = new Date().toISOString();
    let order;

    // 1. Identify unprinted items (delta) for KOT
    const deltaItems = [];
    for (const item of orderState.items) {
      const printed = item.kotPrintedQty || 0;
      const newQty = item.quantity - printed;
      if (newQty > 0) {
        deltaItems.push({ ...item, quantity: newQty });
      }
    }

    // Prepare order with updated kotPrintedQty
    const finalizedItems = orderState.items.map(item => ({ ...item, kotPrintedQty: item.quantity }));

    if (orderState.editingOrderId) {
      // Update existing order → mark as billed
      order = await DB.getById('orders', orderState.editingOrderId);
      order.items = finalizedItems;
      const totals = calculateTotals();
      order.subTotal = totals.subTotal;
      order.acCharge = totals.acCharge;
      order.totalAmount = totals.totalAmount;
      order.supplierId = orderState.supplierId;
      order.tableId = orderState.tableId;
      order.status = 'billed';
      order.type = 'kot-complete';
      order.billedAt = now;
      order.date = todayISO();
      await DB.update('orders', order);
    } else {
      // Create new billed order
      const orderNumber = await DB.getNextOrderNumber();
      const totals = calculateTotals();
      order = {
        orderNumber,
        supplierId: orderState.supplierId,
        tableId: orderState.tableId,
        items: finalizedItems,
        subTotal: totals.subTotal,
        acCharge: totals.acCharge,
        totalAmount: totals.totalAmount,
        status: 'billed',
        type: 'kot-complete',
        createdAt: now,
        billedAt: now,
        date: todayISO(),
      };
      await DB.add('orders', order);
    }

    // 2. Print KOT if there were unprinted items
    if (deltaItems.length > 0) {
      const supplierName = suppliers.find(s => s.id === orderState.supplierId)?.name || '';
      const tableName = tables.find(t => t.id === orderState.tableId)?.name || 'N/A';

      const kitchenItems = deltaItems.filter(item => !isCounterItem(item));
      const counterItems = deltaItems.filter(item => isCounterItem(item));

      if (kitchenItems.length > 0 && counterItems.length > 0) {
        const kitchenOrder = { ...order, items: kitchenItems };
        printContent(generateKOTPrintHTML(kitchenOrder, supplierName, tableName));
        setTimeout(() => {
          printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
        }, 1000);
      } else if (counterItems.length > 0) {
        printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
      } else {
        const printOrder = { ...order, items: kitchenItems };
        printContent(generateKOTPrintHTML(printOrder, supplierName, tableName));
      }
    }

    // 3. Update ingredient/product stock (consumption)
    await updateIngredientConsumption(order.items);

    // 4. Record Wallet Transaction (Income, excluding LIQUOR items only)
    const isLiquor = (item) => (item.category || '').toUpperCase().trim() === 'LIQUOR' || item.isLiquor;
    const nonLiquorSubtotal = finalizedItems
      .filter(item => !isLiquor(item))
      .reduce((sum, item) => sum + item.amount, 0);

    if (nonLiquorSubtotal > 0) {
      const totals = calculateTotals();
      const proportionalAc = totals.subTotal > 0 ? (nonLiquorSubtotal / totals.subTotal) * totals.acCharge : 0;
      const walletAmount = nonLiquorSubtotal + proportionalAc;
      await DB.recordWalletTransaction('income', walletAmount, `Bill Income: #${order.orderNumber}`, order.id);
    }

    // NO Bill print — only KOT was printed
    showToast(`KOT #${order.orderNumber} printed & completed!`, 'success');

    // Reset
    resetOrderAndUI();
  } catch (err) {
    showToast('Failed: ' + err.message, 'error');
  }
}

async function handleSyncLiquor() {
  console.log('Sync Liquor button clicked');
  const btn = document.getElementById('btn-sync-liquor');
  if (!btn) {
    console.warn('Sync button not found in DOM');
    return;
  }

  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="material-symbols-outlined spinning">sync</span> Syncing...';

  try {
    showToast('Syncing liquor products from API...', 'info');
    console.log('Calling LiquorApi.fetchProducts()...');
    const products = await LiquorApi.fetchProducts();
    console.log(`LiquorApi.fetchProducts() returned ${products ? products.length : 'null'} products`);

    if (products && products.length > 0) {
      // Update global menuItems: remove old liquor, add fresh
      const foodItems = menuItems.filter(i => !i.isLiquor);
      menuItems = [...foodItems, ...products];

      showToast(`Successfully synced ${products.length} liquor products`, 'success');
      console.log(`Liquor sync complete. Total menu items: ${menuItems.length}`);
    } else {
      showToast('No liquor products found or sync failed', 'warning');
    }
  } catch (err) {
    console.error('Liquor sync error:', err);
    showToast('Sync failed: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHtml;
  }
}

// Reset order state AND UI fields, used after KOT/Bill/Save
function resetOrderAndUI() {
  resetOrder();
  document.getElementById('table-search').value = '';
  document.getElementById('supplier-search').value = '';
  document.getElementById('summary-table').textContent = '—';
  document.getElementById('summary-supplier').textContent = '—';
  renderOrderItems();
  updateSummary();
  updateOrderTitle();
  document.getElementById('table-search')?.focus();

  // Notify listeners to refresh reports/stats (like sidebar sales)
  window.dispatchEvent(new CustomEvent('orders-updated'));
}

// Update the title bar to reflect editing vs new order state
function updateOrderTitle() {
  const titleEl = document.getElementById('order-view-title');
  const subtitleEl = document.getElementById('order-view-subtitle');
  if (orderState.editingOrderId) {
    const existingNumber = orderState._orderNumber || '';
    titleEl.textContent = `Editing Order #${existingNumber}`;
    subtitleEl.innerHTML = `<span style="color:var(--warning)">⚡ Active order loaded — add items or generate bill</span>`;
  } else {
    titleEl.textContent = 'New Order';
    subtitleEl.textContent = 'Keyboard-driven order entry';
  }
}

// Load existing open order for a table (if any)
async function loadExistingOrderForTable(tableId) {
  const activeOrders = await DB.getByIndex('orders', 'status', 'open');
  const activeOrder = activeOrders.find(o => o.tableId === tableId);

  if (activeOrder) {
    // Pre-fill the order with existing data
    orderState.editingOrderId = activeOrder.id;
    orderState._orderNumber = activeOrder.orderNumber;
    orderState.items = [...activeOrder.items];
    orderState.supplierId = activeOrder.supplierId;
    orderState.tableId = activeOrder.tableId;

    // Restore waiter field
    if (activeOrder.supplierId) {
      const supplier = suppliers.find(s => s.id === activeOrder.supplierId);
      if (supplier) {
        document.getElementById('supplier-search').value = supplier.name;
        document.getElementById('supplier-id-input').value = supplier.id;
        document.getElementById('summary-supplier').textContent = supplier.name;
      }
    }

    renderOrderItems();
    updateSummary();
    updateOrderTitle();

    showToast(`Active Order #${activeOrder.orderNumber} loaded for this table`, 'info');

    // Jump to item search since table & supplier are already set
    setTimeout(() => document.getElementById('item-search')?.focus(), 100);
  } else {
    // No active order — reset editing state for fresh order
    orderState.editingOrderId = null;
    orderState._orderNumber = null;
    orderState.items = [];
    renderOrderItems();
    updateSummary();
    updateOrderTitle();
  }
}

async function updateIngredientConsumption(orderItems) {
  const DIRECT_PURCHASE_CATEGORIES = ['COOL DRINKS', 'CIGARETTE'];

  for (const orderItem of orderItems) {
    // Check if this is a direct-purchase product (no ingredients)
    const item = await DB.getById('items', orderItem.itemId);
    if (item && DIRECT_PURCHASE_CATEGORIES.includes((item.category || '').toUpperCase())) {
      // Deduct product stock directly
      item.currentStock = Math.max(0, (item.currentStock || 0) - orderItem.quantity);
      await DB.update('items', item);
    } else {
      // Deduct ingredient stock via recipes
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
}

// ===== Completed Bills Modal =====
async function showCompletedBills() {
  const today = todayISO();
  const billedOrdersQuery = await DB.getByIndex('orders', 'status', 'billed');
  const billedOrders = billedOrdersQuery
    .filter(o => (o.billedAt || o.createdAt || '').startsWith(today))
    .sort((a, b) => (b.billedAt || b.createdAt || '').localeCompare(a.billedAt || a.createdAt || ''));

  const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s]));
  const tableMap = Object.fromEntries(tables.map(t => [t.id, t]));

  const content = billedOrders.length === 0
    ? `<div class="empty-state" style="padding:40px">
        <span class="material-symbols-outlined">receipt_long</span>
        <p>No completed bills for today</p>
      </div>`
    : `<table class="data-table">
        <thead>
          <tr>
            <th>Bill #</th>
            <th>Table</th>
            <th>Waiter</th>
            <th>Items</th>
            <th class="text-right">Amount</th>
            <th>Time</th>
            <th class="text-center">Reprint</th>
          </tr>
        </thead>
        <tbody>
          ${billedOrders.map(o => {
      const tbl = tableMap[o.tableId];
      const sup = supplierMap[o.supplierId];
      const time = o.billedAt || o.createdAt || '';
      const timeStr = time ? new Date(time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—';
      const itemCount = (o.items || []).reduce((s, i) => s + i.quantity, 0);
      return `
              <tr>
                <td><strong>${o.orderNumber || o.id}</strong></td>
                <td>${tbl?.name || '—'}</td>
                <td>${sup?.name || '—'}</td>
                <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${itemCount} item(s)</span></td>
                <td class="text-right amount font-mono">${formatCurrency(o.totalAmount)}</td>
                <td class="text-muted">${timeStr}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-primary btn-reprint-bill" data-id="${o.id}" title="Reprint Bill">
                    <span class="material-symbols-outlined" style="font-size:16px">print</span>
                  </button>
                </td>
              </tr>`;
    }).join('')}
        </tbody>
        <tfoot>
          <tr style="font-weight:700">
            <td colspan="4" class="text-right">Total (${billedOrders.length} bills)</td>
            <td class="text-right amount font-mono">${formatCurrency(billedOrders.reduce((s, o) => s + o.totalAmount, 0))}</td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>`;

  showModal(`Completed Bills — ${formatDate(today)}`, content, {
    large: true,
    footer: `<button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>`
  });

  // Attach reprint handlers
  document.querySelectorAll('.btn-reprint-bill').forEach(btn => {
    btn.addEventListener('click', async () => {
      const order = await DB.getById('orders', parseInt(btn.dataset.id));
      if (!order) { showToast('Order not found', 'error'); return; }

      const sup = supplierMap[order.supplierId];
      const tbl = tableMap[order.tableId];
      const printHTML = generateBillPrintHTML(order, sup?.name || '', tbl?.name || 'N/A');
      printContent(printHTML);
      showToast(`Reprinting Bill #${order.orderNumber || order.id}`, 'success');
    });
  });
}

export function destroyOrderView() {
  unregisterShortcut('f1');
  unregisterShortcut('f2');
  unregisterShortcut('ctrl+s');
}
