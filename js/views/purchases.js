import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { formatCurrency, formatDate, showToast, showModal, closeModal, todayISO } from '../utils.js';

// Categories that are direct-purchase products (no ingredients)
const DIRECT_PURCHASE_CATEGORIES = ['COOL DRINKS', 'CIGARETTE'];

let purchaseItems = [];
let allIngredients = [];
let allGrocerySuppliers = [];
let allProducts = [];
let selectedPurchaseItem = null;

function resetPurchaseForm() {
  purchaseItems = [];
  selectedPurchaseItem = null;
}

function isDirectPurchaseCategory(category) {
  return DIRECT_PURCHASE_CATEGORIES.includes((category || '').toUpperCase());
}

export async function renderPurchasesView(container) {
  const purchases = (await DB.getAll('purchases')).sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
  const ingredients = await DB.getAll('ingredients');
  const grocerySuppliers = await DB.getAll('grocerySuppliers');
  const items = await DB.getAll('items');

  allIngredients = ingredients.filter(i => i.active !== false);
  allGrocerySuppliers = grocerySuppliers.filter(s => s.active !== false);
  allProducts = items.filter(i => i.active !== false && isDirectPurchaseCategory(i.category));

  const ingredientMap = Object.fromEntries(ingredients.map(i => [i.id, i]));
  const productMap = Object.fromEntries(items.map(i => [i.id, i]));
  const grocerySupplierMap = Object.fromEntries(grocerySuppliers.map(s => [s.id, s]));

  const totalCost = purchases.reduce((sum, p) => sum + (p.cost || 0), 0);

  // Group purchases by batchId (or individual if no batchId)
  const grouped = {};
  purchases.forEach(p => {
    const key = p.batchId || `single_${p.id}`;
    if (!grouped[key]) {
      grouped[key] = {
        batchId: p.batchId || null,
        supplierId: p.supplierId,
        date: p.date,
        items: [],
        totalCost: 0,
      };
    }
    grouped[key].items.push(p);
    grouped[key].totalCost += (p.cost || 0);
  });

  const batches = Object.values(grouped);

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">shopping_cart</span>
        <div>
          <h2 class="view-title">Purchase Entry</h2>
          <p class="view-subtitle">${purchases.length} item(s) in ${batches.length} purchase(s) • Total: ${formatCurrency(totalCost)}</p>
        </div>
      </div>
      <button class="btn btn-primary" id="btn-add-purchase">
        <span class="material-symbols-outlined">add</span> New Purchase
      </button>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Supplier</th>
            <th>Items</th>
            <th class="text-right">Total Cost (₹)</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${batches.length === 0 ? `
            <tr><td colspan="5"><div class="empty-state"><span class="material-symbols-outlined">shopping_cart</span><p>No purchases recorded yet</p></div></td></tr>
          ` : batches.map(batch => {
    const sup = grocerySupplierMap[batch.supplierId];
    const itemNames = batch.items.map(p => {
      if (p.productId) {
        const prod = productMap[p.productId];
        return `${prod?.name || 'Unknown'} (${p.quantity})`;
      } else {
        const ing = ingredientMap[p.ingredientId];
        return `${ing?.name || 'Unknown'} (${p.quantity} ${ing?.unit || ''})`;
      }
    }).join(', ');
    return `
              <tr>
                <td class="text-muted">${formatDate(batch.date)}</td>
                <td><strong>${sup?.name || '—'}</strong></td>
                <td style="max-width:320px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${itemNames}">
                  <span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary);margin-right:6px">${batch.items.length} item(s)</span>
                  ${itemNames}
                </td>
                <td class="text-right amount font-mono">
                  ${formatCurrency(batch.totalCost)}
                  ${batch.items[0]?.paymentType === 'credit'
        ? ' <span class="status-badge" style="background:#f59e0b20;color:#d97706;font-size:0.6rem">CREDIT</span>'
        : ' <span class="status-badge" style="background:#10b98120;color:#059669;font-size:0.6rem">CASH</span>'}
                </td>
                <td class="text-center">
                  <div style="display:flex;gap:4px;justify-content:center">
                    <button class="btn btn-sm btn-ghost btn-view-purchase" data-batch='${JSON.stringify(batch.items.map(p => p.id))}' title="View Details">
                      <span class="material-symbols-outlined" style="font-size:16px">visibility</span>
                    </button>
                    ${Auth.isAdmin() ? `
                    <button class="btn btn-sm btn-ghost text-danger btn-del-batch" data-batch='${JSON.stringify(batch.items.map(p => p.id))}' title="Delete Purchase">
                      <span class="material-symbols-outlined" style="font-size:16px">delete</span>
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

  document.getElementById('btn-add-purchase')?.addEventListener('click', () => {
    resetPurchaseForm();
    showPurchaseForm(container);
  });

  container.querySelectorAll('.btn-view-purchase').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ids = JSON.parse(btn.dataset.batch);
      const fetchedItems = [];
      for (const id of ids) {
        const p = await DB.getById('purchases', id);
        if (p) fetchedItems.push(p);
      }
      showPurchaseDetails(fetchedItems, ingredientMap, productMap, grocerySupplierMap);
    });
  });

  container.querySelectorAll('.btn-del-batch').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ids = JSON.parse(btn.dataset.batch);
      if (!confirm(`Delete this purchase with ${ids.length} item(s)? Stock will be reversed.`)) return;

      for (const id of ids) {
        const p = await DB.getById('purchases', id);
        if (p) {
          if (p.ingredientId) {
            const ing = await DB.getById('ingredients', p.ingredientId);
            if (ing) {
              ing.currentStock = Math.max(0, (ing.currentStock || 0) - (p.quantity || 0));
              await DB.update('ingredients', ing);
            }
          }
          if (p.productId) {
            const prod = await DB.getById('items', p.productId);
            if (prod) {
              prod.currentStock = Math.max(0, (prod.currentStock || 0) - (p.quantity || 0));
              await DB.update('items', prod);
            }
          }
        }
        await DB.remove('purchases', id);
      }

      showToast('Purchase deleted and stock reversed', 'warning');
      renderPurchasesView(container);
    });
  });
}

