// ===== Firestore Database Layer (Multi-Tenant) =====
// All data is scoped under accounts/{accountId}/ for tenant isolation.
import { firestore } from './firebase.js';
import {
  collection, doc, getDoc, getDocs, setDoc, deleteDoc,
  query, where, runTransaction, writeBatch, orderBy, limit
} from 'firebase/firestore';

// ---- Account Context ----
let _accountId = null;

function setAccountId(id) { _accountId = id; }
function getAccountId() { return _accountId; }

// Helper: get tenant-scoped collection reference
function tenantCollection(storeName) {
  if (!_accountId) throw new Error('Account not set. Please login first.');
  return collection(firestore, 'accounts', _accountId, storeName);
}

// Helper: get tenant-scoped document reference
function tenantDoc(storeName, docId) {
  if (!_accountId) throw new Error('Account not set. Please login first.');
  return doc(firestore, 'accounts', _accountId, storeName, String(docId));
}

// Helper: get tenant-scoped counter document reference
function counterDoc(counterName) {
  if (!_accountId) throw new Error('Account not set. Please login first.');
  return doc(firestore, 'accounts', _accountId, '_counters', counterName);
}

// ---- Generic CRUD Operations ----

// Local cache to deeply optimize repetitive Firestore reads and prevent Quota issues
const localCache = {};
const CACHE_TTL_MS = 30000; // Cache valid for 30 seconds

function invalidateCache(storeName) {
  delete localCache[storeName];
}

async function getAll(storeName) {
  const cached = localCache[storeName];
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }
  const snap = await getDocs(tenantCollection(storeName));
  const data = snap.docs.map(d => d.data());
  localCache[storeName] = { data, timestamp: Date.now() };
  return data;
}

async function getById(storeName, id) {
  const cached = localCache[storeName];
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    const item = cached.data.find(d => d.id === id);
    if (item) return item;
  }
  const snap = await getDoc(tenantDoc(storeName, id));
  return snap.exists() ? snap.data() : undefined;
}

async function add(storeName, data) {
  const cRef = counterDoc(storeName);
  const id = await runTransaction(firestore, async (tx) => {
    const counterSnap = await tx.get(cRef);
    const next = (counterSnap.exists() ? counterSnap.data().value : 0) + 1;
    tx.set(cRef, { value: next });
    return next;
  });
  data.id = id;
  await setDoc(tenantDoc(storeName, id), data);
  invalidateCache(storeName);
  return id;
}

async function update(storeName, data) {
  if (!data.id && data.id !== 0) throw new Error('Data must have an id field');
  await setDoc(tenantDoc(storeName, data.id), data);
  invalidateCache(storeName);
  return data.id;
}

async function remove(storeName, id) {
  await deleteDoc(tenantDoc(storeName, id));
  invalidateCache(storeName);
}

