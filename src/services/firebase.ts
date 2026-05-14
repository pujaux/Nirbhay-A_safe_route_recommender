import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9q9bMlbKxusHRgjpnwS-IwYv5n6DMULI",
  authDomain: "nirbhay-app-2ac36.firebaseapp.com",
  projectId: "nirbhay-app-2ac36",
  storageBucket: "nirbhay-app-2ac36.firebasestorage.app",
  messagingSenderId: "395362349104",
  appId: "1:395362349104:web:e8ed796f5376b2927f3df5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
