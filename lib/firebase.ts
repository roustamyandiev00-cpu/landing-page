import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"

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