function showPurchaseDetails(items, ingredientMap, productMap, supplierMap) {
  const sup = supplierMap[items[0]?.supplierId];
  const totalCost = items.reduce((s, p) => s + (p.cost || 0), 0);

  const rowsHTML = items.map((p, i) => {
    let name, unit;
    if (p.productId) {
      const prod = productMap[p.productId];
      name = prod?.name || 'Unknown';
      unit = 'pcs';
    } else {
      const ing = ingredientMap[p.ingredientId];
      name = ing?.name || 'Unknown';
      unit = ing?.unit || '—';
    }
    return `
      <tr>
        <td class="text-muted">${i + 1}</td>
        <td><strong>${name}</strong>${p.productId ? ' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>' : ''}</td>
        <td class="text-right font-mono">${p.quantity}</td>
        <td>${unit}</td>
        <td class="text-right amount font-mono">${formatCurrency(p.cost)}</td>
      </tr>
    `;
  }).join('');

  showModal(`Purchase Details — ${formatDate(items[0]?.date)}`, `
    <div class="summary-row mb-2" style="padding:12px;background:var(--bg-elevated);border-radius:8px">
      <span class="summary-label">Supplier</span>
      <span class="summary-value" style="font-weight:600">${sup?.name || '—'}</span>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th class="text-right">Quantity</th>
          <th>Unit</th>
          <th class="text-right">Cost (₹)</th>
        </tr>
      </thead>
      <tbody>${rowsHTML}</tbody>
      <tfoot>
        <tr style="font-weight:700">
          <td colspan="4" class="text-right">Total</td>
          <td class="text-right amount total font-mono">${formatCurrency(totalCost)}</td>
        </tr>
      </tfoot>
    </table>
  `, { large: true });
}

