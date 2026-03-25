import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { showToast, showModal, closeModal, printContent, generateStockPrintHTML } from '../utils.js';

export async function renderIngredientsView(container) {
  const ingredients = await DB.getAll('ingredients');

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">egg</span>
        <div>
          <h2 class="view-title">Ingredient Master</h2>
          <div style="display:flex;gap:12px;align-items:center">
            <p class="view-subtitle" id="ingredient-count">${ingredients.length} ingredient(s)</p>
            <div class="status-badge" style="background:var(--bg-elevated);color:var(--primary-color);font-weight:700;font-size:0.9rem;border:1px solid var(--border-color)" id="header-grand-total">
                Stock Value: ₹${ingredients.reduce((sum, ing) => sum + ((ing.pricePerItem || 0) * (ing.currentStock || 0)), 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="search-container" style="width:220px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="form-input" id="ingredient-filter" placeholder="Filter...">
        </div>
        <button class="btn btn-secondary" id="btn-print-stock" title="Print Stock Checklist">
          <span class="material-symbols-outlined">print</span> Print
        </button>
        ${Auth.isAdmin() ? `
        <button class="btn btn-secondary" id="btn-bulk-stock-update" style="margin-right:8px; border-color:#6366f1; color:#6366f1">
          <span class="material-symbols-outlined">inventory_2</span> Bulk Stock Update
        </button>
        <button class="btn btn-primary" id="btn-add-ingredient">
          <span class="material-symbols-outlined">add</span> Add Ingredient
        </button>
        ` : ''}
      </div>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th class="text-right">Price per Item</th>
            <th class="text-right">Current Stock</th>
            <th class="text-right">Total</th>
            <th class="text-center">Status</th>
            ${Auth.isAdmin() ? '<th class="text-center">Actions</th>' : ''}
          </tr>
        </thead>
        <tbody id="ingredients-tbody">
          ${renderIngRows(ingredients, Auth.isAdmin())}
        </tbody>
        <tfoot id="ingredients-tfoot">
          ${renderIngFooter(ingredients, Auth.isAdmin())}
        </tfoot>
      </table>
    </div>
  `;

  // Filter
  document.getElementById('ingredient-filter')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = ingredients.filter(i => i.name.toLowerCase().includes(q));
    
    const countEl = document.getElementById('ingredient-count');
    if (countEl) countEl.textContent = `${filtered.length} ingredient(s)`;

    const totalVal = filtered.reduce((sum, ing) => sum + ((ing.pricePerItem || 0) * (ing.currentStock || 0)), 0);
    const headerTotalEl = document.getElementById('header-grand-total');
    if (headerTotalEl) headerTotalEl.textContent = `Stock Value: ₹${totalVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    document.getElementById('ingredients-tbody').innerHTML = renderIngRows(filtered, Auth.isAdmin());
    document.getElementById('ingredients-tfoot').innerHTML = renderIngFooter(filtered, Auth.isAdmin());
    attachActions(container);
  });

  document.getElementById('btn-add-ingredient')?.addEventListener('click', () => showIngForm(null, container));
  
  document.getElementById('btn-bulk-stock-update')?.addEventListener('click', () => showBulkStockModal(ingredients, container));

  document.getElementById('btn-print-stock')?.addEventListener('click', () => {
    // Only print active ingredients by default for stock taking? Or let's print all
    const activeIngs = ingredients.filter(i => i.active !== false);
    const html = generateStockPrintHTML(activeIngs);
    printContent(html, 'a4');
  });

  attachActions(container);
}

function renderIngRows(ingredients, isAdmin) {
  if (ingredients.length === 0)
    return `<tr><td colspan="${isAdmin ? 8 : 7}"><div class="empty-state"><span class="material-symbols-outlined">egg</span><p>No ingredients found</p></div></td></tr>`;

  return ingredients.map(ing => `
    <tr>
      <td class="text-muted">${ing.id}</td>
      <td><strong>${ing.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${ing.unit}</span></td>
      <td class="text-right font-mono">₹${(ing.pricePerItem || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td class="text-right font-mono">${ing.currentStock ?? 0} ${ing.unit}</td>
      <td class="text-right font-mono">₹${((ing.pricePerItem || 0) * (ing.currentStock || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td class="text-center"><span class="status-badge ${ing.active !== false ? 'status-active' : 'status-inactive'}">${ing.active !== false ? 'Active' : 'Inactive'}</span></td>
      ${isAdmin ? `
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-ing" data-id="${ing.id}"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
          <button class="btn btn-sm btn-ghost text-danger btn-del-ing" data-id="${ing.id}"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
        </div>
      </td>
      ` : ''}
    </tr>
  `).join('');
}

function renderIngFooter(ingredients, isAdmin) {
  const grandTotal = ingredients.reduce((sum, ing) => sum + ((ing.pricePerItem || 0) * (ing.currentStock || 0)), 0);
  
  return `
    <tr style="background:var(--bg-elevated); font-weight:bold; border-top: 2px solid var(--border-color)">
      <td colspan="5" class="text-right">GRAND TOTAL</td>
      <td class="text-right font-mono" style="color:var(--primary-color)">₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td colspan="${isAdmin ? 2 : 1}"></td>
    </tr>
  `;
}

function attachActions(container) {
  container.querySelectorAll('.btn-edit-ing').forEach(btn => {
    btn.addEventListener('click', async () => {
      const ing = await DB.getById('ingredients', parseInt(btn.dataset.id));
      if (ing) showIngForm(ing, container);
    });
  });

  container.querySelectorAll('.btn-del-ing').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const ing = await DB.getById('ingredients', id);
      if (ing && confirm(`Delete "${ing.name}"?`)) {
        await DB.remove('ingredients', id);
        showToast(`"${ing.name}" deleted`, 'warning');
        renderIngredientsView(container);
      }
    });
  });
}

