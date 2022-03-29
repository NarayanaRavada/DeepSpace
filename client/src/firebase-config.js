// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOzFk7vhSbJ4f7TxvtSTxMUZ8HfFDRQaI",
  authDomain: "gcwebathon.firebaseapp.com",
  projectId: "gcwebathon",
  storageBucket: "gs://gcwebathon.appspot.com/",
  messagingSenderId: "698463007856",
  appId: "1:698463007856:web:2fa0a75996d886585c70b5"
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
