
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.PLASMO_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.PLASMO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.PLASMO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.PLASMO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.PLASMO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.PLASMO_PUBLIC_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;