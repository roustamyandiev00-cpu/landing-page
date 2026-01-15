/**
 * Environment variable validation
 * Ensures all required environment variables are set at startup
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'GOOGLE_GEMINI_API_KEY',
] as const

const optionalEnvVars = [
  'EDGE_CONFIG',
  'NEXT_PUBLIC_APP_URL',
] as const

export function validateEnvironment() {
  const missing: string[] = []
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}\n\n` +
      `Please check your .env.local file and ensure all required variables are set.\n` +
      `See .env.local.example for reference.`
    )
  }
}

export const env = {
  // Firebase
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  
  // AI
  GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY!,
  
  // Optional
  EDGE_CONFIG: process.env.EDGE_CONFIG,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const

// Validate on import (only in Node.js environment)
if (typeof window === 'undefined') {
  validateEnvironment()
}