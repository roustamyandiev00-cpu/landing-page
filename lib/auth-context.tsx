"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { auth, onAuthStateChanged, type User } from "./firebase"
import { getUserProfile, createUserProfile, type UserProfile } from "./firestore"

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    if (user) {
      try {
        const userProfile = await getUserProfile(user.uid)
        setProfile(userProfile)
      } catch (error) {
        console.error("Error refreshing profile:", error)
      }
    }
  }

  useEffect(() => {
    if (!auth) {
      setTimeout(() => setLoading(false), 0)
      return
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        try {
          // Check if profile exists, if not create one
          let userProfile = await getUserProfile(user.uid)
          
          if (!userProfile) {
            // Create new profile for first-time users
            userProfile = await createUserProfile(user.uid, {
              email: user.email || "",
              displayName: user.displayName || "",
              photoURL: user.photoURL || undefined,
            })
          }
          
          setProfile(userProfile)
        } catch (error) {
          console.error("Error loading profile:", error)
        }
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
