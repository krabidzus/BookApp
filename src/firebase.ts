import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';

// Check if Firebase configuration environment variables are set
if (
  !process.env.REACT_APP_FIREBASE_API_KEY ||
  !process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
  !process.env.REACT_APP_FIREBASE_DATABASE_URL ||
  !process.env.REACT_APP_FIREBASE_PROJECT_ID ||
  !process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
  !process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
  !process.env.REACT_APP_FIREBASE_APP_ID
) {
  throw new Error('Firebase configuration is incomplete.');
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
