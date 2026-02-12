// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAljQowTFB-BUyqayChcVumYEUkw1V0tJI",
    authDomain: "landing-agus.firebaseapp.com",
    projectId: "landing-agus",
    storageBucket: "landing-agus.firebasestorage.app",
    messagingSenderId: "350454223044",
    appId: "1:350454223044:web:7b09c4e5a509406065f991",
    measurementId: "G-SEMT757EBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);