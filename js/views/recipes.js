import { DB } from '../db.js';
import { Auth } from '../auth.js';
import { showToast, showModal, closeModal } from '../utils.js';

export async function renderRecipesView(container) {
  const EXCLUDE_CATEGORIES = ['LIQUOR', 'CIGARETTE', 'COOL DRINKS'];
  const items = (await DB.getAll('items')).filter(i => i.active && !EXCLUDE_CATEGORIES.includes((i.category || '').toUpperCase()));
  const ingredients = await DB.getAll('ingredients');
  const allRecipes = await DB.getAll('itemIngredients');
  const ingredientMap = Object.fromEntries(ingredients.map(i => [i.id, i]));
  const isAdmin = Auth.isAdmin();

  // Group recipes by itemId
  const recipesByItem = {};
  allRecipes.forEach(r => {
    if (!recipesByItem[r.itemId]) recipesByItem[r.itemId] = [];
    recipesByItem[r.itemId].push(r);
  });

  container.innerHTML = `
    <div class="view-header">
      <div class="view-header-left">
        <span class="material-symbols-outlined view-header-icon">menu_book</span>
        <div>
          <h2 class="view-title">Recipe Configuration</h2>
          <p class="view-subtitle">Map ingredients to menu items</p>
        </div>
      </div>
    </div>

    <div class="search-container mb-2" style="max-width:350px">
      <span class="material-symbols-outlined">search</span>
      <input type="text" class="form-input" id="recipe-filter" placeholder="Search items...">
    </div>

    <div id="recipe-cards-container">
      ${items.map(item => {
    const recipes = recipesByItem[item.id] || [];
    return `
          <div class="card mb-2 recipe-card" data-item-name="${item.name.toLowerCase()}">
            <div class="card-header">
              <div>
                <strong style="font-size:1rem">${item.name}</strong>
                <span class="status-badge" style="margin-left:8px;background:var(--bg-elevated);color:var(--text-secondary)">${item.category}</span>
                <span class="text-muted" style="margin-left:8px;font-size:0.78rem">${recipes.length} ingredient(s)</span>
              </div>
              ${isAdmin ? `
              <button class="btn btn-sm btn-primary btn-add-recipe" data-item-id="${item.id}">
                <span class="material-symbols-outlined" style="font-size:16px">add</span> Add Ingredient
              </button>
              ` : ''}
            </div>
            ${recipes.length > 0 ? `
              <table class="data-table" style="margin-top:8px">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    ${isAdmin ? '<th class="text-center" style="width:60px">Remove</th>' : ''}
                  </tr>
                </thead>
                <tbody>
                  ${recipes.map(r => {
      const ing = ingredientMap[r.ingredientId];
      return `
                      <tr>
                        <td><strong>${ing?.name || 'Unknown'}</strong></td>
                        <td class="font-mono">${r.quantity}</td>
                        <td>${ing?.unit || '—'}</td>
                        ${isAdmin ? `
                        <td class="text-center">
                          <button class="btn btn-sm btn-ghost text-danger btn-del-recipe" data-id="${r.id}">
                            <span class="material-symbols-outlined" style="font-size:16px">close</span>
                          </button>
                        </td>
                        ` : ''}
                      </tr>
                    `;
    }).join('')}
                </tbody>
              </table>
            ` : `
              <div class="text-muted" style="padding:12px 0;font-size:0.85rem">No ingredients mapped. Click "Add Ingredient" to configure recipe.</div>
            `}
          </div>
        `;
  }).join('')}
    </div>
  `;

  // Filter
  document.getElementById('recipe-filter')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    container.querySelectorAll('.recipe-card').forEach(card => {
      card.style.display = card.dataset.itemName.includes(q) ? '' : 'none';
    });
  });

  // Add ingredient to recipe
  container.querySelectorAll('.btn-add-recipe').forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = parseInt(btn.dataset.itemId);
      const item = items.find(i => i.id === itemId);
      showAddRecipeForm(itemId, item?.name || '', ingredients, container);
    });
  });

  // Remove ingredient from recipe
  container.querySelectorAll('.btn-del-recipe').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = parseInt(btn.dataset.id);
      if (confirm('Remove this ingredient from recipe?')) {
        await DB.remove('itemIngredients', id);
        showToast('Ingredient removed from recipe', 'warning');
        renderRecipesView(container);
      }
    });
  });
}

function showAddRecipeForm(itemId, itemName, ingredients, container) {
  const ingOptions = ingredients
    .filter(i => i.active !== false)
    .map(i => `<option value="${i.id}">${i.name} (${i.unit})</option>`)
    .join('');

  showModal(`Add Ingredient to ${itemName}`, `
    <div class="form-group">
      <label class="form-label">Ingredient *</label>
      <select class="form-select" id="modal-recipe-ingredient">
        <option value="">Select ingredient</option>
        ${ingOptions}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Quantity per serving *</label>
      <input type="number" class="form-input" id="modal-recipe-qty" min="0.01" step="0.01" placeholder="e.g. 100">
    </div>
  `, {
    footer: `
      <button class="btn btn-ghost" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Cancel</button>
      <button class="btn btn-primary" id="modal-recipe-save"><span class="material-symbols-outlined">save</span> Add</button>
    `
  });

  document.getElementById('modal-recipe-save')?.addEventListener('click', async () => {
    const ingredientId = parseInt(document.getElementById('modal-recipe-ingredient').value);
    const quantity = parseFloat(document.getElementById('modal-recipe-qty').value);

    if (!ingredientId || !quantity || quantity <= 0) {
      showToast('Please fill all fields', 'error');
      return;
    }

    await DB.add('itemIngredients', { itemId, ingredientId, quantity });
    showToast('Ingredient added to recipe', 'success');
    closeModal();
    renderRecipesView(container);
  });
}
