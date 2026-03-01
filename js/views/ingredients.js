// ===== Ingredients Master View =====
import { DB } from '../db.js';
import { showToast, showModal, closeModal } from '../utils.js';

export async function renderIngredientsView(container) {
    const ingredients = await DB.getAll('ingredients');

    container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">egg</span>
        <div>
          <h2 class="view-title">Ingredient Master</h2>
          <p class="view-subtitle">${ingredients.length} ingredient(s)</p>
        </div>
      </div>
      <div class="view-header-actions">
        <div class="search-container" style="width:220px">
          <span class="material-symbols-outlined">search</span>
          <input type="text" class="form-input" id="ingredient-filter" placeholder="Filter...">
        </div>
        <button class="btn btn-primary" id="btn-add-ingredient">
          <span class="material-symbols-outlined">add</span> Add Ingredient
        </button>
      </div>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th class="text-right">Current Stock</th>
            <th class="text-center">Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody id="ingredients-tbody">
          ${renderIngRows(ingredients)}
        </tbody>
      </table>
    </div>
  `;

    // Filter
    document.getElementById('ingredient-filter')?.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = ingredients.filter(i => i.name.toLowerCase().includes(q));
        document.getElementById('ingredients-tbody').innerHTML = renderIngRows(filtered);
        attachActions(container);
    });

    document.getElementById('btn-add-ingredient')?.addEventListener('click', () => showIngForm(null, container));

    attachActions(container);
}

function renderIngRows(ingredients) {
    if (ingredients.length === 0)
        return '<tr><td colspan="6"><div class="empty-state"><span class="material-symbols-outlined">egg</span><p>No ingredients found</p></div></td></tr>';

    return ingredients.map(ing => `
    <tr>
      <td class="text-muted">${ing.id}</td>
      <td><strong>${ing.name}</strong></td>
      <td><span class="status-badge" style="background:var(--bg-elevated);color:var(--text-secondary)">${ing.unit}</span></td>
      <td class="text-right font-mono">${ing.currentStock ?? 0} ${ing.unit}</td>
      <td class="text-center"><span class="status-badge ${ing.active !== false ? 'status-active' : 'status-inactive'}">${ing.active !== false ? 'Active' : 'Inactive'}</span></td>
      <td class="text-center">
        <div style="display:flex;gap:4px;justify-content:center">
          <button class="btn btn-sm btn-ghost btn-edit-ing" data-id="${ing.id}"><span class="material-symbols-outlined" style="font-size:16px">edit</span></button>
          <button class="btn btn-sm btn-ghost text-danger btn-del-ing" data-id="${ing.id}"><span class="material-symbols-outlined" style="font-size:16px">delete</span></button>
        </div>
      </td>
    </tr>
  `).join('');
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
            currentStock: parseFloat(document.getElementById('modal-ing-stock').value) || 0,
            active: document.getElementById('modal-ing-active').checked,
        };

        if (isEdit) { data.id = ing.id; await DB.update('ingredients', data); showToast(`"${name}" updated`, 'success'); }
        else { await DB.add('ingredients', data); showToast(`"${name}" added`, 'success'); }

        closeModal();
        renderIngredientsView(container);
    });
}
