import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getAuth,
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
// GoogleAuthProvider,  // Authenticate Using Google

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA105LGZyOWNDvQ8glVWgPL7JXBqjkqzzM",
  authDomain: "crwn-clothing-db-8d2b9.firebaseapp.com",
  projectId: "crwn-clothing-db-8d2b9",
  storageBucket: "crwn-clothing-db-8d2b9.firebasestorage.app",
  messagingSenderId: "201706020226",
  appId: "1:201706020226:web:da2b2f16721594403ac39b",
  measurementId: "G-JCS56SW7G3"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
    // 'login_hint': 'user@example.com'  // from documentation
  });
  // when someone interacts with provider, we want to force select account

  // Authentification methods
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  // DB Storage methods
  export const db = getFirestore(); 
  
  export const createUserDocumentFromAuth = async (userAuth) => {
    // see if exists the wanted doc reference
 
    const userDocRef = doc(db, 'users', userAuth.uid);  // use unique identifier (uid)
     console.log('userDocRef', userDocRef);
    // now get the doc data . it will be a user snapshoot. 
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists()); // That will verify if the auth user data exists already in d (true or false

  // check if user data exists
  // if exists then just return back reference
  // if user data do not exists, I want to create setDock with data in collection.
  
  if(!userSnapshot.exists()){
    const {  displayName, email} = userAuth;
    const createdAt = new Date();
    try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
    } catch (error){
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;

  }