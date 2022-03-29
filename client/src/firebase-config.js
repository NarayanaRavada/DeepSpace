import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOzFk7vhSbJ4f7TxvtSTxMUZ8HfFDRQaI",
  authDomain: "gcwebathon.firebaseapp.com",
  projectId: "gcwebathon",
  storageBucket: "gs://gcwebathon.appspot.com/",
  messagingSenderId: "698463007856",
  appId: "1:698463007856:web:2fa0a75996d886585c70b5",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export { db, storage, auth };
