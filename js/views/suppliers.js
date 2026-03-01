// ===== Waiters Master View =====
import { DB } from '../db.js';
import { showToast, showModal, closeModal } from '../utils.js';

export async function renderSuppliersView(container) {
  const suppliers = await DB.getAll('suppliers');

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">badge</span>
        <div>
          <h2 class="view-title">Waiter Master</h2>
          <p class="view-subtitle">${suppliers.length} waiter(s)</p>
        </div>
      </div>
      <button class="btn btn-primary" id="btn-add-supplier">
        <span class="material-symbols-outlined">add</span> Add Waiter
      </button>
    </div>

    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Waiter Name</th>
            <th>Contact</th>
            <th class="text-center">Incentive Tracking</th>
            <th class="text-center">Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${suppliers.length === 0 ? `
            <tr><td colspan="6"><div class="empty-state"><span class="material-symbols-outlined">badge</span><p>No waiters added yet</p></div></td></tr>
          ` : suppliers.map(s => `
            <tr>
              <td class="text-muted">${s.id}</td>
              <td><strong>${s.name}</strong></td>
              <td>${s.contact || '—'}</td>
              <td class="text-center">
                <span class="status-badge ${s.incentiveEnabled ? 'status-active' : 'status-inactive'}">
                  ${s.incentiveEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </td>
              <td class="text-center">
                <span class="status-badge ${s.active ? 'status-active' : 'status-inactive'}">
                  ${s.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td class="text-center">
                <div style="display:flex;gap:4px;justify-content:center">
                  <button class="btn btn-sm btn-ghost btn-edit-supplier" data-id="${s.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">edit</span>
                  </button>
                  <button class="btn btn-sm btn-ghost text-danger btn-delete-supplier" data-id="${s.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Add
  document.getElementById('btn-add-supplier')?.addEventListener('click', () => showSupplierForm(null, container));

  // Edit
  container.querySelectorAll('.btn-edit-supplier').forEach(btn => {
    btn.addEventListener('click', async () => {
      const s = await DB.getById('suppliers', parseInt(btn.dataset.id));
      if (s) showSupplierForm(s, container);
    });
  });

  // Delete
  container.querySelectorAll('.btn-delete-supplier').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      const s = await DB.getById('suppliers', id);
      if (s && confirm(`Delete "${s.name}"?`)) {
        await DB.remove('suppliers', id);
        showToast(`"${s.name}" deleted`, 'warning');
        renderSuppliersView(container);
      }
    });
  });
}

function showSupplierForm(supplier, container) {
  const isEdit = !!supplier;

  showModal(isEdit ? 'Edit Waiter' : 'Add New Waiter', `
    <div class="form-group">
      <label class="form-label">Waiter Name *</label>
      <input type="text" class="form-input" id="modal-sup-name" value="${supplier?.name || ''}" placeholder="Waiter name">
    </div>
    <div class="form-group">
      <label class="form-label">Contact Number</label>
      <input type="text" class="form-input" id="modal-sup-contact" value="${supplier?.contact || ''}" placeholder="Phone number">
    </div>
    <div class="form-check">
      <input type="checkbox" id="modal-sup-incentive" ${supplier?.incentiveEnabled !== false ? 'checked' : ''}>
      <label for="modal-sup-incentive">Enable Incentive Tracking</label>
    </div>
    <div class="form-check mt-1">
      <input type="checkbox" id="modal-sup-active" ${supplier?.active !== false ? 'checked' : ''}>
      <label for="modal-sup-active">Active</label>
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-sup-save"><span class="material-symbols-outlined">save</span> ${isEdit ? 'Update' : 'Save'}</button>
    `
  });

  document.getElementById('modal-sup-save')?.addEventListener('click', async () => {
    const name = document.getElementById('modal-sup-name').value.trim();
    if (!name) { showToast('Name is required', 'error'); return; }

    const data = {
      name,
      contact: document.getElementById('modal-sup-contact').value.trim(),
      incentiveEnabled: document.getElementById('modal-sup-incentive').checked,
      active: document.getElementById('modal-sup-active').checked,
      createdAt: supplier?.createdAt || new Date().toISOString(),
    };

    if (isEdit) { data.id = supplier.id; await DB.update('suppliers', data); showToast(`"${name}" updated`, 'success'); }
    else { await DB.add('suppliers', data); showToast(`"${name}" added`, 'success'); }

    closeModal();
    renderSuppliersView(container);
  });
}
