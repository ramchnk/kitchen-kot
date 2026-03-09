// ===== Main Application — Router, Navigation & Auth =====
import { DB } from './db.js';
import { Auth } from './auth.js';
import { registerShortcut } from './keyboard.js';
import { initThemeSystem } from './themes.js';
import { showToast } from './utils.js';
import { renderOrderView, destroyOrderView } from './views/order.js';
import { renderActiveOrdersView } from './views/activeOrders.js';
import { renderItemsView } from './views/items.js';
import { renderSuppliersView } from './views/suppliers.js';
import { renderIngredientsView } from './views/ingredients.js';
import { renderRecipesView } from './views/recipes.js';
import { renderTablesView } from './views/tables.js';
import { renderPurchasesView } from './views/purchases.js';
import { renderReportsView } from './views/reports.js';
import { renderGrocerySuppliersView } from './views/grocerySuppliers.js';
import { renderExpensesView } from './views/expenses.js';

let currentView = null;
let currentDestroy = null;

const routes = {
    'orders': { render: renderOrderView, destroy: destroyOrderView },
    'active-orders': { render: renderActiveOrdersView },
    'items': { render: renderItemsView },
    'suppliers': { render: renderSuppliersView },
    'ingredients': { render: renderIngredientsView },
    'recipes': { render: renderRecipesView },
    'tables': { render: renderTablesView },
    'purchases': { render: renderPurchasesView },
    'reports': { render: renderReportsView },
    'grocery-suppliers': { render: renderGrocerySuppliersView },
    'expenses': { render: renderExpensesView },
};

// Admin-only routes
const adminOnlyRoutes = new Set(['items', 'suppliers', 'ingredients', 'recipes', 'tables']);

// ---- Navigation ----
async function navigate(viewName) {
    if (currentDestroy) { currentDestroy(); currentDestroy = null; }

    const route = routes[viewName];
    if (!route) viewName = 'orders';

    // Block salesman from admin-only routes
    const role = Auth.getUserRole();
    if (role === 'salesman' && adminOnlyRoutes.has(viewName)) {
        viewName = 'orders';
    }

    currentView = viewName;
    const container = document.getElementById('view-container');
    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-muted)">Loading...</div>';

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });

    const r = routes[viewName] || routes['orders'];
    await r.render(container);
    currentDestroy = r.destroy || null;

    if (location.hash !== `#/${viewName}`) {
        history.pushState(null, '', `#/${viewName}`);
    }
}

function getViewFromHash() {
    const hash = location.hash.replace('#/', '');
    return hash || 'orders';
}

// ---- Keyboard Shortcuts ----
function setupGlobalShortcuts() {
    const viewKeys = [
        ['alt+1', 'orders'],
        ['alt+2', 'active-orders'],
        ['alt+3', 'items'],
        ['alt+4', 'suppliers'],
        ['alt+5', 'ingredients'],
        ['alt+6', 'recipes'],
        ['alt+7', 'tables'],
        ['alt+8', 'purchases'],
        ['alt+9', 'reports'],
        ['alt+0', 'grocery-suppliers'],
        ['alt+e', 'expenses'],
    ];

    viewKeys.forEach(([key, view]) => {
        registerShortcut(key, () => navigate(view), `Go to ${view}`);
    });

    registerShortcut('alt+n', () => navigate('orders'), 'New Order');
}

// ---- Sidebar Navigation ----
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            if (view) navigate(view);
        });
    });
}

// ---- Role-Based Menu Visibility ----
function applyRoleVisibility(role) {
    document.querySelectorAll('.nav-item[data-role]').forEach(item => {
        const requiredRole = item.dataset.role;
        if (requiredRole === 'admin' && role !== 'admin') {
            item.classList.add('role-hidden');
        } else {
            item.classList.remove('role-hidden');
        }
    });
}

// ---- Update Sidebar User Info ----
function updateSidebarUserInfo(user, account) {
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');
    const restaurantEl = document.getElementById('sidebar-restaurant-name');
    const subtitleEl = document.getElementById('sidebar-restaurant-subtitle');
    const joinCodeSection = document.getElementById('join-code-section');
    const joinCodeValue = document.getElementById('join-code-value');

    if (nameEl) nameEl.textContent = user?.name || 'User';
    if (roleEl) roleEl.textContent = user?.role === 'admin' ? 'Admin' : 'Salesman';
    if (restaurantEl) restaurantEl.textContent = account?.name || 'KOT System';
    if (subtitleEl) subtitleEl.textContent = 'Restaurant POS';

    // Show join code for admin
    if (user?.role === 'admin' && joinCodeSection && joinCodeValue && account?.id) {
        joinCodeSection.classList.remove('hidden');
        joinCodeValue.textContent = account.id;
        joinCodeSection.onclick = () => {
            navigator.clipboard.writeText(account.id).then(() => {
                showToast('Join code copied!', 'success');
            });
        };
    } else if (joinCodeSection) {
        joinCodeSection.classList.add('hidden');
    }
}

// ---- Show Auth Page / Show App ----
function showAuthPage() {
    document.getElementById('auth-page')?.classList.remove('hidden');
    document.getElementById('app')?.classList.add('hidden');
}

function showApp() {
    document.getElementById('auth-page')?.classList.add('hidden');
    document.getElementById('app')?.classList.remove('hidden');
}

