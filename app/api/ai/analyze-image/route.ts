import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '@/lib/env'
import { 
  validateRequest, 
  AnalyzeImageRequestSchema,
  checkRateLimit,
  checkCORS,
  createErrorResponse,
  createSuccessResponse
} from "@/lib/api-validation"
import { handleApiError } from "@/lib/error-handler"

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Check CORS
    if (!checkCORS(request)) {
      return createErrorResponse('Forbidden', 403)
    }
    
    // Rate limiting (very restrictive for image analysis)
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip, 3, 60000)) { // 3 requests per minute
      return createErrorResponse('Te veel afbeeldingen geanalyseerd. Probeer het over een minuut opnieuw.', 429)
    }
    
    const formData = await request.formData()
    const image = formData.get('image') as File
    const projectType = formData.get('projectType') as string

    if (!image) {
      return createErrorResponse('Geen afbeelding geüpload', 400)
    }

    // Validate file size (max 10MB)
    if (image.size > 10 * 1024 * 1024) {
      return createErrorResponse('Afbeelding te groot. Maximum 10MB toegestaan.', 400)
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return createErrorResponse('Alleen afbeeldingen zijn toegestaan', 400)
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
Analyseer deze foto voor een bouwproject offerte. 

Project type: ${projectType || 'Algemeen bouwproject'}

Geef een korte analyse van wat je ziet en geef praktische suggesties voor werkzaamheden die mogelijk nodig zijn maar niet meteen duidelijk zijn.

Antwoord in het Nederlands in JSON format:
{
  "analysis": "Korte beschrijving van wat je ziet in de foto",
  "suggestions": ["suggestie 1", "suggestie 2", "suggestie 3"]
}

Focus op:
- Huidige staat/conditie
- Mogelijke verborgen werkzaamheden
- Materialen die nodig kunnen zijn
- Voorbereidende werkzaamheden
- Afwerking details

Houd suggesties praktisch en relevant voor een offerte.
`

    // Add timeout for AI request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

    try {
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64,
            mimeType: image.type,
          },
        },
      ])

      clearTimeout(timeoutId)
      const response = await result.response
      const text = response.text()

      try {
        // Try to parse JSON response
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const analysisData = JSON.parse(jsonMatch[0])
          return createSuccessResponse(analysisData)
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError)
      }

      // Fallback if JSON parsing fails
      return createSuccessResponse({
        analysis: text.substring(0, 200) + '...',
        suggestions: ['Controleer onderliggende constructie', 'Overweeg isolatie verbetering', 'Plan afwerking details']
      })

    } catch (aiError) {
      clearTimeout(timeoutId)
      if (aiError instanceof Error && aiError.name === 'AbortError') {
        return createErrorResponse('Analyse duurde te lang. Probeer een kleinere afbeelding.', 504)
      }
      throw aiError
    }

  } catch (error: unknown) {
    handleApiError(error, 'analyze-image')
    
    return createErrorResponse(
      'Er ging iets mis bij het analyseren van de afbeelding. Probeer het opnieuw.',
      500
    )
  }
}