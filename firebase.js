// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: "ai-flashcards-3ebf7.firebaseapp.com",
  projectId: "ai-flashcards-3ebf7",
  storageBucket: "ai-flashcards-3ebf7.appspot.com",
  messagingSenderId: "941829688346",
  appId: "1:941829688346:web:880e1ecc7f65cbc8d315a3",
  measurementId: "G-SN1JX60EC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;