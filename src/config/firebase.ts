import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBV39Rq1tyIooxwjSpAp7DsiTLuV0mlhK4",
  authDomain: "zetax-83aa5.firebaseapp.com",
  projectId: "zetax-83aa5",
  storageBucket: "zetax-83aa5.firebasestorage.app",
  messagingSenderId: "713709422398",
  appId: "1:713709422398:web:bc219e7b0ee4a3a0da0e6f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };