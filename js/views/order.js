// ===== Order Entry View (Keyboard-First POS) =====
import { DB } from '../db.js';
import { formatCurrency, showToast, printContent, generateKOTPrintHTML, generateBillPrintHTML } from '../utils.js';
import { registerShortcut, unregisterShortcut } from '../keyboard.js';

let orderState = {
  supplierId: null,
  tableId: null,
  items: [],
  editingOrderId: null,
};

let suppliers = [];
let tables = [];
let menuItems = [];

function resetOrder() {
  orderState = { supplierId: null, tableId: null, items: [], editingOrderId: null };
}

function calculateTotal() {
  return orderState.items.reduce((sum, item) => sum + item.amount, 0);
}

export async function renderOrderView(container) {
  suppliers = (await DB.getAll('suppliers')).filter(s => s.active);
  tables = (await DB.getAll('tables')).filter(t => t.active);
  menuItems = (await DB.getAll('items')).filter(i => i.active);

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
          <button class="btn btn-ghost" id="btn-clear-order" title="Clear Order">
            <span class="material-symbols-outlined">restart_alt</span> Clear
          </button>
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
          <button class="btn btn-secondary" id="btn-save-order" title="Save Order (Ctrl+S)">
            <span class="material-symbols-outlined">save</span> Save Order
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
  // Table search (Step 1) — after selection, check for active order then jump to Waiter
  setupSearchDropdown('table-search', 'table-dropdown', 'table-id-input',
    tables, (t) => t.name, (t) => t.id, async (t) => {
      orderState.tableId = t.id;
      document.getElementById('summary-table').textContent = t.name;
      // Check if this table has an active/open order
      await loadExistingOrderForTable(t.id);
    }, 'supplier-search');

  // Waiter search (Step 2) — after selection, jump to Item Search
  setupSearchDropdown('supplier-search', 'supplier-dropdown', 'supplier-id-input',
    suppliers, (s) => s.name, (s) => s.id, (s) => {
      orderState.supplierId = s.id;
      document.getElementById('summary-supplier').textContent = s.name;
    }, 'item-search');

  // Item search (Step 3 & 4)
  setupItemSearch();

  // Clear order
  document.getElementById('btn-clear-order')?.addEventListener('click', () => {
    resetOrder();
    renderOrderItems();
    updateSummary();
    document.getElementById('table-search').value = '';
    document.getElementById('supplier-search').value = '';
    document.getElementById('summary-table').textContent = '—';
    document.getElementById('summary-supplier').textContent = '—';
    document.getElementById('table-search')?.focus();
    showToast('Order cleared', 'info');
  });

  // KOT button
  document.getElementById('btn-kot')?.addEventListener('click', handleKOT);

  // Bill button
  document.getElementById('btn-bill')?.addEventListener('click', handleBill);

  // Save button
  document.getElementById('btn-save-order')?.addEventListener('click', handleSaveOrder);
}

