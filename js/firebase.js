// ===== Firebase Configuration & Initialization =====
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD93Wq4iwQkUsw1JA_ej8ThQu4J_Lmy4-E",
    authDomain: "kitchen-kot.firebaseapp.com",
    projectId: "kitchen-kot",
    storageBucket: "kitchen-kot.firebasestorage.app",
    messagingSenderId: "191789378070",
    appId: "1:191789378070:web:e77adb2cda31f91b84a337",
    measurementId: "G-V7DBSNZ5L9"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
