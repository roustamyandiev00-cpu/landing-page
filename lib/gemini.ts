import { GoogleGenerativeAI } from "@google/generative-ai"
import { env } from "./env"

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

interface OfferteContext {
  projectType?: string
  dimensions?: {
    length: number
    width: number
    height?: number
    area?: number
  }
  imageAnalyses?: Array<{
    analysis: string
    suggestions: string[]
  }>
  existingSuggestions?: string[]
}

export async function generateOfferteWithAI(
  projectDescription: string, 
  clientName: string,
  context?: OfferteContext
) {
  let dimensionsText = ""
  if (context?.dimensions?.area && context.dimensions.area > 0) {
    dimensionsText = `\nAfmetingen: ${context.dimensions.length}m x ${context.dimensions.width}m = ${context.dimensions.area}m²`
    if (context.dimensions.height) {
      dimensionsText += ` (hoogte: ${context.dimensions.height}m)`
    }
  }

  let imageAnalysisText = ""
  if (context?.imageAnalyses && context.imageAnalyses.length > 0) {
    imageAnalysisText = "\n\nFoto analyse resultaten:\n"
    context.imageAnalyses.forEach((analysis, index) => {
      imageAnalysisText += `Foto ${index + 1}: ${analysis.analysis}\n`
      if (analysis.suggestions.length > 0) {
        imageAnalysisText += `Suggesties: ${analysis.suggestions.join(', ')}\n`
      }
    })
  }

  let suggestionsText = ""
  if (context?.existingSuggestions && context.existingSuggestions.length > 0) {
    suggestionsText = `\n\nAI Suggesties om te overwegen: ${context.existingSuggestions.join(', ')}`
  }

  const prompt = `Je bent een Nederlandse zakelijke assistent. Genereer een professionele offerte op basis van deze projectbeschrijving.

Projectbeschrijving: ${projectDescription}
Project type: ${context?.projectType || 'Algemeen'}
Klant: ${clientName}${dimensionsText}${imageAnalysisText}${suggestionsText}

Gebruik de afmetingen en foto-analyses om nauwkeurigere hoeveelheden en prijzen te berekenen.
Neem de AI suggesties mee in je overwegingen voor extra werkzaamheden.

Geef een JSON response met deze structuur (alleen JSON, geen andere tekst):
{
  "description": "korte projectomschrijving",
  "items": [
    {
      "description": "omschrijving van werkzaamheid",
      "quantity": aantal (gebruik afmetingen waar mogelijk),
      "unit": "uur" of "stuk" of "dag" of "m2" of "m",
      "price": prijs in euros per eenheid (nummer),
      "btw": 21
    }
  ],
  "notes": "eventuele opmerkingen of voorwaarden",
  "validDays": "30",
  "additionalSuggestions": ["extra suggestie 1", "extra suggestie 2"]
}

Maak realistische prijzen voor Nederlandse markt. Splits het project op in logische onderdelen.
Als er afmetingen zijn, gebruik deze voor nauwkeurige berekeningen (bijv. m² voor vloeren, schilderwerk).
Voeg extra suggesties toe voor werkzaamheden die mogelijk over het hoofd gezien worden.`

  try {
    const result = await geminiModel.generateContent(prompt)
    const response = result.response.text()
    
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error("No valid JSON in response")
  } catch (error) {
    console.error("Gemini error:", error)
    throw error
  }
}

export async function chatWithAI(message: string, context?: string) {
  const systemPrompt = `Je bent een behulpzame Nederlandse zakelijke AI-assistent voor een facturatie en boekhouding app genaamd Archon. 
Je helpt gebruikers met:
- Vragen over facturatie en offertes
- Boekhouding en BTW
- Klantenbeheer
- Algemene zakelijke vragen

Antwoord altijd in het Nederlands, kort en bondig.
${context ? `Context: ${context}` : ""}`

  try {
    const result = await geminiModel.generateContent(`${systemPrompt}\n\nGebruiker: ${message}`)
    return result.response.text()
  } catch (error) {
    console.error("Gemini chat error:", error)
    throw error
  }
}