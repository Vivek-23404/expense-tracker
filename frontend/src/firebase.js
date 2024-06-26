// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "expense-tracker-67986.firebaseapp.com",
  projectId: "expense-tracker-67986",
  storageBucket: "expense-tracker-67986.appspot.com",
  messagingSenderId: "634851354916",
  appId: "1:634851354916:web:d6421d723fd4c26a146bb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app