function showIngForm(ing, container) {
  const isEdit = !!ing;

  showModal(isEdit ? 'Edit Ingredient' : 'Add New Ingredient', `
    <div class="form-group">
      <label class="form-label">Ingredient Name *</label>
      <input type="text" class="form-input" id="modal-ing-name" value="${ing?.name || ''}" placeholder="e.g. Chicken">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Unit *</label>
        <select class="form-select" id="modal-ing-unit">
          <option value="g" ${ing?.unit === 'g' ? 'selected' : ''}>g (grams)</option>
          <option value="kg" ${ing?.unit === 'kg' ? 'selected' : ''}>kg (kilograms)</option>
          <option value="ml" ${ing?.unit === 'ml' ? 'selected' : ''}>ml (millilitres)</option>
          <option value="l" ${ing?.unit === 'l' ? 'selected' : ''}>l (litres)</option>
          <option value="qty" ${ing?.unit === 'qty' ? 'selected' : ''}>qty (quantity/pieces)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Price per Item (₹)</label>
        <input type="number" class="form-input" id="modal-ing-price" value="${ing?.pricePerItem ?? 0}" min="0" step="0.01">
      </div>
      <div class="form-group">
        <label class="form-label">Current Stock</label>
        <input type="number" class="form-input" id="modal-ing-stock" value="${ing?.currentStock ?? 0}" min="0" step="0.01">
      </div>
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-ing-active" ${ing?.active !== false ? 'checked' : ''}>
      <label for="modal-ing-active">Active</label>
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-ing-save"><span class="material-symbols-outlined">save</span> ${isEdit ? 'Update' : 'Save'}</button>
    `
  });

  document.getElementById('modal-ing-save')?.addEventListener('click', async () => {
    const name = document.getElementById('modal-ing-name').value.trim();
    if (!name) { showToast('Name is required', 'error'); return; }

    const data = {
      name,
      unit: document.getElementById('modal-ing-unit').value,
      pricePerItem: parseFloat(document.getElementById('modal-ing-price').value) || 0,
      currentStock: parseFloat(document.getElementById('modal-ing-stock').value) || 0,
      active: document.getElementById('modal-ing-active').checked,
    };

    if (isEdit) { data.id = ing.id; await DB.update('ingredients', data); showToast(`"${name}" updated`, 'success'); }
    else { await DB.add('ingredients', data); showToast(`"${name}" added`, 'success'); }

    closeModal();
    renderIngredientsView(container);
  });
}

function showBulkStockModal(ingredients, container) {
  const activeIngs = ingredients.filter(i => i.active !== false).sort((a, b) => a.name.localeCompare(b.name));
  
  const rowsHTML = activeIngs.map((ing, i) => `
    <tr>
      <td class="text-muted" style="width:40px">${i + 1}</td>
      <td style="font-weight:600">
        ${ing.name}
        <div class="text-muted" style="font-size:0.75rem;font-weight:400">ID: ${ing.id} | Unit: ${ing.unit}</div>
      </td>
      <td class="text-right font-mono" style="font-weight:600; color:var(--text-secondary)">${ing.currentStock || 0} ${ing.unit}</td>
      <td style="width:140px">
        <input type="number" step="0.01" min="0" 
          class="form-input bulk-stock-input" 
          data-id="${ing.id}" 
          value="${ing.currentStock || 0}" 
          style="text-align:right; font-weight:700; background:var(--bg-elevated); border:1px solid var(--border-color); color:var(--primary)">
      </td>
    </tr>
  `).join('');

  showModal('Bulk Stock Update', `
    <div class="alert alert-info" style="margin-bottom:16px; font-size:0.9rem">
      Update current stock for multiple ingredients at once. Only active ingredients are shown.
    </div>
    <div style="max-height:60vh; overflow-y:auto; border:1px solid var(--border-color); border-radius:8px">
      <table class="data-table">
        <thead style="position:sticky; top:0; z-index:10; background:var(--bg-card)">
          <tr>
            <th>#</th>
            <th>Ingredient Name</th>
            <th class="text-right">Current Stock</th>
            <th class="text-right">New Stock</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
      </table>
    </div>
  `, {
    large: true,
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="btn-save-bulk-stock">
        <span class="material-symbols-outlined">save</span> Update All Ingredients
      </button>
    `
  });

  document.getElementById('btn-save-bulk-stock')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-save-bulk-stock');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined spinning">sync</span> Updating...';
    btn.disabled = true;

    try {
      const inputs = document.querySelectorAll('.bulk-stock-input');
      let count = 0;
      
      for (const input of inputs) {
        const id = parseInt(input.dataset.id);
        const newVal = parseFloat(input.value) || 0;
        const ing = activeIngs.find(i => i.id === id);
        
        if (ing && ing.currentStock !== newVal) {
          ing.currentStock = newVal;
          await DB.update('ingredients', ing);
          count++;
        }
      }
      
      showToast(`Successfully updated ${count} ingredient(s)`, 'success');
      closeModal();
      renderIngredientsView(container);
    } catch (err) {
      console.error(err);
      showToast('Error during bulk update: ' + err.message, 'error');
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
}
