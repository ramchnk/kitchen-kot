// ===== Purchase Entry View =====
import { DB } from '../db.js';
import { formatCurrency, formatDate, showToast, showModal, closeModal, todayISO } from '../utils.js';

export async function renderPurchasesView(container) {
    const purchases = (await DB.getAll('purchases')).sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
    const ingredients = await DB.getAll('ingredients');
    const suppliers = await DB.getAll('suppliers');
    const ingredientMap = Object.fromEntries(ingredients.map(i => [i.id, i]));
    const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s]));

    const totalCost = purchases.reduce((sum, p) => sum + (p.cost || 0), 0);

    container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">shopping_cart</span>
        <div>
          <h2 class="view-title">Purchase Entry</h2>
          <p class="view-subtitle">${purchases.length} purchase record(s) • Total: ${formatCurrency(totalCost)}</p>
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
            <th>ID</th>
            <th>Ingredient</th>
            <th class="text-right">Quantity</th>
            <th>Unit</th>
            <th class="text-right">Cost (₹)</th>
            <th>Supplier</th>
            <th>Date</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${purchases.length === 0 ? `
            <tr><td colspan="8"><div class="empty-state"><span class="material-symbols-outlined">shopping_cart</span><p>No purchases recorded yet</p></div></td></tr>
          ` : purchases.map(p => {
        const ing = ingredientMap[p.ingredientId];
        const sup = supplierMap[p.supplierId];
        return `
              <tr>
                <td class="text-muted">${p.id}</td>
                <td><strong>${ing?.name || 'Unknown'}</strong></td>
                <td class="text-right font-mono">${p.quantity}</td>
                <td>${ing?.unit || '—'}</td>
                <td class="text-right amount font-mono">${formatCurrency(p.cost)}</td>
                <td>${sup?.name || '—'}</td>
                <td class="text-muted">${formatDate(p.date)}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-ghost text-danger btn-del-purchase" data-id="${p.id}">
                    <span class="material-symbols-outlined" style="font-size:16px">delete</span>
                  </button>
                </td>
              </tr>
            `;
    }).join('')}
        </tbody>
      </table>
    </div>
  `;

    document.getElementById('btn-add-purchase')?.addEventListener('click', () => {
        showPurchaseForm(ingredients.filter(i => i.active !== false), suppliers.filter(s => s.active), container);
    });

    container.querySelectorAll('.btn-del-purchase').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = parseInt(btn.dataset.id);
            if (confirm('Delete this purchase record?')) {
                // Reverse stock update
                const p = await DB.getById('purchases', id);
                if (p) {
                    const ing = await DB.getById('ingredients', p.ingredientId);
                    if (ing) {
                        ing.currentStock = Math.max(0, (ing.currentStock || 0) - (p.quantity || 0));
                        await DB.update('ingredients', ing);
                    }
                }
                await DB.remove('purchases', id);
                showToast('Purchase deleted and stock reversed', 'warning');
                renderPurchasesView(container);
            }
        });
    });
}

function showPurchaseForm(ingredients, suppliers, container) {
    const ingOptions = ingredients.map(i => `<option value="${i.id}">${i.name} (${i.unit})</option>`).join('');
    const supOptions = suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

    showModal('New Purchase Entry', `
    <div class="form-group">
      <label class="form-label">Ingredient *</label>
      <select class="form-select" id="modal-pur-ingredient">
        <option value="">Select ingredient</option>
        ${ingOptions}
      </select>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Quantity *</label>
        <input type="number" class="form-input" id="modal-pur-qty" min="0.01" step="0.01" placeholder="e.g. 1000">
      </div>
      <div class="form-group">
        <label class="form-label">Purchase Cost (₹) *</label>
        <input type="number" class="form-input" id="modal-pur-cost" min="0" step="0.01" placeholder="0.00">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Supplier</label>
        <select class="form-select" id="modal-pur-supplier">
          <option value="">Select supplier (optional)</option>
          ${supOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Date *</label>
        <input type="date" class="form-input" id="modal-pur-date" value="${todayISO()}">
      </div>
    </div>
  `, {
        footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-pur-save"><span class="material-symbols-outlined">save</span> Save Purchase</button>
    `
    });

    document.getElementById('modal-pur-save')?.addEventListener('click', async () => {
        const ingredientId = parseInt(document.getElementById('modal-pur-ingredient').value);
        const quantity = parseFloat(document.getElementById('modal-pur-qty').value);
        const cost = parseFloat(document.getElementById('modal-pur-cost').value) || 0;
        const supplierId = parseInt(document.getElementById('modal-pur-supplier').value) || null;
        const date = document.getElementById('modal-pur-date').value;

        if (!ingredientId || !quantity || quantity <= 0 || !date) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        // Save purchase
        await DB.add('purchases', {
            ingredientId,
            quantity,
            cost,
            supplierId,
            date,
            createdAt: new Date().toISOString(),
        });

        // Update ingredient stock
        const ingredient = await DB.getById('ingredients', ingredientId);
        if (ingredient) {
            ingredient.currentStock = (ingredient.currentStock || 0) + quantity;
            await DB.update('ingredients', ingredient);
        }

        showToast('Purchase recorded & stock updated!', 'success');
        closeModal();
        renderPurchasesView(container);
    });
}
