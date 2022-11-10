import { initializeApp } from "firebase/app"
import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
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

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
   prompt: "select_account",
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
   userAuth,
   additionalInformation = {}
) => {
   if (!userAuth) return

   const userDocRef = doc(db, "users", userAuth.uid)

   const userSnapshot = await getDoc(userDocRef)

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth
      const createdAt = new Date()

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
         })
      } catch (error) {
         console.log("error creating the user", error.messgae)
      }
   }

   return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return

   return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return

   return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>
   onAuthStateChanged(auth, callback)