async function getByIndex(storeName, indexName, value) {
  const q = query(tenantCollection(storeName), where(indexName, '==', value));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

async function getRecent(storeName, limitCount = 50) {
  const q = query(tenantCollection(storeName), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

async function getFiltered(storeName, { where: whereClauses, orderBy: orderClause, limit: limitCount }) {
  let q = tenantCollection(storeName);
  if (whereClauses) {
    if (Array.isArray(whereClauses[0])) {
      whereClauses.forEach(cw => q = query(q, where(cw[0], cw[1], cw[2])));
    } else {
      q = query(q, where(whereClauses[0], whereClauses[1], whereClauses[2]));
    }
  }
  if (orderClause) q = query(q, orderBy(orderClause[0], orderClause[1]));
  if (limitCount) q = query(q, limit(limitCount));
  
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}

async function clearStore(storeName) {
  const snap = await getDocs(tenantCollection(storeName));
  if (snap.docs.length === 0) return;
  const batch = writeBatch(firestore);
  snap.docs.forEach(d => batch.delete(d.ref));
  await batch.commit();
  invalidateCache(storeName);
}

// ---- Order Number Generator ----
async function getNextOrderNumber() {
  const cRef = counterDoc('orderNumber');
  return await runTransaction(firestore, async (tx) => {
    const snap = await tx.get(cRef);
    const value = (snap.exists() ? snap.data().value : 0) + 1;
    tx.set(cRef, { value });
    const today = new Date();
    const prefix = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}`;
    return `ORD-${prefix}-${String(value).padStart(4, '0')}`;
  });
}

// ---- No-op openDB (backward compatibility) ----
async function openDB() { return true; }

// ---- Seed Demo Data (runs once per account if empty) ----
async function seedDemoData() {
  const items = await getAll('items');
  if (items.length > 0) return;

  // Seed waiters
  const suppliers = [
    { name: 'Default Supplier', contact: '9876543210', incentiveEnabled: true, active: true, createdAt: new Date().toISOString() },
    { name: 'Fresh Foods Co.', contact: '9876543211', incentiveEnabled: true, active: true, createdAt: new Date().toISOString() },
    { name: 'Daily Mart', contact: '9876543212', incentiveEnabled: false, active: true, createdAt: new Date().toISOString() },
  ];
  for (const s of suppliers) await add('suppliers', s);

  // Seed tables
  const tables = [
    { name: 'Table 1', active: true },
    { name: 'Table 2', active: true },
    { name: 'Table 3', active: true },
    { name: 'Table 4', active: true },
    { name: 'Table 5', active: true },
    { name: 'Parcel', active: true },
    { name: 'Takeaway', active: true },
  ];
  for (const t of tables) await add('tables', t);

  // Seed menu items
  const menuItems = [
    { name: 'Chicken 65', category: 'Starters', sellingPrice: 220, incentivePercent: 5, active: true, createdAt: new Date().toISOString() },
    { name: 'Paneer Tikka', category: 'Starters', sellingPrice: 200, incentivePercent: 5, active: true, createdAt: new Date().toISOString() },
    { name: 'Gobi Manchurian', category: 'Starters', sellingPrice: 160, incentivePercent: 3, active: true, createdAt: new Date().toISOString() },
    { name: 'Chicken Biryani', category: 'Main Course', sellingPrice: 280, incentivePercent: 5, active: true, createdAt: new Date().toISOString() },
    { name: 'Mutton Biryani', category: 'Main Course', sellingPrice: 350, incentivePercent: 5, active: true, createdAt: new Date().toISOString() },
    { name: 'Veg Biryani', category: 'Main Course', sellingPrice: 180, incentivePercent: 3, active: true, createdAt: new Date().toISOString() },
    { name: 'Butter Naan', category: 'Breads', sellingPrice: 45, incentivePercent: 2, active: true, createdAt: new Date().toISOString() },
    { name: 'Garlic Naan', category: 'Breads', sellingPrice: 55, incentivePercent: 2, active: true, createdAt: new Date().toISOString() },
    { name: 'Tandoori Roti', category: 'Breads', sellingPrice: 30, incentivePercent: 2, active: true, createdAt: new Date().toISOString() },
    { name: 'Dal Tadka', category: 'Main Course', sellingPrice: 150, incentivePercent: 3, active: true, createdAt: new Date().toISOString() },
    { name: 'Palak Paneer', category: 'Main Course', sellingPrice: 190, incentivePercent: 4, active: true, createdAt: new Date().toISOString() },
    { name: 'Chicken Curry', category: 'Main Course', sellingPrice: 240, incentivePercent: 5, active: true, createdAt: new Date().toISOString() },
    { name: 'Fish Fry', category: 'Starters', sellingPrice: 260, incentivePercent: 5, active: true, createdAt: new Date().toISOString() },
    { name: 'Masala Dosa', category: 'South Indian', sellingPrice: 90, incentivePercent: 3, active: true, createdAt: new Date().toISOString() },
    { name: 'Idli Sambar', category: 'South Indian', sellingPrice: 60, incentivePercent: 2, active: true, createdAt: new Date().toISOString() },
    { name: 'Lime Soda', category: 'Beverages', sellingPrice: 40, incentivePercent: 2, active: true, createdAt: new Date().toISOString() },
    { name: 'Lassi', category: 'Beverages', sellingPrice: 50, incentivePercent: 2, active: true, createdAt: new Date().toISOString() },
    { name: 'Gulab Jamun', category: 'Desserts', sellingPrice: 60, incentivePercent: 2, active: true, createdAt: new Date().toISOString() },
  ];
  for (const item of menuItems) await add('items', item);

  // Seed ingredients
  const ingredients = [
    { name: 'Chicken', unit: 'g', currentStock: 5000, active: true },
    { name: 'Mutton', unit: 'g', currentStock: 3000, active: true },
    { name: 'Paneer', unit: 'g', currentStock: 2000, active: true },
    { name: 'Rice', unit: 'g', currentStock: 10000, active: true },
    { name: 'Salt', unit: 'g', currentStock: 5000, active: true },
    { name: 'Chilli Powder', unit: 'g', currentStock: 1000, active: true },
    { name: 'Oil', unit: 'ml', currentStock: 5000, active: true },
    { name: 'Flour', unit: 'g', currentStock: 5000, active: true },
    { name: 'Cauliflower', unit: 'g', currentStock: 2000, active: true },
    { name: 'Onion', unit: 'g', currentStock: 3000, active: true },
    { name: 'Tomato', unit: 'g', currentStock: 2000, active: true },
    { name: 'Garlic', unit: 'g', currentStock: 500, active: true },
    { name: 'Fish', unit: 'g', currentStock: 2000, active: true },
    { name: 'Butter', unit: 'g', currentStock: 1000, active: true },
    { name: 'Milk', unit: 'ml', currentStock: 3000, active: true },
    { name: 'Sugar', unit: 'g', currentStock: 2000, active: true },
    { name: 'Lemon', unit: 'qty', currentStock: 50, active: true },
    { name: 'Curd', unit: 'ml', currentStock: 2000, active: true },
    { name: 'Dal', unit: 'g', currentStock: 3000, active: true },
    { name: 'Spinach', unit: 'g', currentStock: 1000, active: true },
  ];
  for (const ing of ingredients) await add('ingredients', ing);

  // Seed recipes
  const recipes = [
    { itemId: 1, ingredientId: 1, quantity: 100 },
    { itemId: 1, ingredientId: 5, quantity: 5 },
    { itemId: 1, ingredientId: 6, quantity: 10 },
    { itemId: 1, ingredientId: 7, quantity: 50 },
    { itemId: 4, ingredientId: 1, quantity: 200 },
    { itemId: 4, ingredientId: 4, quantity: 150 },
    { itemId: 4, ingredientId: 10, quantity: 50 },
    { itemId: 4, ingredientId: 7, quantity: 30 },
    { itemId: 5, ingredientId: 2, quantity: 200 },
    { itemId: 5, ingredientId: 4, quantity: 150 },
    { itemId: 5, ingredientId: 10, quantity: 50 },
    { itemId: 2, ingredientId: 3, quantity: 150 },
    { itemId: 2, ingredientId: 7, quantity: 20 },
    { itemId: 7, ingredientId: 8, quantity: 80 },
    { itemId: 7, ingredientId: 14, quantity: 10 },
  ];
  for (const r of recipes) await add('itemIngredients', r);

  // Seed grocery suppliers
  const grocerySuppliers = [
    { name: 'Metro Wholesale', contact: '9876500001', address: 'Market Road, Chennai', gstNumber: '33AABCU9603R1ZM', active: true, createdAt: new Date().toISOString() },
    { name: 'Reliance Fresh', contact: '9876500002', address: 'Anna Nagar, Chennai', gstNumber: '', active: true, createdAt: new Date().toISOString() },
    { name: 'Local Vegetables', contact: '9876500003', address: 'Vegetable Market', gstNumber: '', active: true, createdAt: new Date().toISOString() },
  ];
  for (const gs of grocerySuppliers) await add('grocerySuppliers', gs);

  // Seed sample expenses
  const sampleExpenses = [
    { category: 'Grocery', description: 'Monthly milk supply advance', amount: 2500, date: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString() },
    { category: 'Maintenance', description: 'AC Repairing charges', amount: 1200, date: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString() },
    { category: 'Salary', description: 'Part-time cleaning staff', amount: 3000, date: new Date().toISOString().split('T')[0], createdAt: new Date().toISOString() },
  ];
  for (const exp of sampleExpenses) await add('expenses', exp);
}

// ---- Export ----
export const DB = {
  openDB,
  setAccountId,
  getAccountId,
  getAll,
  getById,
  add,
  update,
  remove,
  getByIndex,
  getRecent,
  getFiltered,
  clearStore,
  getNextOrderNumber,
  seedDemoData,
  getWalletSummary: async () => {
    const snap = await getDoc(tenantDoc('walletSummary', 'latest'));
    if (snap.exists()) return snap.data();
    return { totalIncome: 0, totalOutflow: 0, currentBalance: 0 };
  },
  recalculateWalletTotals: async () => {
    console.log('Recalculating wallet totals from history...');
    const transactions = await DB.getAll('walletTransactions');
    const account = await DB.getById('accounts', _accountId); // This is special, accounts is parent
    const openingBalance = Number(account?.walletBalance || 0);

    const totals = transactions.reduce((acc, t) => {
      if (t.type === 'income') {
        acc.totalIncome += Number(t.amount || 0);
      } else if (t.type === 'adjustment-surplus') {
        acc.totalIncome -= Number(t.amount || 0);
        acc.totalOutflow += Number(t.amount || 0);
      } else {
        acc.totalOutflow += Number(t.amount || 0);
      }
      return acc;
    }, { totalIncome: 0, totalOutflow: 0 });

    const summary = {
      totalIncome: totals.totalIncome,
      totalOutflow: totals.totalOutflow,
      currentBalance: openingBalance + totals.totalIncome - totals.totalOutflow,
      updatedAt: new Date().toISOString()
    };

    await setDoc(tenantDoc('walletSummary', 'latest'), summary);
    return summary;
  },
  recordWalletTransaction: async (type, amount, description, sourceId = null) => {
    const accId = _accountId;
    if (!accId) throw new Error('Account not set');

    const numAmount = Number(amount);
    const now = new Date();
    const transactionRecord = {
      type,
      amount: numAmount,
      description,
      sourceId: String(sourceId),
      date: now.toISOString().split('T')[0],
      createdAt: now.toISOString()
    };

    const summaryRef = tenantDoc('walletSummary', 'latest');

    return await runTransaction(firestore, async (transaction) => {
      const summarySnap = await transaction.get(summaryRef);
      let summary = summarySnap.exists() ? summarySnap.data() : { totalIncome: 0, totalOutflow: 0, currentBalance: 0 };
      
      // If balance existed in account doc but not summary yet, we should have synced it.
      // For safety, we treat summary as the only source now.

      if (type === 'income') {
        summary.totalIncome += numAmount;
        summary.currentBalance += numAmount;
      } else if (type === 'adjustment-surplus') {
        // Rule: deduct Total Income and add Total Outflow (Balance reduces by 2x)
        summary.totalIncome -= numAmount;
        summary.totalOutflow += numAmount;
        summary.currentBalance -= (2 * numAmount);
      } else {
        summary.totalOutflow += numAmount;
        summary.currentBalance -= numAmount;
      }
      summary.updatedAt = now.toISOString();

      // 1. Get next ID for transaction
      const cRef = counterDoc('walletTransactions');
      const counterSnap = await transaction.get(cRef);
      const nextId = (counterSnap.exists() ? counterSnap.data().value : 0) + 1;
      transaction.set(cRef, { value: nextId });

      // 2. Set transaction
      const txRef = tenantDoc('walletTransactions', nextId);
      transaction.set(txRef, { ...transactionRecord, id: nextId });

      // 3. Update summary
      transaction.set(summaryRef, summary);

      return nextId;
    });
  }
};
