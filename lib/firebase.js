import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDHvNN_gf8QOe7THtE7bK7Ipm0z8vk2P4k',
  authDomain: 'ctc1sm-mvp-firebase.firebaseapp.com',
  projectId: 'ctc1sm-mvp-firebase',
  storageBucket: 'ctc1sm-mvp-firebase.firebasestorage.app',
  messagingSenderId: '136914534599',
  appId: '1:136914534599:web:191c0375686f22ea333ee2',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
