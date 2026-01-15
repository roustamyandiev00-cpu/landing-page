import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ARCHON.AI - Slimme Bouwsoftware",
  description: "AI-aangedreven software voor bouwprofessionals. Maak professionele offertes in 2 minuten met onze slimme AI.",
  generator: 'v0.app',
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ARCHON.AI - Slimme Bouwsoftware",
    description: "AI-aangedreven software voor bouwprofessionals. Maak professionele offertes in 2 minuten.",
    url: "https://archon.ai",
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
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}