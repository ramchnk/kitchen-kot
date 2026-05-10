import { DB } from './db.js';
import { Auth } from './auth.js';
import { formatCurrency, showToast, printContent, generateKOTPrintHTML, generateCounterKOTPrintHTML, isCounterItem } from './utils.js';
import { LiquorApi } from './liquorApi.js';

// --- State Management ---
let state = {
    items: [],
    categories: [],
    tables: [],
    waiters: [],
    cart: [],
    selectedCategory: 'all',
    searchQuery: '',
    selectedTable: '',
    selectedWaiter: '',
    isLiquorEnabled: false
};

const PRIORITY_ITEMS = [
    'cup',
    'Spl Fruits Salad',
    'Water Kinley 1Ltr',
    'Water Aquafina 500ml',
    'Penut Masala',
    'Onion Pakkoda',
    'Sundal',
    'Boil Egg',
    'Ver Kadalai',
    'Chicken Uppukari',
    'Half Boil',
    'Egg Poriyal'
].map(i => i.toLowerCase());

// --- DOM Elements ---
const loader = document.getElementById('loader');
const itemsGrid = document.getElementById('items-grid');
const categoryChips = document.getElementById('category-chips');
const searchInput = document.getElementById('item-search');
const cartBar = document.getElementById('cart-bar');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items-list');
const overlayTotal = document.getElementById('overlay-total');
const sendKotBtn = document.getElementById('btn-send-kot');
const selectTable = document.getElementById('select-table');
const selectWaiter = document.getElementById('select-waiter');
const userNameEl = document.getElementById('user-name');

// --- Initialization ---
async function init() {
    Auth.onAuthChange(async (user) => {
        if (!user) {
            window.location.href = '/index.html';
            return;
        }

        DB.setAccountId(Auth.getAccountId());
        const account = Auth.getCurrentAccount();
        state.isLiquorEnabled = account?.isLiquorEnabled || false;
        userNameEl.textContent = user.name;

        await loadInitialData();
        renderCategories();
        renderItems();
        populateSelectors();
        
        loader.classList.add('hidden');
    });
}

async function loadInitialData() {
    try {
        const [items, tables, waiters] = await Promise.all([
            DB.getAll('items'),
            DB.getAll('tables'),
            DB.getAll('suppliers') // Suppliers are used as Waiters in this system
        ]);

        let allItems = items.filter(i => i.active);
        
        if (state.isLiquorEnabled) {
            try {
                await LiquorApi.ensureReady();
                const liquorItems = LiquorApi.getProducts();
                allItems = [...allItems, ...liquorItems];
            } catch (e) {
                console.error('Liquor load error:', e);
            }
        }

        // Sort items with priority items first
        allItems.sort((a, b) => {
            const aIdx = PRIORITY_ITEMS.indexOf(a.name.toLowerCase());
            const bIdx = PRIORITY_ITEMS.indexOf(b.name.toLowerCase());
            
            if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
            if (aIdx !== -1) return -1;
            if (bIdx !== -1) return 1;
            return a.name.localeCompare(b.name);
        });

        state.items = allItems;
        state.tables = tables.filter(t => t.active);
        state.waiters = waiters.filter(w => w.active);

        // Extract unique categories
        const cats = new Set(allItems.map(i => i.category));
        state.categories = ['all', ...Array.from(cats)].filter(Boolean);
    } catch (err) {
        console.error('Data load error:', err);
        showToast('Failed to load menu data', 'error');
    }
}

// --- Rendering ---
function renderCategories() {
    categoryChips.innerHTML = state.categories.map(cat => `
        <div class="chip ${state.selectedCategory === cat ? 'active' : ''}" 
             data-category="${cat}">
            ${cat === 'all' ? 'All Items' : cat}
        </div>
    `).join('');

    categoryChips.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            state.selectedCategory = chip.dataset.category;
            renderCategories();
            renderItems();
        });
    });
}

