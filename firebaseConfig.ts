import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLa83PPZTdyXRrXL3M2vLNIrxAnq1dneo",
  authDomain: "test-app-4eb34.firebaseapp.com",
  projectId: "test-app-4eb34",
  storageBucket: "test-app-4eb34.appspot.com",
  messagingSenderId: "57887142721",
  appId: "1:57887142721:web:0e1926e9a861f9e62ea7c0",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// onAuthStateChanged(FIREBASE_AUTH, (user) => {
//   if (user) {
//   } else {
//   }
// });
