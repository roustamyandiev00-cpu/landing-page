import { NextRequest, NextResponse } from "next/server"
import { generateOfferteWithAI } from "@/lib/gemini"
import { 
  validateRequest, 
  GenerateOfferteRequestSchema,
  checkRateLimit,
  checkCORS,
  createErrorResponse,
  createSuccessResponse,
  type GenerateOfferteResponse
} from "@/lib/api-validation"
import { handleApiError } from "@/lib/error-handler"

export async function POST(request: NextRequest) {
  try {
    // Check CORS
    if (!checkCORS(request)) {
      return createErrorResponse('Forbidden', 403)
    }
    
    // Rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(ip, 5, 60000)) { // 5 requests per minute
      return createErrorResponse('Te veel verzoeken. Probeer het over een minuut opnieuw.', 429)
    }
    
    // Parse and validate request body
    const body = await request.json()
    const validation = validateRequest(GenerateOfferteRequestSchema, body)
    
    if (!validation.success) {
      return createErrorResponse(validation.error, 400)
    }
    
    const { 
      projectDescription, 
      projectType,
      clientName, 
      dimensions,
      imageAnalyses,
      existingSuggestions 
    } = validation.data

    // Generate offerte with AI
    const offerte = await generateOfferteWithAI(
      projectDescription, 
      clientName,
      {
        projectType,
        dimensions,
        imageAnalyses,
        existingSuggestions
      }
    )
    
    return createSuccessResponse<GenerateOfferteResponse>(offerte)
    
  } catch (error: unknown) {
    handleApiError(error, 'generate-offerte')
    
    // Don't expose internal errors to client
    return createErrorResponse(
      'Er ging iets mis bij het genereren van de offerte. Probeer het opnieuw.',
      500
    )
  }
}
