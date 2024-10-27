import { db, auth } from './firebaseConfig.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Test function to verify Firestore connection
export const testFirestoreConnection = async () => {
  try {
    const testDoc = await addDoc(collection(db, 'test'), {
      timestamp: new Date(),
      test: true
    });
    console.log('Test document written with ID: ', testDoc.id);
    return true;
  } catch (error) {
    console.error('Error testing Firestore connection:', error);
    return false;
  }
};

// Options Collection Operations
export const saveOptions = async (options) => {
  try {
    console.log('Saving options to Firestore:', options);
    const docRef = await addDoc(collection(db, 'optionSets'), {
      options: options,
      createdAt: new Date(),
      userId: auth.currentUser?.uid || 'anonymous'
    });
    console.log('Options saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving options: ", error);
    throw error;
  }
};

export const getOptions = async (userId) => {
  try {
    const q = query(
      collection(db, 'optionSets'),
      where('userId', '==', userId || 'anonymous'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting options: ", error);
    throw error;
  }
};

export const saveHistory = async (historyItem) => {
  try {
    const docRef = await addDoc(collection(db, 'history'), {
      ...historyItem,
      createdAt: new Date(),
      userId: auth.currentUser?.uid || 'anonymous'
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving history: ", error);
    throw error;
  }
};

export const getHistory = async (userId) => {
  try {
    const q = query(
      collection(db, 'history'),
      where('userId', '==', userId || 'anonymous'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting history: ", error);
    throw error;
  }
};