function renderItems() {
    const filtered = state.items.filter(item => {
        const matchesCategory = state.selectedCategory === 'all' || item.category === state.selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                            (item.code && item.code.toLowerCase().includes(state.searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        itemsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted)">
                <span class="material-symbols-outlined" style="font-size: 48px; opacity: 0.3">search_off</span>
                <p>No items found</p>
            </div>
        `;
        return;
    }

    itemsGrid.innerHTML = filtered.map(item => `
        <div class="m-item-card" data-id="${item.id}">
            <div class="m-item-name">${item.name}</div>
            <div class="m-item-price">${formatCurrency(item.sellingPrice)}</div>
            ${item.isLiquor ? '<div style="font-size: 0.6rem; color: #7c3aed">LIQUOR</div>' : ''}
            <div class="m-add-btn">
                <span class="material-symbols-outlined">add</span>
            </div>
        </div>
    `).join('');

    itemsGrid.querySelectorAll('.m-item-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            const item = state.items.find(i => String(i.id) === id);
            addToCart(item);
        });
    });
}

function populateSelectors() {
    selectTable.innerHTML = '<option value="">Select Table</option>' + 
        state.tables.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
    
    selectWaiter.innerHTML = '<option value="">Select Waiter</option>' + 
        state.waiters.map(w => `<option value="${w.id}">${w.name}</option>`).join('');

    selectTable.addEventListener('change', (e) => state.selectedTable = e.target.value);
    selectWaiter.addEventListener('change', (e) => state.selectedWaiter = e.target.value);
}

// --- Cart Logic ---
function addToCart(item) {
    const existing = state.cart.find(c => c.itemId === item.id);
    if (existing) {
        existing.quantity += 1;
        existing.amount = existing.quantity * existing.price;
    } else {
        state.cart.push({
            itemId: item.id,
            itemName: item.name,
            category: item.category,
            quantity: 1,
            price: item.sellingPrice,
            amount: item.sellingPrice,
            isLiquor: item.isLiquor || false,
            incentivePercent: item.incentivePercent || 0,
            kotPrintedQty: 0
        });
    }
    updateCartUI();
    showToast(`Added ${item.name}`, 'success', 1000);
}

function updateCartUI() {
    const totalQty = state.cart.reduce((sum, c) => sum + c.quantity, 0);
    const totalAmount = state.cart.reduce((sum, c) => sum + c.amount, 0);

    cartCount.textContent = totalQty;
    cartTotal.textContent = formatCurrency(totalAmount);
    overlayTotal.textContent = formatCurrency(totalAmount);

    if (totalQty > 0) {
        cartBar.classList.remove('hidden');
    } else {
        cartBar.classList.add('hidden');
        cartOverlay.classList.remove('visible');
    }

    renderCartItems();
}

function renderCartItems() {
    cartItemsList.innerHTML = state.cart.map((item, idx) => `
        <div class="cart-item">
            <div style="flex: 1">
                <div style="font-weight: 600">${item.itemName}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted)">${formatCurrency(item.price)}</div>
            </div>
            <div class="cart-item-qty">
                <span class="qty-btn" onclick="window.updateQty(${idx}, -1)">−</span>
                <span style="font-weight: 700; min-width: 20px; text-align: center">${item.quantity}</span>
                <span class="qty-btn" onclick="window.updateQty(${idx}, 1)">+</span>
            </div>
        </div>
    `).join('');
}

window.updateQty = (idx, delta) => {
    state.cart[idx].quantity += delta;
    if (state.cart[idx].quantity <= 0) {
        state.cart.splice(idx, 1);
    } else {
        state.cart[idx].amount = state.cart[idx].quantity * state.cart[idx].price;
    }
    updateCartUI();
};

// --- Events ---
searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderItems();
});

cartBar.addEventListener('click', () => {
    cartOverlay.classList.add('visible');
});

closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('visible');
});

sendKotBtn.addEventListener('click', async () => {
    if (state.cart.length === 0) return;
    if (!state.selectedTable) {
        showToast('Please select a Table', 'warning');
        return;
    }
    if (!state.selectedWaiter) {
        showToast('Please select a Waiter', 'warning');
        return;
    }

    sendKotBtn.disabled = true;
    sendKotBtn.innerHTML = '<span class="material-symbols-outlined spinning">sync</span> SENDING...';

    try {
        const orderNumber = await DB.getNextOrderNumber();
        const now = new Date().toISOString();
        
        // Prepare order data
        const order = {
            orderNumber,
            supplierId: parseInt(state.selectedWaiter),
            tableId: parseInt(state.selectedTable),
            items: state.cart.map(c => ({ ...c, kotPrintedQty: c.quantity })),
            subTotal: state.cart.reduce((sum, c) => sum + c.amount, 0),
            acCharge: 0,
            totalAmount: state.cart.reduce((sum, c) => sum + c.amount, 0),
            status: 'open',
            type: 'kot',
            createdAt: now,
            billedAt: null,
            date: now.split('T')[0]
        };

        await DB.add('orders', order);

        // Print KOT
        const supplierName = state.waiters.find(w => String(w.id) === state.selectedWaiter)?.name || '';
        const tableName = state.tables.find(t => String(t.id) === state.selectedTable)?.name || '';

        // Handle KOT Printing (same logic as order.js)
        const kitchenItems = order.items.filter(item => !isCounterItem(item));
        const counterItems = order.items.filter(item => isCounterItem(item));

        if (kitchenItems.length > 0) {
            printContent(generateKOTPrintHTML({ ...order, items: kitchenItems }, supplierName, tableName));
        }
        
        if (counterItems.length > 0) {
            setTimeout(() => {
                printContent(generateCounterKOTPrintHTML(order, supplierName, tableName, counterItems));
            }, 1000);
        }

        showToast('KOT Sent successfully!', 'success');
        
        // Reset Cart
        state.cart = [];
        updateCartUI();
        cartOverlay.classList.remove('visible');
    } catch (err) {
        console.error('KOT error:', err);
        showToast('Failed to send KOT: ' + err.message, 'error');
    } finally {
        sendKotBtn.disabled = false;
        sendKotBtn.innerHTML = '<span class="material-symbols-outlined">print</span> SEND KOT';
    }
});

// Start the app
init();
