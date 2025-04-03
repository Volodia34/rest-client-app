import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import ENV from '../../.env.js';

const firebaseConfig = {
  apiKey: ENV.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: ENV.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: ENV.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: ENV.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
