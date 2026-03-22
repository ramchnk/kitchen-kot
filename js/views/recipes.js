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
  showModal(`Add Ingredient to ${itemName}`, `
    <div class="form-group">
      <label class="form-label">Ingredient *</label>
      <div class="search-container">
        <span class="material-symbols-outlined">search</span>
        <input type="text" class="form-input" id="modal-recipe-ingredient-search" placeholder="Search ingredient..." autocomplete="off">
        <div class="search-dropdown" id="modal-recipe-ingredient-dropdown"></div>
        <input type="hidden" id="modal-recipe-ingredient-id">
      </div>
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

  const searchInput = document.getElementById('modal-recipe-ingredient-search');
  const dropdown = document.getElementById('modal-recipe-ingredient-dropdown');
  const hiddenId = document.getElementById('modal-recipe-ingredient-id');
  const qtyInput = document.getElementById('modal-recipe-qty');
  let highlightedIdx = -1;
  let filtered = [];

  const activeIngredients = ingredients.filter(i => i.active !== false);

  function renderDropdown(items) {
    if (items.length === 0) {
      dropdown.innerHTML = '<div class="search-no-results">No matches found</div>';
    } else {
      dropdown.innerHTML = items.map((ing, i) => `
        <div class="search-dropdown-item ${i === highlightedIdx ? 'highlighted' : ''}" data-id="${ing.id}" data-idx="${i}">
          <span>${ing.name} <small class="text-muted">(${ing.unit})</small></span>
        </div>
      `).join('');
    }
    dropdown.classList.add('visible');

    dropdown.querySelectorAll('.search-dropdown-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.idx);
        selectIngredient(items[idx]);
      });
    });
  }

  function selectIngredient(ing) {
    searchInput.value = ing.name;
    hiddenId.value = ing.id;
    dropdown.classList.remove('visible');
    qtyInput.focus();
  }

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    filtered = activeIngredients.filter(i => i.name.toLowerCase().includes(q));
    highlightedIdx = filtered.length > 0 ? 0 : -1;
    renderDropdown(filtered);
  });

  searchInput.addEventListener('focus', () => {
    const q = searchInput.value.toLowerCase().trim();
    if (q === '') {
      filtered = activeIngredients.slice(0, 50);
    } else {
      filtered = activeIngredients.filter(i => i.name.toLowerCase().includes(q));
    }
    highlightedIdx = -1;
    renderDropdown(filtered);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIdx = Math.min(highlightedIdx + 1, filtered.length - 1);
      renderDropdown(filtered);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIdx = Math.max(highlightedIdx - 1, 0);
      renderDropdown(filtered);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIdx >= 0 && filtered[highlightedIdx]) {
        selectIngredient(filtered[highlightedIdx]);
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('visible');
    }
  });

  document.getElementById('modal-recipe-save')?.addEventListener('click', async () => {
    const ingredientId = parseInt(hiddenId.value);
    const quantity = parseFloat(qtyInput.value);

    if (!ingredientId || !quantity || quantity <= 0) {
      showToast('Please select an ingredient and enter a valid quantity', 'error');
      return;
    }

    await DB.add('itemIngredients', { itemId, ingredientId, quantity });
    showToast('Ingredient added to recipe', 'success');
    closeModal();
    renderRecipesView(container);
  });
}
