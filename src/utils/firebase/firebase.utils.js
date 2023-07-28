import {initializeApp} from 'firebase/app'
import { getAuth,
         signInWithRedirect,
         signInWithPopup,
         GoogleAuthProvider
    } from 'firebase/auth'

import { getFirestore,
         doc,
         getDoc,
        setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyADgFHviOAzB2VttpynfaB6y4MMYNtidw8",
  authDomain: "crwn-clothing-db-1b545.firebaseapp.com",
  projectId: "crwn-clothing-db-1b545",
  storageBucket: "crwn-clothing-db-1b545.appspot.com",
  messagingSenderId: "399437218244",
  appId: "1:399437218244:web:7f330603c8c5f474712491"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db,'users', userAuth.uid)
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef
}