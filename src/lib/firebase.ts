import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOmf_nBi6pBWympvNG5ognlp3eNQdSLuQ",
  authDomain: "amplelearning-8b7a0.firebaseapp.com",
  projectId: "amplelearning-8b7a0",
  storageBucket: "amplelearning-8b7a0.firebasestorage.app",
  messagingSenderId: "293237489514",
  appId: "1:293237489514:web:defeedc5bb9c0f56e46f13"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
