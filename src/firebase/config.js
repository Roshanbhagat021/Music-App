// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4oAjKUnAPT0i-h3PodUXfURe5EluRKGo",
  authDomain: "music-app-021.firebaseapp.com",
  projectId: "music-app-021",
  storageBucket: "music-app-021.appspot.com",
  messagingSenderId: "782164688681",
  appId: "1:782164688681:web:65f9a893b17c1149d50138"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);