import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { StructuredData } from "@/components/structured-data"
import { GoogleAnalytics } from "@/components/google-analytics"
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/google-tag-manager"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://archonpro.com'),
  title: {
    default: "ARCHON.AI - Slimme Bouwsoftware & Offerte Tool voor Aannemers",
    template: "%s | ARCHON.AI"
  },
  description: "De #1 AI-bouwsoftware voor aannemers en ZZP'ers in België en Nederland. Maak professionele offertes en calculaties in 2 minuten. Bespaar tijd, voorkom fouten en win meer opdrachten.",
  generator: 'v0.app',
  manifest: "/manifest.json",
  keywords: [
    "bouwsoftware",
    "offerte tool bouw",
    "calculatiesoftware aannemer",
    "AI in de bouw",
    "zzp bouw administratie",
    "bestek software",
    "facturatie bouw",
    "bouw app",
    "calculatieprogramma bouw",
    "offerte maken zzp",
    "bouwbedrijf software",
    "Vlaanderen",
    "Nederland",
    "bouwmanagement",
    "archon ai"
  ],
  authors: [{ name: "ARCHON.AI Team" }],
  creator: "ARCHON.AI",
  publisher: "ARCHON.AI",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "zH4_RdoOEc1w3ilvs7OJJWgYq5ZlajSfwKJj1_oGCg8",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ARCHON.AI - Slimme Bouwsoftware & Offerte Tool",
    description: "Maak professionele bouwoffertes in een handomdraai met AI. De ideale software voor aannemers, klusbedrijven en ZZP'ers.",
    url: "https://archonpro.com",
    siteName: "ARCHON.AI",
    images: [
      {
        url: "/dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "ARCHON.AI Dashboard - Slimme Bouwsoftware",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCHON.AI - Slimme Bouwsoftware",
    description: "De #1 AI-bouwsoftware voor aannemers. Maak offertes in minuten.",
    images: ["/dashboard-preview.png"],
    creator: "@archon_ai",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ARCHON.AI",
  },
}

export const viewport: Viewport = {
  themeColor: "#09090b",
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
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}