"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Eye, EyeOff, Loader2, Check, Clock, Sparkles } from "lucide-react"
import { signInWithGoogle, signInWithApple } from "@/lib/firebase"

const aiMessages = [
  "Hoi! 👋 Ik ben Nova, je AI assistent.",
  "Ik help je met het maken van professionele offertes in slechts 60 seconden!",
  "Maak een account aan en ontdek hoe makkelijk het kan zijn.",
]

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isAppleLoading, setIsAppleLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    acceptTerms: false,
  })

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setAuthError(null)
    const { user, error } = await signInWithGoogle()
    setIsGoogleLoading(false)
    
    if (error) {
      setAuthError(error)
      return
    }
    
    if (user) {
      router.push("/dashboard")
    }
  }

  const handleAppleSignIn = async () => {
    setIsAppleLoading(true)
    setAuthError(null)
    const { user, error } = await signInWithApple()
    setIsAppleLoading(false)
    
    if (error) {
      setAuthError(error)
      return
    }
    
    if (user) {
      router.push("/dashboard")
    }
  }

  // Typing effect for AI messages
  useEffect(() => {
    const message = aiMessages[currentMessageIndex]
    let index = 0
    setIsTyping(true)
    setDisplayedText("")

    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
        
        // Move to next message after delay
        setTimeout(() => {
          if (currentMessageIndex < aiMessages.length - 1) {
            setCurrentMessageIndex(prev => prev + 1)
          }
        }, 2000)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentMessageIndex])

  const passwordRequirements = [
    { label: "Minimaal 8 karakters", met: formData.password.length >= 8 },
    { label: "Minimaal 1 hoofdletter", met: /[A-Z]/.test(formData.password) },
    { label: "Minimaal 1 cijfer", met: /[0-9]/.test(formData.password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - AI Avatar */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center px-12 xl:px-16 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-md text-center">
          {/* AI Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block mb-6"
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-1">
              <div className="w-full h-full rounded-full bg-card overflow-hidden border-4 border-primary/30 shadow-xl">
                <Image
                  src="/ai-avatar.png"
                  alt="Nova - AI Assistent"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient avatar
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {/* Fallback avatar */}
                <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>
            </div>
            
            {/* Online indicator */}
            <motion.div
              className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-card px-2 py-1 rounded-full shadow-lg border border-border"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs font-medium text-foreground">Online</span>
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Clock className="w-4 h-4" />
            14 dagen gratis
          </motion.div>

          {/* AI Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-serif text-3xl xl:text-4xl font-semibold text-foreground leading-tight mb-4">
              Maak je <span className="text-primary">offertes</span> in 60 seconden met Nova!
            </h2>
            
            {/* Chat bubble */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground mb-1">Nova</p>
                  <p className="text-muted-foreground">
                    {displayedText}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-card border border-border rounded-xl p-4 inline-flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Bespaar gemiddeld</p>
              <p className="text-lg font-bold text-foreground">1 uur per offerte</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 bg-card lg:bg-background">
        <div className="w-full max-w-sm mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Account aanmaken</h1>
            <p className="text-muted-foreground">Start je gratis proefperiode</p>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button 
              variant="outline" 
              className="h-12 border-border hover:bg-secondary bg-transparent"
              onClick={handleAppleSignIn}
              disabled={isAppleLoading || isGoogleLoading}
            >
              {isAppleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Apple
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="h-12 border-border hover:bg-secondary bg-transparent"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isAppleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </>
              )}
            </Button>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
              {authError}
            </div>
          )}

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card lg:bg-background text-muted-foreground">of</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="naam@bedrijf.nl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 bg-muted/50 border-0"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base"
              disabled={isLoading || !formData.email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Account aanmaken...
                </>
              ) : (
                "Maak mijn account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Heb je al een account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Inloggen
            </Link>
          </p>

          {/* Try without registration */}
          <div className="mt-4 text-center">
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground" asChild>
              <Link href="/dashboard">
                <Sparkles className="w-4 h-4 mr-2" />
                Probeer zonder registratie
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Door te registreren ga je akkoord met onze{" "}
            <Link href="#" className="text-primary hover:underline">Voorwaarden</Link>
            {" "}en{" "}
            <Link href="#" className="text-primary hover:underline">Privacybeleid</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
