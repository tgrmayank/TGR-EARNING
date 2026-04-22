import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdlTiZZ99Mdra5BVJg_Uhlno1cLMaf7xc",
  authDomain: "tgrpay-98bf4.firebaseapp.com",
  projectId: "tgrpay-98bf4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
};;ctId: "tgrpay-98bf4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();

export {
  RecaptchaVerifier, signInWithPhoneNumber,
  signInWithPopup, PhoneAuthProvider,
  signInWithCredential, onAuthStateChanged, signOut,
  doc, setDoc, getDoc, updateDoc, arrayUnion
};