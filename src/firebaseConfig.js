// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAVoGsqF_S4vvdE9oA_29zjwjK22Hu6Xw",
  authDomain: "linkedin-clone-4ce54.firebaseapp.com",
  projectId: "linkedin-clone-4ce54",
  storageBucket: "linkedin-clone-4ce54.appspot.com",
  messagingSenderId: "241963847700",
  appId: "1:241963847700:web:7d6be333622d102ea1d701",
  measurementId: "G-0L1PZNPPEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, firestore, storage };

const analytics = getAnalytics(app);