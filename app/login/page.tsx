"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { signInWithGoogle, signInWithApple, signInWithEmail } from "@/lib/firebase"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isAppleLoading, setIsAppleLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError(null)
    
    const { user, error } = await signInWithEmail(formData.email, formData.password)
    setIsLoading(false)
    
    if (error) {
      setAuthError(error)
      return
    }
    
    if (user) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="w-full max-w-sm mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>

          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">B</span>
              </div>
              <span className="font-serif text-2xl font-semibold text-foreground">Buildr</span>
            </Link>
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Welkom terug</h1>
            <p className="text-muted-foreground">Log in om door te gaan naar je dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                placeholder="naam@bedrijf.nl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 bg-background border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Wachtwoord</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Wachtwoord vergeten?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 bg-background border-border pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Onthoud mij voor 30 dagen
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Bezig met inloggen...
                </>
              ) : (
                "Inloggen"
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">of ga verder met</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </>
              )}
            </Button>
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
          </div>

          {authError && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
              {authError}
            </div>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Nog geen account?{" "}
            <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Maak gratis een account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern-green-dark.jpg')] opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <blockquote className="space-y-6">
            <p className="text-2xl xl:text-3xl font-serif text-primary-foreground leading-relaxed">
              "Buildr heeft onze offertetijd met 80% verminderd. Wat voorheen uren duurde, is nu in minuten klaar."
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-lg">JV</span>
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Jan van der Berg</p>
                <p className="text-primary-foreground/70 text-sm">CEO, Van der Berg Bouw B.V.</p>
              </div>
            </footer>
          </blockquote>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-serif font-bold text-primary-foreground">10k+</p>
              <p className="text-primary-foreground/70 text-sm mt-1">Actieve gebruikers</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold text-primary-foreground">500k+</p>
              <p className="text-primary-foreground/70 text-sm mt-1">Offertes gemaakt</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold text-primary-foreground">4.9/5</p>
              <p className="text-primary-foreground/70 text-sm mt-1">Gemiddelde score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
