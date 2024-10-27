// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqy3jn4aN59lBswP3UBKBB6nOFQRXJiI4",
  authDomain: "randomapp-522bb.firebaseapp.com",
  projectId: "randomapp-522bb",
  storageBucket: "randomapp-522bb.appspot.com",
  messagingSenderId: "598723642960",
  appId: "1:598723642960:web:91a5f62301b7985f6d7355",
  measurementId: "G-H3N43ZJZTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Add this to test initialization
console.log('Firebase initialized with config:', firebaseConfig);