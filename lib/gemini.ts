import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "")

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function generateOfferteWithAI(projectDescription: string, clientName: string) {
  const prompt = `Je bent een Nederlandse zakelijke assistent. Genereer een professionele offerte op basis van deze projectbeschrijving.

Projectbeschrijving: ${projectDescription}
Klant: ${clientName}

Geef een JSON response met deze structuur (alleen JSON, geen andere tekst):
{
  "description": "korte projectomschrijving",
  "items": [
    {
      "description": "omschrijving van werkzaamheid",
      "quantity": 1,
      "unit": "uur" of "stuk" of "dag",
      "price": prijs in euros (nummer),
      "btw": 21
    }
  ],
  "notes": "eventuele opmerkingen of voorwaarden",
  "validDays": "30"
}

Maak realistische prijzen voor Nederlandse markt. Splits het project op in logische onderdelen.`

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
