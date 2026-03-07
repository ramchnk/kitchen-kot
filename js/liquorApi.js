// ===== Liquor API Service =====
// Handles authentication and product fetching from external liquor API
// Persists token & credentials in sessionStorage to survive page refreshes

const LIQUOR_API_BASE = 'https://tnfl2-cb6ea45c64b3.herokuapp.com/services';
const STORAGE_KEY_TOKEN = 'liquor_api_token';
const STORAGE_KEY_CREDS = 'liquor_api_creds';

let liquorToken = null;
let liquorProducts = [];
let liquorEnabled = false;

// ---- Restore token from sessionStorage ----
function restoreToken() {
    if (liquorToken) return true;
    const saved = sessionStorage.getItem(STORAGE_KEY_TOKEN);
    if (saved) {
        liquorToken = saved;
        liquorEnabled = true;
        return true;
    }
    return false;
}

// ---- Restore credentials and re-authenticate ----
async function restoreAndAuth() {
    if (liquorToken) return true;

    // Try restoring token first
    if (restoreToken()) return true;

    // Try re-authenticating with saved credentials
    const creds = sessionStorage.getItem(STORAGE_KEY_CREDS);
    if (creds) {
        try {
            const { email, password } = JSON.parse(creds);
            return await authenticate(email, password);
        } catch (e) {
            console.warn('Failed to restore liquor credentials:', e);
        }
    }
    return false;
}

// ---- Authenticate with Liquor API ----
async function authenticate(email, password) {
    try {
        const response = await fetch(`${LIQUOR_API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            console.warn('Liquor API auth failed:', response.status);
            return false;
        }

        const data = await response.json();
        liquorToken = data.accessToken;
        liquorEnabled = true;

        // Persist to sessionStorage
        sessionStorage.setItem(STORAGE_KEY_TOKEN, liquorToken);
        sessionStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify({ email, password }));

        console.log('Liquor API authenticated successfully');
        return true;
    } catch (err) {
        console.warn('Liquor API auth error:', err.message);
        return false;
    }
}

// ---- Fetch Liquor Products ----
async function fetchProducts(isBackground = false) {
    // Try to restore token if not available
    if (!liquorToken) {
        const restored = await restoreAndAuth();
        if (!restored) {
            console.warn('No liquor token available, cannot fetch products');
            return [];
        }
    }

    try {
        const response = await fetch(`${LIQUOR_API_BASE}/productmaster`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${liquorToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 401 || response.status === 403) {
            // Token expired — try re-authenticating
            console.warn('Liquor token expired, re-authenticating...');
            liquorToken = null;
            sessionStorage.removeItem(STORAGE_KEY_TOKEN);
            const reAuthed = await restoreAndAuth();
            if (reAuthed) {
                return await fetchProducts(isBackground); // Retry with new token
            }
            return [];
        }

        if (!response.ok) {
            console.warn('Liquor products fetch failed:', response.status);
            return [];
        }

        const data = await response.json();
        const productList = data.productList || [];

        // Map liquor products to match the app's item format
        liquorProducts = productList.map((p, index) => ({
            id: `liquor_${index}_${p.SKU}`,
            name: p.SKU,
            category: 'LIQUOR',
            sellingPrice: p.salePrice || 0,
            purchasePrice: p.purchasePrice || 0,
            profitAmount: p.profitAmount || 0,
            currentStock: p.stock || 0,
            openingStock: p.openingStock || 0,
            purchaseStock: p.purchaseStock || 0,
            sku: p.SKU,
            brand: p.brand,
            upc: p.UPC,
            code: p.UPC, // Map UPC to code for easy searching/scanning
            incentivePercent: 0,
            active: true,
            isLiquor: true,
        }));

        // Persist to local storage for fast loading next time (scoped by account)
        const accountId = sessionStorage.getItem(STORAGE_KEY_CREDS) ? JSON.parse(sessionStorage.getItem(STORAGE_KEY_CREDS)).email : 'default';
        localStorage.setItem(`cached_liquor_products_${accountId}`, JSON.stringify(liquorProducts));
        localStorage.setItem(`cached_liquor_timestamp_${accountId}`, Date.now().toString());

        console.log(`Loaded ${liquorProducts.length} liquor products from API`);

        // Notify listeners if this was a background refresh
        if (isBackground && window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('liquor-data-refreshed', { detail: liquorProducts }));
        }

        return liquorProducts;
    } catch (err) {
        console.warn('Liquor products fetch error:', err.message);
        return [];
    }
}

// ---- Initialize: Auth + Fetch ----
async function initialize(email, password) {
    const authenticated = await authenticate(email, password);
    if (authenticated) {
        await fetchProducts();
    }
    return liquorEnabled;
}

// Loads from local cache immediately, then triggers background fetch
async function ensureReady() {
    // 1. Try memory
    if (liquorProducts.length > 0) {
        // Already loaded, just refresh in background
        fetchProducts(true);
        return true;
    }

    // 2. Try Local Storage Cache (check current session's user)
    const creds = sessionStorage.getItem(STORAGE_KEY_CREDS);
    let accountId = 'default';
    if (creds) {
        try { accountId = JSON.parse(creds).email; } catch (e) { }
    }

    const cached = localStorage.getItem(`cached_liquor_products_${accountId}`);
    if (cached) {
        try {
            liquorProducts = JSON.parse(cached);
            console.log(`Restored ${liquorProducts.length} liquor products from local cache`);
            // Trigger background fetch to update
            fetchProducts(true);
            return true;
        } catch (e) {
            console.warn('Failed to parse cached liquor products', e);
        }
    }

    // 3. No cache, must wait for initial fetch
    const ready = await restoreAndAuth();
    if (ready) {
        await fetchProducts();
        return liquorProducts.length > 0;
    }
    return false;
}

// ---- Getters ----
function getProducts() { return liquorProducts; }
function isEnabled() { return liquorEnabled || restoreToken(); }
function getToken() { return liquorToken; }

// ---- Reset ----
function reset() {
    const creds = sessionStorage.getItem(STORAGE_KEY_CREDS);
    if (creds) {
        try {
            const accountId = JSON.parse(creds).email;
            localStorage.removeItem(`cached_liquor_products_${accountId}`);
            localStorage.removeItem(`cached_liquor_timestamp_${accountId}`);
        } catch (e) { }
    }
    liquorToken = null;
    liquorProducts = [];
    liquorEnabled = false;
    sessionStorage.removeItem(STORAGE_KEY_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY_CREDS);
}

export const LiquorApi = {
    initialize,
    authenticate,
    fetchProducts,
    ensureReady,
    getProducts,
    isEnabled,
    getToken,
    reset,
};