// ======== Purchase Form with Searchable Item Dropdown ========

function showPurchaseForm(container) {
  const supOptions = allGrocerySuppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

  showModal('New Purchase — Multi-Item Entry', `
    <div class="form-row" style="margin-bottom:16px">
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Supplier *</label>
        <select class="form-select" id="modal-pur-supplier">
          <option value="">Select supplier</option>
          ${supOptions}
        </select>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Date *</label>
        <input type="date" class="form-input" id="modal-pur-date" value="${todayISO()}">
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Payment *</label>
        <div style="display:flex;gap:6px;height:38px;align-items:center">
          <label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:6px 14px;border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.85rem;font-weight:600">
            <input type="radio" name="pur-payment-type" value="cash" style="margin:0"> 💵 Cash
          </label>
          <label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:6px 14px;border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.85rem;font-weight:600">
            <input type="radio" name="pur-payment-type" value="credit" checked style="margin:0"> 📝 Credit
          </label>
        </div>
      </div>
    </div>

    <div style="border:1px solid var(--border);border-radius:var(--radius-md);padding:14px;background:var(--bg-tertiary);margin-bottom:16px">
      <label class="form-label" style="margin-bottom:8px">Add Item</label>
      <div style="display:flex;gap:8px;align-items:flex-end">
        <div style="flex:2;position:relative">
          <div class="search-container" style="margin-bottom:0">
            <span class="material-symbols-outlined">search</span>
            <input type="text" class="form-input" id="modal-pur-item-search" placeholder="Type to search items..." autocomplete="off" style="margin-bottom:0">
            <div class="search-dropdown" id="modal-pur-item-dropdown" style="max-height:250px;overflow-y:auto"></div>
          </div>
        </div>
        <div style="flex:1">
          <input type="number" class="form-input" id="modal-pur-qty" min="0.01" step="0.01" placeholder="Qty" style="margin-bottom:0">
        </div>
        <div style="flex:1">
          <input type="number" class="form-input" id="modal-pur-unit-cost" min="0" step="0.01" placeholder="Cost/Unit ₹" style="margin-bottom:0">
        </div>
        <div style="flex:1">
          <input type="number" class="form-input" id="modal-pur-cost" min="0" step="0.01" placeholder="Total ₹" style="margin-bottom:0">
        </div>
        <button class="btn btn-primary btn-sm" id="modal-pur-add-item" style="height:38px;padding:0 14px" title="Add Item">
          <span class="material-symbols-outlined" style="font-size:18px">add</span>
        </button>
      </div>
    </div>

    <div id="modal-pur-items-container">
      <table class="data-table" id="modal-pur-items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th class="text-right">Qty</th>
            <th>Unit</th>
            <th class="text-right">Cost/Unit</th>
            <th class="text-right">Total (₹)</th>
            <th style="width:40px"></th>
          </tr>
        </thead>
        <tbody id="modal-pur-items-body">
          <tr id="modal-pur-empty-row">
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot id="modal-pur-items-footer" style="display:none">
          <tr style="font-weight:700">
            <td colspan="5" class="text-right">Total</td>
            <td class="text-right amount total font-mono" id="modal-pur-total">₹0.00</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-pur-save"><span class="material-symbols-outlined">save</span> Save Purchase</button>
    `,
    large: true,
  });

  // Build searchable data: combine ingredients + products
  const searchableItems = [
    ...allIngredients.map(i => ({ type: 'ingredient', id: i.id, name: i.name, unit: i.unit, category: '🥬 Ingredient', code: '' })),
    ...allProducts.map(p => ({ type: 'product', id: p.id, name: p.name, unit: 'pcs', category: `📦 ${p.category}`, price: p.sellingPrice, code: p.code || '' })),
  ];

  setupPurchaseItemSearch(searchableItems);

  // Enter key navigation: Supplier → Date → Item Search → Qty → Cost/Unit → Total → Add
  document.getElementById('modal-pur-supplier')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('modal-pur-date')?.focus(); }
  });

  document.getElementById('modal-pur-date')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('modal-pur-item-search')?.focus(); }
  });

  document.getElementById('modal-pur-qty')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('modal-pur-unit-cost')?.focus(); }
  });

  document.getElementById('modal-pur-unit-cost')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); document.getElementById('modal-pur-cost')?.focus(); }
  });

  document.getElementById('modal-pur-add-item')?.addEventListener('click', () => addPurchaseItem());

  document.getElementById('modal-pur-cost')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addPurchaseItem(); }
  });

  // Auto-calculate: Qty × Cost/Unit = Total Cost
  function autoCalcTotal() {
    const qty = parseFloat(document.getElementById('modal-pur-qty')?.value) || 0;
    const unitCost = parseFloat(document.getElementById('modal-pur-unit-cost')?.value) || 0;
    if (qty > 0 && unitCost > 0) {
      document.getElementById('modal-pur-cost').value = (qty * unitCost).toFixed(2);
    }
  }

  // Reverse-calculate: Total Cost / Qty = Cost/Unit
  function autoCalcUnitCost() {
    const qty = parseFloat(document.getElementById('modal-pur-qty')?.value) || 0;
    const cost = parseFloat(document.getElementById('modal-pur-cost')?.value) || 0;
    if (qty > 0 && cost > 0) {
      document.getElementById('modal-pur-unit-cost').value = (cost / qty).toFixed(2);
    }
  }

  document.getElementById('modal-pur-qty')?.addEventListener('input', autoCalcTotal);
  document.getElementById('modal-pur-unit-cost')?.addEventListener('input', autoCalcTotal);
  document.getElementById('modal-pur-cost')?.addEventListener('input', autoCalcUnitCost);

  document.getElementById('modal-pur-save')?.addEventListener('click', async () => {
    const supplierId = document.getElementById('modal-pur-supplier').value;
    const date = document.getElementById('modal-pur-date').value;
    const paymentType = document.querySelector('input[name="pur-payment-type"]:checked')?.value || 'credit';

    if (!supplierId) { showToast('Please select a supplier', 'error'); return; }
    if (!date) { showToast('Please select a date', 'error'); return; }
    if (purchaseItems.length === 0) { showToast('Please add at least one item', 'error'); return; }

    const batchId = `PUR-${Date.now()}`;

    for (const item of purchaseItems) {
      const rec = {
        quantity: item.quantity,
        unitCost: item.unitCost || 0,
        cost: item.cost,
        supplierId: parseInt(supplierId),
        date,
        batchId,
        paymentType,
        createdAt: new Date().toISOString(),
      };

      if (item.type === 'product') {
        rec.productId = item.itemId;
        rec.ingredientId = null;
        // Update product stock
        const product = await DB.getById('items', item.itemId);
        if (product) {
          product.currentStock = (product.currentStock || 0) + item.quantity;
          await DB.update('items', product);
        }
      } else {
        rec.ingredientId = item.itemId;
        rec.productId = null;
        const ingredient = await DB.getById('ingredients', item.itemId);
        if (ingredient) {
          ingredient.currentStock = (ingredient.currentStock || 0) + item.quantity;
          await DB.update('ingredients', ingredient);
        }
      }

      await DB.add('purchases', rec);
    }

    const totalCost = purchaseItems.reduce((s, i) => s + i.cost, 0);

    // Record Wallet Transaction if Cash
    if (paymentType === 'cash') {
      const itemSummary = purchaseItems.map(i => i.itemName).join(', ');
      await DB.recordWalletTransaction('purchase', totalCost, `Cash Purchase: ${itemSummary}`, batchId);
    }

    // If credit purchase, create a supplier bill for outstanding tracking
    if (paymentType === 'credit') {
      await DB.add('supplierBills', {
        supplierId: parseInt(supplierId),
        totalAmount: totalCost,
        batchId,
        date,
        description: `Purchase: ${purchaseItems.map(i => i.itemName).join(', ')}`,
        createdAt: new Date().toISOString(),
      });
    }

    const label = paymentType === 'credit' ? ' (Credit — added to outstanding)' : ' (Cash)';
    showToast(`Purchase saved! ${purchaseItems.length} item(s) — ${formatCurrency(totalCost)}${label}`, 'success');
    resetPurchaseForm();
    closeModal();
    renderPurchasesView(container);
  });
}

