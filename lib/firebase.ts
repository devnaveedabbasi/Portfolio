import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAdpkJHQYDtSeEFJUi8QyrtryzG3YuoBxk",
  authDomain: "newproject-ef868.firebaseapp.com",
  databaseURL: "https://newproject-ef868-default-rtdb.firebaseio.com",
  projectId: "newproject-ef868",
  storageBucket: "newproject-ef868.appspot.com",
  messagingSenderId: "937810815574",
  appId: "1:937810815574:web:32f61ec23c85a5372fa9f7",
  measurementId: "G-06K1LRJHY2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
