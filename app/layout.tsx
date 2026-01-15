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
  title: "ARCHON.AI - Slimme Bouwsoftware",
  description: "AI-aangedreven software voor bouwprofessionals. Maak professionele offertes in 2 minuten met onze slimme AI.",
  generator: 'v0.app',
  manifest: "/manifest.json",
  verification: {
    google: "zH4_RdoOEc1w3ilvs7OJJWgYq5ZlajSfwKJj1_oGCg8",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ARCHON.AI - Slimme Bouwsoftware",
    description: "AI-aangedreven software voor bouwprofessionals. Maak professionele offertes in 2 minuten.",
    url: "https://archonpro.com",
    siteName: "ARCHON.AI",
    images: [
      {
        url: "/dashboard-preview.png",
        width: 1200,
        height: 630,
        alt: "ARCHON.AI Dashboard",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCHON.AI - Slimme Bouwsoftware",
    description: "AI-aangedreven software voor bouwprofessionals. Maak professionele offertes in 2 minuten.",
    images: ["/dashboard-preview.png"],
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