// ======== Searchable Item Dropdown ========

function setupPurchaseItemSearch(searchableItems) {
  const input = document.getElementById('modal-pur-item-search');
  const dropdown = document.getElementById('modal-pur-item-dropdown');
  if (!input || !dropdown) return;

  let highlightIdx = -1;
  let filtered = [];

  function filterItems(query) {
    query = query.toLowerCase().trim();
    if (query.length === 0) {
      filtered = searchableItems;
    } else {
      filtered = searchableItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.code && item.code.toLowerCase().includes(query))
      );
    }
    highlightIdx = filtered.length > 0 ? 0 : -1;
    renderDropdown();
  }

  function renderDropdown() {
    if (filtered.length === 0) {
      dropdown.innerHTML = '<div class="search-no-results">No items found</div>';
      dropdown.classList.add('visible');
      return;
    }

    // Group by category for display
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    let flatIdx = 0;
    let html = '';
    for (const [cat, catItems] of Object.entries(groups)) {
      html += `<div style="padding:6px 12px;font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;background:var(--bg-tertiary);border-bottom:1px solid var(--border)">${cat}</div>`;
      for (const item of catItems) {
        const priceLabel = item.price ? ` — ${formatCurrency(item.price)}` : '';
        const unitLabel = item.type === 'ingredient' ? ` (${item.unit})` : '';
        const codeLabel = item.code ? `<code style="background:var(--bg-elevated);padding:1px 5px;border-radius:3px;font-size:0.72rem;font-weight:600;margin-right:4px">${item.code}</code>` : '';
        html += `<div class="search-dropdown-item ${flatIdx === highlightIdx ? 'highlighted' : ''}" data-flat-idx="${flatIdx}">
                  <div>
                    ${codeLabel}<span>${item.name}</span>
                    <span style="color:var(--text-muted);font-size:0.78rem">${unitLabel}</span>
                    ${item.type === 'product' ? ' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.6rem;margin-left:4px">PRODUCT</span>' : ''}
                  </div>
                  <span style="color:var(--text-muted);font-size:0.8rem">${priceLabel}</span>
                </div>`;
        flatIdx++;
      }
    }
    dropdown.innerHTML = html;
    dropdown.classList.add('visible');

    // Click handlers
    dropdown.querySelectorAll('.search-dropdown-item').forEach(el => {
      el.addEventListener('click', () => {
        selectItem(parseInt(el.dataset.flatIdx));
      });
    });
  }

  function selectItem(idx) {
    if (idx < 0 || idx >= filtered.length) return;
    const item = filtered[idx];
    selectedPurchaseItem = item;
    input.value = item.name;
    dropdown.classList.remove('visible');
    document.getElementById('modal-pur-qty')?.focus();
    document.getElementById('modal-pur-qty')?.select();
  }

  function updateHighlight() {
    const items = dropdown.querySelectorAll('.search-dropdown-item');
    items.forEach((el, i) => el.classList.toggle('highlighted', i === highlightIdx));
    if (items[highlightIdx]) items[highlightIdx].scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', () => {
    selectedPurchaseItem = null;
    filterItems(input.value);
  });

  input.addEventListener('focus', () => {
    selectedPurchaseItem = null;
    filterItems(input.value);
  });

  input.addEventListener('blur', () => {
    setTimeout(() => dropdown.classList.remove('visible'), 200);
  });

  input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.search-dropdown-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightIdx = Math.min(highlightIdx + 1, items.length - 1);
      updateHighlight();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightIdx = Math.max(highlightIdx - 1, 0);
      updateHighlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectIdx = highlightIdx >= 0 ? highlightIdx : 0;
      if (filtered[selectIdx]) selectItem(selectIdx);
    } else if (e.key === 'Tab') {
      dropdown.classList.remove('visible');
    }
  });
}

