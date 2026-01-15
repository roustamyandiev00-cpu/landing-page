import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, deleteDoc, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

// Initialize Firebase only if config is available
const app = getApps().length === 0 && firebaseConfig.apiKey 
  ? initializeApp(firebaseConfig) 
  : getApps()[0]
const auth = app ? getAuth(app) : null
const db = app ? getFirestore(app) : null

// Providers
const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider("apple.com")

// Configure Apple provider
appleProvider.addScope("email")
appleProvider.addScope("name")

// Sign in with Google
export const signInWithGoogle = async () => {
  if (!auth) {
    return { user: null, error: "Firebase not configured" }
  }
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return { user: result.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign in with Apple
export const signInWithApple = async () => {
  if (!auth) {
    return { user: null, error: "Firebase not configured" }
  }
  try {
    const result = await signInWithPopup(auth, appleProvider)
    return { user: result.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign out
export const signOut = async () => {
  if (!auth) {
    return { error: "Firebase not configured" }
  }
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export { auth, onAuthStateChanged, type User }

// Email/Password Sign Up
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  if (!auth || !db) {
    return { user: null, error: "Firebase not configured" }
  }
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      createdAt: serverTimestamp(),
      plan: "trial",
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    })
    
    return { user: result.user, error: null }
  } catch (error: any) {
    let errorMessage = error.message
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Dit e-mailadres is al in gebruik"
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Wachtwoord moet minimaal 6 karakters zijn"
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Ongeldig e-mailadres"
    }
    return { user: null, error: errorMessage }
  }
}

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string) => {
  if (!auth) {
    return { user: null, error: "Firebase not configured" }
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return { user: result.user, error: null }
  } catch (error: any) {
    let errorMessage = error.message
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      errorMessage = "Onjuist e-mailadres of wachtwoord"
    } else if (error.code === "auth/invalid-credential") {
      errorMessage = "Onjuist e-mailadres of wachtwoord"
    }
    return { user: null, error: errorMessage }
  }
}

// Password Reset
export const resetPassword = async (email: string) => {
  if (!auth) {
    return { error: "Firebase not configured" }
  }
  try {
    await sendPasswordResetEmail(auth, email)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Firestore helpers
export { db }

// Generic CRUD operations
export const createDocument = async (collectionName: string, data: any, userId: string) => {
  if (!db) return { id: null, error: "Database not configured" }
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return { id: docRef.id, error: null }
  } catch (error: any) {
    return { id: null, error: error.message }
  }
}

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  if (!db) return { error: "Database not configured" }
  try {
    await updateDoc(doc(db, collectionName, docId), {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const deleteDocument = async (collectionName: string, docId: string) => {
  if (!db) return { error: "Database not configured" }
  try {
    await deleteDoc(doc(db, collectionName, docId))
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getDocuments = async (collectionName: string, userId: string) => {
  if (!db) return { data: [], error: "Database not configured" }
  try {
    const q = query(
      collection(db, collectionName),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    )
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return { data, error: null }
  } catch (error: any) {
    return { data: [], error: error.message }
  }
}