function setupSearchDropdown(inputId, dropdownId, hiddenId, data, labelFn, valueFn, onSelect, nextFocusId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  const hidden = document.getElementById(hiddenId);
  let highlightIdx = -1;

  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const filtered = data.filter(d => labelFn(d).toLowerCase().includes(query));
    highlightIdx = -1;
    renderDropdown(filtered);
  });

  input.addEventListener('focus', () => {
    const query = input.value.toLowerCase().trim();
    const filtered = data.filter(d => labelFn(d).toLowerCase().includes(query));
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
        `<div class="search-dropdown-item" data-idx="${i}" data-value="${valueFn(item)}">${labelFn(item)}</div>`
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

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    if (query.length === 0) {
      filtered = menuItems.slice(0, 15);
    } else {
      filtered = menuItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    highlightIdx = filtered.length > 0 ? 0 : -1;
    renderItemDropdown();
  });

  input.addEventListener('focus', () => {
    const query = input.value.toLowerCase().trim();
    if (query.length === 0) {
      filtered = menuItems.slice(0, 15);
    } else {
      filtered = menuItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
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
          <div>
            <span>${item.name}</span>
            <span class="item-category">${item.category}</span>
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
  const total = calculateTotal();
  const totalQty = orderState.items.reduce((s, i) => s + i.quantity, 0);
  const el = (id) => document.getElementById(id);
  if (el('summary-items-count')) el('summary-items-count').textContent = orderState.items.length;
  if (el('summary-total-qty')) el('summary-total-qty').textContent = totalQty;
  if (el('summary-total-amount')) el('summary-total-amount').textContent = formatCurrency(total);
}

function setupOrderShortcuts() {
  registerShortcut('f1', handleKOT, 'Print KOT');
  registerShortcut('f2', handleBill, 'Generate Bill');
  registerShortcut('ctrl+s', handleSaveOrder, 'Save Order');
}

async function handleKOT() {
  if (orderState.items.length === 0) {
    showToast('Add items before printing KOT', 'warning');
    return;
  }

  try {
    let order;
    if (orderState.editingOrderId) {
      // Update existing order
      order = await DB.getById('orders', orderState.editingOrderId);
      order.items = [...orderState.items];
      order.totalAmount = calculateTotal();
      order.supplierId = orderState.supplierId;
      order.tableId = orderState.tableId;
      await DB.update('orders', order);
    } else {
      // Create new order
      const orderNumber = await DB.getNextOrderNumber();
      order = {
        orderNumber,
        supplierId: orderState.supplierId,
        tableId: orderState.tableId,
        items: [...orderState.items],
        totalAmount: calculateTotal(),
        status: 'open',
        type: 'kot',
        createdAt: new Date().toISOString(),
        billedAt: null,
      };
      await DB.add('orders', order);
    }

    // Get names for print
    const supplier = orderState.supplierId ? suppliers.find(s => s.id === orderState.supplierId) : null;
    const table = orderState.tableId ? tables.find(t => t.id === orderState.tableId) : null;

    // Print KOT
    const printHTML = generateKOTPrintHTML(order, supplier?.name || '', table?.name || 'N/A');
    printContent(printHTML);

    showToast(`KOT #${order.orderNumber} sent to kitchen!`, 'success');

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

    if (orderState.editingOrderId) {
      // Update existing order → mark as billed
      order = await DB.getById('orders', orderState.editingOrderId);
      order.items = [...orderState.items];
      order.totalAmount = calculateTotal();
      order.supplierId = orderState.supplierId;
      order.tableId = orderState.tableId;
      order.status = 'billed';
      order.type = 'bill';
      order.billedAt = now;
      await DB.update('orders', order);
    } else {
      // Create new billed order
      const orderNumber = await DB.getNextOrderNumber();
      order = {
        orderNumber,
        supplierId: orderState.supplierId,
        tableId: orderState.tableId,
        items: [...orderState.items],
        totalAmount: calculateTotal(),
        status: 'billed',
        type: 'bill',
        createdAt: now,
        billedAt: now,
      };
      await DB.add('orders', order);
    }

    // Update ingredient stock (consumption)
    await updateIngredientConsumption(order.items);

    const supplier = orderState.supplierId ? suppliers.find(s => s.id === orderState.supplierId) : null;
    const table = orderState.tableId ? tables.find(t => t.id === orderState.tableId) : null;

    // Print Bill
    const printHTML = generateBillPrintHTML(order, supplier?.name || '', table?.name || 'N/A');
    printContent(printHTML);

    showToast(`Bill #${order.orderNumber} generated!`, 'success');

    // Reset
    resetOrderAndUI();
  } catch (err) {
    showToast('Failed to generate bill: ' + err.message, 'error');
  }
}

async function handleSaveOrder() {
  if (orderState.items.length === 0) {
    showToast('Add items before saving', 'warning');
    return;
  }

  try {
    let order;

    if (orderState.editingOrderId) {
      // Update existing order
      order = await DB.getById('orders', orderState.editingOrderId);
      order.items = [...orderState.items];
      order.totalAmount = calculateTotal();
      order.supplierId = orderState.supplierId;
      order.tableId = orderState.tableId;
      await DB.update('orders', order);
      showToast(`Order #${order.orderNumber} updated!`, 'success');
    } else {
      // Create new saved order
      const orderNumber = await DB.getNextOrderNumber();
      order = {
        orderNumber,
        supplierId: orderState.supplierId,
        tableId: orderState.tableId,
        items: [...orderState.items],
        totalAmount: calculateTotal(),
        status: 'open',
        type: 'saved',
        createdAt: new Date().toISOString(),
        billedAt: null,
      };
      await DB.add('orders', order);
      showToast(`Order #${orderNumber} saved!`, 'success');
    }

    resetOrderAndUI();
  } catch (err) {
    showToast('Failed to save order: ' + err.message, 'error');
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
  const allOrders = await DB.getAll('orders');
  const activeOrder = allOrders.find(o => o.tableId === tableId && o.status === 'open');

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

export function destroyOrderView() {
  unregisterShortcut('f1');
  unregisterShortcut('f2');
  unregisterShortcut('ctrl+s');
}
