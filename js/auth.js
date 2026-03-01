// ===== Authentication Module =====
import { firestore } from './firebase.js';
import {
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
    signOut, onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const auth = getAuth();

let currentUser = null;
let currentAccount = null;

// ---- Login ----
async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(firestore, 'users', cred.user.uid));
    if (!userDoc.exists()) throw new Error('User profile not found. Please register first.');
    currentUser = { uid: cred.user.uid, ...userDoc.data() };

    const accountDoc = await getDoc(doc(firestore, 'accounts', currentUser.accountId));
    if (!accountDoc.exists()) throw new Error('Account not found.');
    currentAccount = { id: currentUser.accountId, ...accountDoc.data() };

    return currentUser;
}

// ---- Register as Admin (Create new restaurant) ----
async function registerAdmin(name, email, password, restaurantName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const accountId = cred.user.uid; // Use UID as account ID

    // Create account document
    await setDoc(doc(firestore, 'accounts', accountId), {
        name: restaurantName,
        ownerId: cred.user.uid,
        createdAt: new Date().toISOString(),
    });

    // Create user profile
    await setDoc(doc(firestore, 'users', cred.user.uid), {
        name,
        email,
        role: 'admin',
        accountId,
        active: true,
        createdAt: new Date().toISOString(),
    });

    currentUser = { uid: cred.user.uid, name, email, role: 'admin', accountId, active: true };
    currentAccount = { id: accountId, name: restaurantName };
    return currentUser;
}

// ---- Register as Salesman (Join existing restaurant) ----
async function registerSalesman(name, email, password, joinCode) {
    // Verify the join code (account ID)
    const accountDoc = await getDoc(doc(firestore, 'accounts', joinCode));
    if (!accountDoc.exists()) throw new Error('Invalid restaurant join code. Please check with your admin.');

    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(firestore, 'users', cred.user.uid), {
        name,
        email,
        role: 'salesman',
        accountId: joinCode,
        active: true,
        createdAt: new Date().toISOString(),
    });

    currentUser = { uid: cred.user.uid, name, email, role: 'salesman', accountId: joinCode, active: true };
    currentAccount = { id: joinCode, ...accountDoc.data() };
    return currentUser;
}

// ---- Logout ----
async function logout() {
    await signOut(auth);
    currentUser = null;
    currentAccount = null;
}

// ---- Getters ----
function getCurrentUser() { return currentUser; }
function getCurrentAccount() { return currentAccount; }
function getAccountId() { return currentAccount?.id || null; }
function getUserRole() { return currentUser?.role || null; }
function isAdmin() { return currentUser?.role === 'admin'; }

// ---- Auth State Listener ----
function onAuthChange(callback) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            try {
                const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    currentUser = { uid: firebaseUser.uid, ...userDoc.data() };
                    const accountDoc = await getDoc(doc(firestore, 'accounts', currentUser.accountId));
                    if (accountDoc.exists()) {
                        currentAccount = { id: currentUser.accountId, ...accountDoc.data() };
                    }
                } else {
                    // Firebase auth user exists but no profile — sign out
                    currentUser = null;
                    currentAccount = null;
                }
            } catch (err) {
                console.error('Error loading user profile:', err);
                currentUser = null;
                currentAccount = null;
            }
        } else {
            currentUser = null;
            currentAccount = null;
        }
        callback(currentUser);
    });
}

export const Auth = {
    login,
    registerAdmin,
    registerSalesman,
    logout,
    getCurrentUser,
    getCurrentAccount,
    getAccountId,
    getUserRole,
    isAdmin,
    onAuthChange,
};
