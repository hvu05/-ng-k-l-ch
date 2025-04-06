// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBao_O7-OxGK15v_FD1SO93QqENgjexaYU",
  authDomain: "dbsched-7990b.firebaseapp.com",
  projectId: "dbsched-7990b",
  storageBucket: "dbsched-7990b.firebasestorage.app",
  messagingSenderId: "1037335277018",
  appId: "1:1037335277018:web:ed929ffb0877aed2e964e3",
  measurementId: "G-85PZF9TYNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export {database}