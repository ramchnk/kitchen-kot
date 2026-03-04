// ===== Liquor API Service =====
// Handles authentication and product fetching from external liquor API

const LIQUOR_API_BASE = 'https://tnfl2-cb6ea45c64b3.herokuapp.com/services';

let liquorToken = null;
let liquorProducts = [];
let liquorEnabled = false;

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
        console.log('Liquor API authenticated successfully');
        return true;
    } catch (err) {
        console.warn('Liquor API auth error:', err.message);
        return false;
    }
}

// ---- Fetch Liquor Products ----
async function fetchProducts() {
    if (!liquorToken) {
        console.warn('No liquor token available');
        return [];
    }

    try {
        const response = await fetch(`${LIQUOR_API_BASE}/productmaster`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${liquorToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.warn('Liquor products fetch failed:', response.status);
            return [];
        }

        const data = await response.json();
        const productList = data.productList || [];

        // Map liquor products to match the app's item format
        liquorProducts = productList.map((p, index) => ({
            id: `liquor_${index}_${p.SKU}`, // Unique string ID to avoid collision with local items
            name: `${p.brand} ${p.SKU}`,
            category: 'LIQUOR',
            sellingPrice: p.salePrice || 0,
            purchasePrice: p.purchasePrice || 0,
            profitAmount: p.profitAmount || 0,
            currentStock: p.stock || 0,
            openingStock: p.openingStock || 0,
            purchaseStock: p.purchaseStock || 0,
            sku: p.SKU,
            brand: p.brand,
            incentivePercent: 0,
            active: true,
            isLiquor: true, // Flag to identify liquor items
        }));

        console.log(`Loaded ${liquorProducts.length} liquor products`);
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
        liquorEnabled = true;
    }
    return liquorEnabled;
}

// ---- Getters ----
function getProducts() { return liquorProducts; }
function isEnabled() { return liquorEnabled; }
function getToken() { return liquorToken; }

// ---- Reset ----
function reset() {
    liquorToken = null;
    liquorProducts = [];
    liquorEnabled = false;
}

export const LiquorApi = {
    initialize,
    authenticate,
    fetchProducts,
    getProducts,
    isEnabled,
    getToken,
    reset,
};
