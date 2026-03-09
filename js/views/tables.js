import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { showToast, showModal, closeModal } from '../utils.js';

export async function renderTablesView(container) {
  const tables = await DB.getAll('tables');
  const isAdmin = Auth.isAdmin();

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">table_restaurant</span>
        <div>
          <h2 class="view-title">Table Master</h2>
          <p class="view-subtitle">${tables.length} table(s)</p>
        </div>
      </div>
      ${isAdmin ? `
      <button class="btn btn-primary" id="btn-add-table">
        <span class="material-symbols-outlined">add</span> Add Table
      </button>
      ` : ''}
    </div>

    <div class="stats-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
      ${tables.map(t => `
        <div class="stat-card" style="cursor:pointer;position:relative">
          <div class="stat-icon ${t.active ? 'green' : 'orange'}">
            <span class="material-symbols-outlined">table_restaurant</span>
          </div>
          <div style="flex:1">
            <div class="stat-value" style="font-size:1.1rem">${t.name}</div>
            <div class="stat-label">
              <span class="status-badge ${t.active ? 'status-active' : 'status-inactive'}" style="font-size:0.65rem">
                ${t.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          ${isAdmin ? `
          <div style="display:flex;flex-direction:column;gap:4px">
            <button class="btn btn-sm btn-ghost btn-edit-table" data-id="${t.id}" title="Edit">
              <span class="material-symbols-outlined" style="font-size:16px">edit</span>
            </button>
            <button class="btn btn-sm btn-ghost text-danger btn-del-table" data-id="${t.id}" title="Delete">
              <span class="material-symbols-outlined" style="font-size:16px">delete</span>
            </button>
          </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('btn-add-table')?.addEventListener('click', () => showTableForm(null, container));

  container.querySelectorAll('.btn-edit-table').forEach(btn => {
    btn.addEventListener('click', async () => {
      const t = await DB.getById('tables', parseInt(btn.dataset.id));
      if (t) showTableForm(t, container);
    });
  });

  container.querySelectorAll('.btn-del-table').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const t = await DB.getById('tables', id);
      if (t && confirm(`Delete "${t.name}"?`)) {
        await DB.remove('tables', id);
        showToast(`"${t.name}" deleted`, 'warning');
        renderTablesView(container);
      }
    });
  });
}

function showTableForm(table, container) {
  const isEdit = !!table;

  showModal(isEdit ? 'Edit Table' : 'Add New Table', `
    <div class="form-group">
      <label class="form-label">Table Name / Number *</label>
      <input type="text" class="form-input" id="modal-tbl-name" value="${table?.name || ''}" placeholder="e.g. Table 1, Parcel, Takeaway">
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-tbl-active" ${table?.active !== false ? 'checked' : ''}>
      <label for="modal-tbl-active">Active</label>
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-tbl-save"><span class="material-symbols-outlined">save</span> ${isEdit ? 'Update' : 'Save'}</button>
    `
  });

  document.getElementById('modal-tbl-save')?.addEventListener('click', async () => {
    const name = document.getElementById('modal-tbl-name').value.trim();
    if (!name) { showToast('Name is required', 'error'); return; }

    const data = { name, active: document.getElementById('modal-tbl-active').checked };

    if (isEdit) { data.id = table.id; await DB.update('tables', data); showToast(`"${name}" updated`, 'success'); }
    else { await DB.add('tables', data); showToast(`"${name}" added`, 'success'); }

    closeModal();
    renderTablesView(container);
  });
}
