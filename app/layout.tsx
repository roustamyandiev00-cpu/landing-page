import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { AiProvider } from "@/lib/ai-context"
import { StructuredData } from "@/components/structured-data"
import { GoogleAnalytics } from "@/components/google-analytics"
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/google-tag-manager"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.archonpro.com'),
  title: {
    default: "ARCHON.AI - Bouwsoftware met AI | Offertes in 2 Min | Gratis Proberen",
    template: "%s | ARCHON.AI - Slimme Bouwsoftware"
  },
  description: "⚡ Maak offertes in 2 minuten met AI. #1 bouwsoftware voor aannemers in NL & BE. Herken risico's, optimaliseer prijzen. Probeer gratis!",
  generator: 'Next.js',
  applicationName: 'ARCHON.AI',
  manifest: "/manifest.json",
  keywords: [
    // Primaire keywords (hoge search volume)
    "bouwsoftware",
    "bouwsoftware Nederland",
    "offerte software",
    "calculatiesoftware",
    // Long-tail keywords (makkelijker te ranken)
    "offerte maken bouw",
    "offerte tool aannemer",
    "calculatiesoftware aannemer",
    "bouw calculatie software",
    "offerte programma zzp",
    "bouwbedrijf software",
    // Specifieke functionaliteiten
    "AI in de bouw",
    "automatische offertes",
    "risico analyse bouw",
    "prijsoptimalisatie bouw",
    "bestek software",
    "facturatie bouw",
    "bouw app",
    // Doelgroep specifiek
    "software voor aannemers",
    "zzp bouw administratie",
    "bouwmanagement software",
    "bouwsoftware zzp",
    // Locatie targeting
    "bouwsoftware België",
    "bouwsoftware Vlaanderen",
    "aannemer software Nederland",
    // Merk
    "archon ai",
    "archonpro"
  ],
  authors: [{ name: "ARCHON.AI Team", url: "https://www.archonpro.com" }],
  creator: "ARCHON.AI",
  publisher: "ARCHON.AI",
  alternates: {
    canonical: "https://www.archonpro.com",
    languages: {
      'nl-NL': 'https://www.archonpro.com',
      'nl-BE': 'https://www.archonpro.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "zH4_RdoOEc1w3ilvs7OJJWgYq5ZlajSfwKJj1_oGCg8",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "ARCHON.AI - AI Bouwsoftware | Offertes in 2 Minuten",
    description: "⚡ De slimste bouwsoftware van Nederland & Vlaanderen. Maak perfecte offertes in 2 minuten met AI. Probeer gratis!",
    url: "https://www.archonpro.com",
    siteName: "ARCHON.AI - Slimme Bouwsoftware",
    images: [
      {
        url: "https://www.archonpro.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ARCHON.AI - AI Bouwsoftware Dashboard",
        type: "image/png",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@archon_ai",
    creator: "@archon_ai",
    title: "ARCHON.AI - AI Bouwsoftware | Offertes in 2 Min ⚡",
    description: "#1 AI-bouwsoftware voor aannemers. Maak offertes in minuten, herken risico's automatisch. Probeer gratis! 🚀",
    images: ["https://www.archonpro.com/twitter-card.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ARCHON.AI",
  },
  category: 'Business Software',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className="dark">
      <head>
        <StructuredData />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtm_id={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </head>
      <body className="font-sans antialiased">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManagerNoScript gtm_id={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <AuthProvider>
          <AiProvider>
            {children}
          </AiProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
