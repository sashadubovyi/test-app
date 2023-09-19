import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
onAuthStateChanged(FIREBASE_AUTH, async (user) => {
  if (user) {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.error("Помилка збереження даних користувача:", error);
    }
  } else {
    try {
      await AsyncStorage.removeItem("userData");
    } catch (error) {
      console.error("Помилка видалення даних користувача:", error);
    }
  }
});
