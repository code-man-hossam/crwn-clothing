import { initializeApp } from "firebase/app"
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDBlyLLf2WI6VRsErprCcTYD29u1vLex7w",
   authDomain: "crwn-clothing-db-6e75b.firebaseapp.com",
   projectId: "crwn-clothing-db-6e75b",
   storageBucket: "crwn-clothing-db-6e75b.appspot.com",
   messagingSenderId: "40661928172",
   appId: "1:40661928172:web:3920027eae6167384b7dc9",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
   prompt: "select_account",
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db, "users", userAuth.uid)
   console.log(userDocRef)

   const userSnapshot = await getDoc(userDocRef)
   console.log(userSnapshot)
   console.log(userSnapshot.exists())

   if(!userSnapshot.exists()){
      const {displayName, email} = userAuth
      const createdAt = new Date()

      try {
         await setDoc(userDocRef, {displayName, email, createdAt})
      } catch (error) {
         console.log('error creating the user', error.messgae);
      }
   }

   return userDocRef
}