// ======== Add & Render Purchase Items ========

function addPurchaseItem() {
  const searchInput = document.getElementById('modal-pur-item-search');
  const qtyInput = document.getElementById('modal-pur-qty');
  const unitCostInput = document.getElementById('modal-pur-unit-cost');
  const costInput = document.getElementById('modal-pur-cost');

  const quantity = parseFloat(qtyInput.value);
  const unitCost = parseFloat(unitCostInput.value) || 0;
  const cost = parseFloat(costInput.value) || 0;

  if (!selectedPurchaseItem) {
    showToast('Please search and select an item first', 'warning');
    searchInput?.focus();
    return;
  }
  if (!quantity || quantity <= 0) {
    showToast('Please enter a valid quantity', 'warning');
    qtyInput?.focus();
    return;
  }

  const item = selectedPurchaseItem;

  // Check if already added, if so update qty & cost
  const existing = purchaseItems.find(i => i.itemId === item.id && i.type === item.type);
  if (existing) {
    existing.quantity += quantity;
    existing.cost += cost;
    existing.unitCost = unitCost || existing.unitCost;
  } else {
    purchaseItems.push({
      type: item.type,
      itemId: item.id,
      itemName: item.name,
      unit: item.unit,
      quantity,
      unitCost,
      cost,
    });
  }

  renderPurchaseItemsTable();

  // Reset for next item
  selectedPurchaseItem = null;
  searchInput.value = '';
  qtyInput.value = '';
  unitCostInput.value = '';
  costInput.value = '';
  searchInput.focus();

  showToast(`${item.name} added`, 'success', 1500);
}

