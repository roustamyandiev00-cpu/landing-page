import { NextRequest, NextResponse } from "next/server"
import { chatWithAI } from "@/lib/gemini"
import { 
  validateRequest, 
  ChatRequestSchema,
  checkRateLimit,
  checkCORS,
  createErrorResponse,
  createSuccessResponse
} from "@/lib/api-validation"
import { handleApiError } from "@/lib/error-handler"

export async function POST(request: NextRequest) {
  try {
    // Check CORS
    if (!checkCORS(request)) {
      return createErrorResponse('Forbidden', 403)
    }
    
    // Rate limiting (more restrictive for chat)
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip, 10, 60000)) { // 10 requests per minute
      return createErrorResponse('Te veel berichten. Probeer het over een minuut opnieuw.', 429)
    }
    
    // Parse and validate request body
    const body = await request.json()
    const validation = validateRequest(ChatRequestSchema, body)
    
    if (!validation.success) {
      return createErrorResponse(validation.error, 400)
    }
    
    const { message, context } = validation.data

    const response = await chatWithAI(message, context)
    
    return createSuccessResponse({ response })
    
  } catch (error: unknown) {
    handleApiError(error, 'ai-chat')
    
    return createErrorResponse(
      'Er ging iets mis bij het verwerken van je vraag. Probeer het opnieuw.',
      500
    )
  }
}
