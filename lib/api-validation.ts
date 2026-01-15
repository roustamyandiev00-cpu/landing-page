import { z } from "zod"
import { NextRequest, NextResponse } from "next/server"

/**
 * API validation schemas and utilities
 */

// Common schemas
export const ProjectDimensionsSchema = z.object({
  length: z.number().min(0).max(1000),
  width: z.number().min(0).max(1000),
  height: z.number().min(0).max(100).optional(),
  area: z.number().min(0).max(10000).optional(),
})

export const ImageAnalysisSchema = z.object({
  analysis: z.string().min(1).max(5000),
  suggestions: z.array(z.string().min(1).max(500)).max(10),
})

// API request schemas
export const GenerateOfferteRequestSchema = z.object({
  projectDescription: z.string().min(10).max(5000),
  clientName: z.string().min(2).max(100),
  projectType: z.string().min(1).max(100).optional(),
  dimensions: ProjectDimensionsSchema.optional(),
  imageAnalyses: z.array(ImageAnalysisSchema).max(5).optional(),
  existingSuggestions: z.array(z.string().min(1).max(500)).max(20).optional(),
})

export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  context: z.string().max(10000).optional(),
})

export const AnalyzeImageRequestSchema = z.object({
  imageData: z.string().min(1), // Base64 encoded image
  projectType: z.string().min(1).max(100).optional(),
})

// API response types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  status: number
}

export interface GenerateOfferteResponse {
  description: string
  items: Array<{
    description: string
    quantity: number
    unit: string
    price: number
    btw: number
  }>
  notes: string
  validDays: string
  additionalSuggestions: string[]
}

// Validation helper
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ')
      return { success: false, error: `Validation error: ${errorMessage}` }
    }
    return { success: false, error: 'Invalid request data' }
  }
}

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// CORS helper
export function checkCORS(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  
  // Allow same-origin requests
  if (!origin) return true
  
  // Allow localhost in development
  if (process.env.NODE_ENV === 'development') {
    return origin.includes('localhost') || origin.includes('127.0.0.1')
  }
  
  // In production, check against allowed origins
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    'https://archon-landing.vercel.app',
    // Add your production domains here
  ].filter(Boolean)
  
  return allowedOrigins.includes(origin)
}

// Create standardized error responses
export function createErrorResponse(message: string, status: number = 400): NextResponse {
  return NextResponse.json({ error: message }, { status })
}

export function createSuccessResponse<T>(data: T): NextResponse {
  return NextResponse.json({ data })
}