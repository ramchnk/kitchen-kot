// ===== Item Master View =====
import { DB } from '../db.js';
import { formatCurrency, showToast, showModal, closeModal } from '../utils.js';

const DIRECT_PURCHASE_CATEGORIES = ['COOL DRINKS', 'CIGARETTE'];
function isStockTracked(category) {
  return DIRECT_PURCHASE_CATEGORIES.includes((category || '').toUpperCase());
}

export async function renderItemsView(container) {
  const items = await DB.getAll('items');

  // Get unique categories
  const categories = [...new Set(items.map(i => i.category))].sort();

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">lunch_dining</span>
        <div>
          <h2 class="view-title">Item Master</h2>
          <p class="view-subtitle">${items.length} menu items</p>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="search-container" style="width:250px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="form-input" id="item-filter" placeholder="Filter items...">
        </div>
        <button class="btn btn-primary" id="btn-add-item">
          <span class="material-symbols-outlined">add</span> Add Item
        </button>
      </div>
    </div>

    <div class="card">
      <table class="data-table" id="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Category</th>
            <th class="text-right">Selling Price</th>
            <th class="text-right">Stock</th>
            <th class="text-right">Incentive %</th>
            <th class="text-center">Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody id="items-table-body">
          ${renderItemRows(items)}
        </tbody>
      </table>
    </div>
  `;

  // Filter
  document.getElementById('item-filter')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = items.filter(i =>
      i.name.toLowerCase().includes(query) ||
      i.category.toLowerCase().includes(query)
    );
    document.getElementById('items-table-body').innerHTML = renderItemRows(filtered);
    attachItemActions(container, items, categories);
  });

  // Add button
  document.getElementById('btn-add-item')?.addEventListener('click', () => {
    showItemForm(null, categories, container);
  });

  attachItemActions(container, items, categories);
}

function renderItemRows(items) {
  if (items.length === 0) {
    return '<tr><td colspan="8"><div class="empty-state"><span class="material-symbols-outlined">lunch_dining</span><p>No items found</p></div></td></tr>';
  }

  return items.map(item => `
    <tr>
      <td class="text-muted">${item.id}</td>
      <td><strong>${item.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${item.category}</span></td>
      <td class="text-right amount font-mono">${formatCurrency(item.sellingPrice)}</td>
      <td class="text-right font-mono">
        ${isStockTracked(item.category)
      ? `<span class="status-badge ${(item.currentStock || 0) > 0 ? 'status-active' : 'status-inactive'}" style="font-weight:600">${item.currentStock || 0}</span>`
      : '<span class="text-muted">—</span>'}
      </td>
      <td class="text-right font-mono">${item.incentivePercent || 0}%</td>
      <td class="text-center">
        <span class="status-badge ${item.active ? 'status-active' : 'status-inactive'}">
          ${item.active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-item" data-id="${item.id}" title="Edit">
            <span class="material-symbols-outlined" style="font-size:16px">edit</span>
          </button>
          <button class="btn btn-sm btn-ghost text-danger btn-delete-item" data-id="${item.id}" title="Delete">
            <span class="material-symbols-outlined" style="font-size:16px">delete</span>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function attachItemActions(container, items, categories) {
  container.querySelectorAll('.btn-edit-item').forEach(btn => {
    btn.addEventListener('click', async () => {
      const item = await DB.getById('items', parseInt(btn.dataset.id));
      if (item) showItemForm(item, categories, container);
    });
  });

  container.querySelectorAll('.btn-delete-item').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const item = await DB.getById('items', id);
      if (item && confirm(`Delete "${item.name}"?`)) {
        await DB.remove('items', id);
        showToast(`"${item.name}" deleted`, 'warning');
        renderItemsView(container);
      }
    });
  });
}

function showItemForm(item, categories, container) {
  const isEdit = !!item;
  const catOptions = categories.map(c =>
    `<option value="${c}" ${item?.category === c ? 'selected' : ''}>${c}</option>`
  ).join('');

  const content = `
    <div class="form-group">
      <label class="form-label">Item Name *</label>
      <input type="text" class="form-input" id="modal-item-name" value="${item?.name || ''}" placeholder="e.g. Chicken Biryani" required>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Category *</label>
        <div style="display:flex;gap:8px">
          <select class="form-select" id="modal-item-category" style="flex:1">
            <option value="">Select category</option>
            ${catOptions}
          </select>
          <input type="text" class="form-input" id="modal-item-new-category" placeholder="Or new..." style="flex:1">
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Selling Price (₹) *</label>
        <input type="number" class="form-input" id="modal-item-price" value="${item?.sellingPrice || ''}" min="0" step="0.01" placeholder="0.00">
      </div>
      <div class="form-group">
        <label class="form-label">Waiter Incentive %</label>
        <input type="number" class="form-input" id="modal-item-incentive" value="${item?.incentivePercent || 0}" min="0" max="100" step="0.1">
      </div>
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-item-active" ${item?.active !== false ? 'checked' : ''}>
      <label for="modal-item-active">Active</label>
    </div>
  `;

  showModal(isEdit ? 'Edit Item' : 'Add New Item', content, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-item-save">
        <span class="material-symbols-outlined">save</span> ${isEdit ? 'Update' : 'Save'}
      </button>
    `
  });

  document.getElementById('modal-item-save')?.addEventListener('click', async () => {
    const name = document.getElementById('modal-item-name').value.trim();
    const categorySelect = document.getElementById('modal-item-category').value;
    const categoryNew = document.getElementById('modal-item-new-category').value.trim();
    const category = categoryNew || categorySelect;
    const sellingPrice = parseFloat(document.getElementById('modal-item-price').value) || 0;
    const incentivePercent = parseFloat(document.getElementById('modal-item-incentive').value) || 0;
    const active = document.getElementById('modal-item-active').checked;

    if (!name || !category || sellingPrice <= 0) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    const data = { name, category, sellingPrice, incentivePercent, active, createdAt: item?.createdAt || new Date().toISOString() };

    if (isEdit) {
      data.id = item.id;
      await DB.update('items', data);
      showToast(`"${name}" updated`, 'success');
    } else {
      await DB.add('items', data);
      showToast(`"${name}" added`, 'success');
    }

    closeModal();
    renderItemsView(container);
  });
}