function renderPurchaseItemsTable() {
  const tbody = document.getElementById('modal-pur-items-body');
  const footer = document.getElementById('modal-pur-items-footer');

  if (!tbody) return;

  if (purchaseItems.length === 0) {
    tbody.innerHTML = `
          <tr>
            <td colspan="7">
              <div class="empty-state" style="padding:24px">
                <span class="material-symbols-outlined">playlist_add</span>
                <p>No items added. Search for items, enter qty & cost, then click +</p>
              </div>
            </td>
          </tr>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  const totalCost = purchaseItems.reduce((s, i) => s + i.cost, 0);

  tbody.innerHTML = purchaseItems.map((item, i) => `
    <tr>
      <td class="text-muted">${i + 1}</td>
      <td>
        <strong>${item.itemName}</strong>
        ${item.type === 'product' ? ' <span class="status-badge" style="background:var(--info-bg);color:var(--info);font-size:0.65rem">PRODUCT</span>' : ''}
      </td>
      <td class="text-right font-mono">${item.quantity}</td>
      <td>${item.unit}</td>
      <td class="text-right font-mono">${item.unitCost ? formatCurrency(item.unitCost) : '—'}</td>
      <td class="text-right amount font-mono">${formatCurrency(item.cost)}</td>
      <td>
        <button class="btn btn-sm btn-ghost text-danger btn-remove-pur-item" data-index="${i}" title="Remove">
          <span class="material-symbols-outlined" style="font-size:16px">close</span>
        </button>
      </td>
    </tr>
  `).join('');

  if (footer) {
    footer.style.display = '';
    document.getElementById('modal-pur-total').textContent = formatCurrency(totalCost);
  }

  tbody.querySelectorAll('.btn-remove-pur-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      const removed = purchaseItems.splice(idx, 1)[0];
      renderPurchaseItemsTable();
      showToast(`${removed.itemName} removed`, 'warning', 1500);
    });
  });
}