// ---- Auth Form Handlers ----
function setupAuthForms() {
    const tabLogin = document.getElementById('auth-tab-login');
    const tabRegister = document.getElementById('auth-tab-register');
    const formLogin = document.getElementById('auth-form-login');
    const formRegister = document.getElementById('auth-form-register');
    const errorEl = document.getElementById('auth-error');

    function showError(msg) {
        if (errorEl) { errorEl.textContent = msg; errorEl.classList.remove('hidden'); }
    }
    function clearError() {
        if (errorEl) { errorEl.classList.add('hidden'); }
    }

    // Tab switching
    tabLogin?.addEventListener('click', () => {
        tabLogin.classList.add('active'); tabRegister.classList.remove('active');
        formLogin.classList.remove('hidden'); formRegister.classList.add('hidden');
        clearError();
    });
    tabRegister?.addEventListener('click', () => {
        tabRegister.classList.add('active'); tabLogin.classList.remove('active');
        formRegister.classList.remove('hidden'); formLogin.classList.add('hidden');
        clearError();
    });

    // Register type switching (admin vs salesman)
    const registerType = document.getElementById('register-type');
    const restaurantGroup = document.getElementById('register-restaurant-group');
    const codeGroup = document.getElementById('register-code-group');
    registerType?.addEventListener('change', () => {
        if (registerType.value === 'admin') {
            restaurantGroup.classList.remove('hidden');
            codeGroup.classList.add('hidden');
        } else {
            restaurantGroup.classList.add('hidden');
            codeGroup.classList.remove('hidden');
        }
    });

    // Login handler
    document.getElementById('btn-login')?.addEventListener('click', async () => {
        clearError();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        if (!email || !password) { showError('Please enter email and password'); return; }

        try {
            document.getElementById('btn-login').disabled = true;
            document.getElementById('btn-login').textContent = 'Logging in...';
            await Auth.login(email, password);
            // Auth state listener will handle the rest
        } catch (err) {
            console.error('Login error:', err);
            let msg = err.message;
            if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found')) {
                msg = 'Invalid email or password';
            }
            showError(msg);
            document.getElementById('btn-login').disabled = false;
            document.getElementById('btn-login').innerHTML = '<span class="material-symbols-outlined">login</span> Login';
        }
    });

    // Register handler
    document.getElementById('btn-register')?.addEventListener('click', async () => {
        clearError();
        const type = document.getElementById('register-type').value;
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        if (!name || !email || !password) { showError('Please fill all fields'); return; }
        if (password.length < 6) { showError('Password must be at least 6 characters'); return; }

        try {
            document.getElementById('btn-register').disabled = true;
            document.getElementById('btn-register').textContent = 'Creating account...';

            if (type === 'admin') {
                const restaurant = document.getElementById('register-restaurant').value.trim();
                if (!restaurant) { showError('Please enter restaurant name'); document.getElementById('btn-register').disabled = false; return; }
                await Auth.registerAdmin(name, email, password, restaurant);
            } else {
                const code = document.getElementById('register-code').value.trim();
                if (!code) { showError('Please enter the join code'); document.getElementById('btn-register').disabled = false; return; }
                await Auth.registerSalesman(name, email, password, code);
            }
            // Auth state listener will handle the rest
        } catch (err) {
            console.error('Register error:', err);
            let msg = err.message;
            if (msg.includes('email-already-in-use')) msg = 'This email is already registered. Try logging in.';
            if (msg.includes('weak-password')) msg = 'Password is too weak. Use at least 6 characters.';
            showError(msg);
            document.getElementById('btn-register').disabled = false;
            document.getElementById('btn-register').innerHTML = '<span class="material-symbols-outlined">person_add</span> Register';
        }
    });

    // Allow Enter key on login fields
    document.getElementById('login-password')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('btn-login')?.click();
    });
    document.getElementById('login-email')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('login-password')?.focus();
    });

    // Logout handler
    document.getElementById('btn-logout')?.addEventListener('click', async () => {
        if (confirm('Are you sure you want to logout?')) {
            await Auth.logout();
        }
    });
}

// ---- Initialize the App ----
async function init() {
    // Setup theme system early (works even on auth page)
    initThemeSystem();

    // Setup auth forms
    setupAuthForms();

    // Listen for auth state changes
    Auth.onAuthChange(async (user) => {
        if (user) {
            // User is logged in
            const account = Auth.getCurrentAccount();

            // Set DB account context
            DB.setAccountId(Auth.getAccountId());

            // Seed demo data for new accounts
            await DB.seedDemoData();

            // Update UI
            updateSidebarUserInfo(user, account);
            applyRoleVisibility(user.role);

            // Show the app
            showApp();

            // Setup navigation & shortcuts
            setupNavigation();
            setupGlobalShortcuts();

            // Handle hash changes
            window.addEventListener('hashchange', () => navigate(getViewFromHash()));

            // Navigate to initial route
            navigate(getViewFromHash());
        } else {
            // User is logged out — show auth page
            showAuthPage();
        }
    });
}

// Start the app
init().catch(err => {
    console.error('Failed to initialize app:', err);
    const container = document.getElementById('view-container');
    if (container) {
        container.innerHTML = `
        <div class="empty-state">
          <span class="material-symbols-outlined">error</span>
          <p>Failed to initialize application. Please refresh the page.</p>
          <p style="font-size: 0.78rem; margin-top: 8px;">${err.message}</p>
        </div>
      `;
    }
});
