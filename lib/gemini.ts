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

  const prompt = `Je bent een ervaren Nederlandse bouwprofessional met 15+ jaar ervaring in het maken van offertes.
Je maakt realistische, professionele offertes die klanten vertrouwen en accepteren.

=== PROJECT INFORMATIE ===
Type: ${context?.projectType || 'Algemeen bouwproject'}
Klant: ${clientName}
Beschrijving: ${projectDescription}${dimensionsText}${imageAnalysisText}${suggestionsText}

=== JOUW EXPERTISE ===
- Je kent de Nederlandse marktprijzen 2024/2025
- Je denkt aan voorbereidend werk (sloop, afvoer, voorbereiden)
- Je denkt aan afwerking (stucwerk, schilderwerk, opruimen)
- Je splitst materiaal en arbeid waar relevant
- Je geeft realistische tijdsinschattingen
- Je denkt aan vergunningen en compliance waar nodig

=== INSTRUCTIES ===
1. ANALYSEER het project grondig:
   - Wat is de scope? (klein/middel/groot)
   - Welke vakmannen zijn nodig? (timmerman, loodgieter, elektricien, etc.)
   - Wat is de volgorde van werkzaamheden?
   - Zijn er risico's of complicaties?

2. BEREKEN nauwkeurig:
   - Gebruik de afmetingen voor exacte hoeveelheden
   - Denk aan materiaalverspilling (10-15% extra)
   - Reken met realistische uurlonen (€45-75/uur)
   - Gebruik correcte BTW tarieven (9% renovatie, 21% nieuwbouw/materiaal)

3. STRUCTUREER logisch:
   - Start met voorbereidend werk
   - Daarna hoofdwerkzaamheden
   - Eindig met afwerking
   - Voeg voorrijkosten toe indien relevant

4. WEES COMPLEET:
   - Vergeet geen kleine items (plinten, afwerking, opruimen)
   - Denk aan elektra/loodgieter werk indien nodig
   - Voeg afvoer bouwafval toe bij sloop
   - Denk aan vergunningen bij grote projecten

=== VOORBEELDEN GOEDE ITEMS ===
Badkamer renovatie:
- "Oude badkamer slopen en afvoeren" (forfait)
- "Wandtegels plaatsen inclusief voegen" (per m²)
- "Loodgieterswerk: leidingen aanleggen" (forfait)
- "Elektrische vloerverwarming installeren" (per m²)

Keuken plaatsen:
- "Oude keuken demonteren" (forfait)
- "Keuken montage" (per meter)
- "Werkblad op maat maken en plaatsen" (per meter)
- "Elektra aanpassingen" (forfait)

=== OUTPUT FORMAT ===
Geef ALLEEN een JSON response (geen andere tekst):
{
  "description": "Korte samenvatting van het project (1 zin)",
  "items": [
    {
      "description": "Duidelijke omschrijving van werkzaamheid",
      "quantity": aantal (gebruik afmetingen!),
      "unit": "uur" | "stuk" | "dag" | "m2" | "m" | "forfait",
      "price": prijs per eenheid (realistisch!),
      "btw": 9 | 21
    }
  ],
  "notes": "Professionele opmerkingen: wat is inbegrepen, wat niet, voorwaarden, geschatte doorlooptijd",
  "validDays": "30",
  "additionalSuggestions": ["Optionele extra's die klant zou kunnen overwegen"]
}

=== PRIJSRICHTLIJNEN 2024/2025 ===
Arbeid:
- Vakman uurloon: €45-75/uur
- Voorrijkosten: €35-50
- Sloopwerk: €10-20/m²

Badkamer:
- Tegels plaatsen wand: €50-75/m²
- Tegels plaatsen vloer: €55-85/m²
- Douche installeren: €350-650
- Toilet plaatsen: €200-400
- Wastafel plaatsen: €150-350

Keuken:
- Keuken montage: €150-300/m
- Werkblad plaatsen: €80-200/m
- Spoelbak installeren: €150-300
- Apparatuur plaatsen: €75-175/stuk

Schilderwerk:
- Muren schilderen: €12-25/m²
- Plafond schilderen: €14-28/m²
- Kozijnen schilderen: €45-120/stuk

Vloeren:
- Laminaat leggen: €18-35/m²
- PVC leggen: €20-40/m²
- Tegels leggen: €45-85/m²
- Vloer egaliseren: €12-25/m²

Maak nu een professionele, realistische offerte!`

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