// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBgwiVWylWV7fBaAQuXt-LaAzKUNoq_eI8",
  authDomain: "meetu-4db8d.firebaseapp.com",
  projectId: "meetu-4db8d",
  storageBucket: "meetu-4db8d.appspot.com",
  messagingSenderId: "727948666484",
  appId: "1:727948666484:web:f87f3dddfceec060b21321"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const database = getDatabase(app);