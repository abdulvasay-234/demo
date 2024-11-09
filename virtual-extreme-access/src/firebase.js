// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWNzTQCRP9cQmq3khm5IA1P-3dO8h_pfw",
  authDomain: "virtual-extreme-access.firebaseapp.com",
  projectId: "virtual-extreme-access",
  storageBucket: "virtual-extreme-access.firebasestorage.app",
  messagingSenderId: "184009237547",
  appId: "1:184009237547:web:6bf3a21c791b3e6ded366e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



export { db, auth };
