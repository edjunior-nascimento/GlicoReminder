// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeIcC9B16g5QZ6T2E_KWKC0JqdjTHAMoc",
    authDomain: "glicoreminder.firebaseapp.com",
    projectId: "glicoreminder",
    storageBucket: "glicoreminder.firebasestorage.app",
    messagingSenderId: "140034428242",
    appId: "1:140034428242:web:b7e9905c5b7db682827e8b",
    measurementId: "G-H5TPJ6G79R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);