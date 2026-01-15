import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const projectType = formData.get('projectType') as string

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
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

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: image.type,
        },
      },
    ])

    const response = await result.response
    const text = response.text()

    try {
      // Try to parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const analysisData = JSON.parse(jsonMatch[0])
        return NextResponse.json(analysisData)
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
    }

    // Fallback if JSON parsing fails
    return NextResponse.json({
      analysis: text.substring(0, 200) + '...',
      suggestions: ['Controleer onderliggende constructie', 'Overweeg isolatie verbetering', 'Plan afwerking details']
    })

  } catch (error) {
    console.error('Error analyzing image:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    )
  }
}