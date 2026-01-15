import { NextRequest, NextResponse } from "next/server"
import { werkzaamheden, Werkzaamheid } from "@/lib/werkzaamheden-data"

interface GeneratedItem {
  werkzaamheidId?: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
  btw: number
}

interface GenerateOfferteRequest {
  prompt: string
  clientName: string
  useAI?: boolean
}

// Intelligente matching van werkzaamheden op basis van prompt
function matchWerkzaamheden(prompt: string): GeneratedItem[] {
  const lowerPrompt = prompt.toLowerCase()
  const items: GeneratedItem[] = []
  const matchedIds = new Set<string>()

  // Keywords mapping naar werkzaamheden
  const keywordMappings: { keywords: string[]; werkzaamheidIds: string[] }[] = [
    // Badkamer
    { 
      keywords: ["badkamer", "bathroom"], 
      werkzaamheidIds: ["bad-sloop", "bad-tegels-wand", "bad-tegels-vloer", "bad-douche-installatie", "bad-toilet-installatie", "bad-wastafel-installatie"] 
    },
    { keywords: ["douche", "shower"], werkzaamheidIds: ["bad-douche-installatie"] },
    { keywords: ["toilet", "wc"], werkzaamheidIds: ["bad-toilet-installatie"] },
    { keywords: ["wastafel", "lavabo"], werkzaamheidIds: ["bad-wastafel-installatie"] },
    { keywords: ["ligbad", "badkuip", "bad "], werkzaamheidIds: ["bad-badkuip-installatie"] },
    
    // Keuken
    { 
      keywords: ["keuken", "kitchen"], 
      werkzaamheidIds: ["keuken-plaatsen", "keuken-werkblad", "keuken-spoelbak", "keuken-tegels"] 
    },
    { keywords: ["werkblad", "aanrecht"], werkzaamheidIds: ["keuken-werkblad"] },
    { keywords: ["spoelbak"], werkzaamheidIds: ["keuken-spoelbak"] },
    { keywords: ["inbouwapparaat", "vaatwasser", "oven", "koelkast"], werkzaamheidIds: ["keuken-apparatuur"] },
    
    // Schilderwerk
    { 
      keywords: ["schilder", "verf", "verven", "paint"], 
      werkzaamheidIds: ["schilder-muur", "schilder-plafond"] 
    },
    { keywords: ["kozijn", "kozijnen"], werkzaamheidIds: ["schilder-kozijn"] },
    { keywords: ["deur schilder", "deuren schilder"], werkzaamheidIds: ["schilder-deur"] },
    { keywords: ["buitenschilder", "buiten schilder"], werkzaamheidIds: ["schilder-buiten"] },
    { keywords: ["behang"], werkzaamheidIds: ["behangen"] },
    
    // Vloeren
    { keywords: ["laminaat"], werkzaamheidIds: ["vloer-laminaat"] },
    { keywords: ["pvc", "vinyl"], werkzaamheidIds: ["vloer-pvc"] },
    { keywords: ["parket", "houten vloer"], werkzaamheidIds: ["vloer-parket"] },
    { keywords: ["vloertegel", "tegelvloer"], werkzaamheidIds: ["vloer-tegels"] },
    { keywords: ["egaliseren", "uitvlakken"], werkzaamheidIds: ["vloer-egaliseren"] },
    { keywords: ["vloer verwijder", "oude vloer"], werkzaamheidIds: ["vloer-verwijderen"] },
    
    // Elektra
    { keywords: ["stopcontact"], werkzaamheidIds: ["elektra-stopcontact"] },
    { keywords: ["schakelaar", "lichtschakelaar"], werkzaamheidIds: ["elektra-schakelaar"] },
    { keywords: ["lamp", "verlichting", "armatuur"], werkzaamheidIds: ["elektra-lamp"] },
    { keywords: ["groepenkast", "meterkast"], werkzaamheidIds: ["elektra-groepenkast"] },
    { keywords: ["elektra", "elektrisch", "bedrading"], werkzaamheidIds: ["elektra-stopcontact", "elektra-schakelaar"] },
    
    // Loodgieter
    { keywords: ["kraan"], werkzaamheidIds: ["lood-kraan"] },
    { keywords: ["radiator", "verwarming"], werkzaamheidIds: ["lood-radiator"] },
    { keywords: ["waterleiding", "leiding"], werkzaamheidIds: ["lood-leiding"] },
    { keywords: ["afvoer", "riool"], werkzaamheidIds: ["lood-afvoer"] },
    { keywords: ["cv-ketel", "cv ketel", "ketel"], werkzaamheidIds: ["lood-cv-ketel"] },
    
    // Dakwerk
    { keywords: ["dakpan", "dak"], werkzaamheidIds: ["dak-pannen"] },
    { keywords: ["dakisolatie"], werkzaamheidIds: ["dak-isolatie"] },
    { keywords: ["dakgoot", "goot"], werkzaamheidIds: ["dak-goot"] },
    { keywords: ["bitumen", "plat dak"], werkzaamheidIds: ["dak-bitumen"] },
    
    // Timmerwerk
    { keywords: ["binnendeur", "deur plaatsen"], werkzaamheidIds: ["timmer-deur"] },
    { keywords: ["kozijn plaatsen", "nieuw kozijn"], werkzaamheidIds: ["timmer-kozijn"] },
    { keywords: ["plint"], werkzaamheidIds: ["timmer-plint"] },
    { keywords: ["trap"], werkzaamheidIds: ["timmer-trap"] },
    
    // Stucwerk
    { keywords: ["stuc", "stukadoor", "glad"], werkzaamheidIds: ["stuc-wand", "stuc-plafond"] },
    { keywords: ["sierpleister", "spachtel"], werkzaamheidIds: ["stuc-sierpleister"] },
    
    // Isolatie
    { keywords: ["spouwmuur", "muurisolatie"], werkzaamheidIds: ["iso-spouw"] },
    { keywords: ["vloerisolatie", "kruipruimte"], werkzaamheidIds: ["iso-vloer"] },
    { keywords: ["hr++", "dubbel glas", "isolatieglas"], werkzaamheidIds: ["iso-hr-glas"] },
    
    // Tuin
    { keywords: ["terras", "terrastegel"], werkzaamheidIds: ["tuin-tegels"] },
    { keywords: ["klinker", "oprit", "bestrating"], werkzaamheidIds: ["tuin-klinkers"] },
    { keywords: ["schutting", "hek"], werkzaamheidIds: ["tuin-schutting"] },
  ]

  // Match keywords
  for (const mapping of keywordMappings) {
    for (const keyword of mapping.keywords) {
      if (lowerPrompt.includes(keyword)) {
        for (const werkzaamheidId of mapping.werkzaamheidIds) {
          if (!matchedIds.has(werkzaamheidId)) {
            matchedIds.add(werkzaamheidId)
          }
        }
      }
    }
  }

  // Extract quantities from prompt
  const m2Match = lowerPrompt.match(/(\d+)\s*m[²2]/i)
  const mMatch = lowerPrompt.match(/(\d+)\s*(?:meter|m\b)/i)
  const stuks = lowerPrompt.match(/(\d+)\s*(?:stuk|stuks)/i)
  
  const defaultM2 = m2Match ? parseInt(m2Match[1]) : 10
  const defaultM = mMatch ? parseInt(mMatch[1]) : 5
  const defaultStuks = stuks ? parseInt(stuks[1]) : 1

  // Convert matched werkzaamheden to items
  for (const werkzaamheidId of matchedIds) {
    const werk = werkzaamheden.find(w => w.id === werkzaamheidId)
    if (werk) {
      let quantity = 1
      switch (werk.eenheid) {
        case "m2":
          quantity = defaultM2
          break
        case "m":
          quantity = defaultM
          break
        case "stuk":
          quantity = defaultStuks
          break
        case "uur":
          quantity = 4 // Default 4 uur
          break
        case "dag":
          quantity = 1
          break
        case "forfait":
          quantity = 1
          break
      }

      items.push({
        werkzaamheidId: werk.id,
        description: werk.naam,
        quantity,
        unit: werk.eenheid,
        unitPrice: werk.standaardPrijs,
        total: quantity * werk.standaardPrijs,
        btw: werk.btwTarief,
      })
    }
  }

  // Als geen items gevonden, voeg generieke items toe
  if (items.length === 0) {
    items.push({
      description: "Werkzaamheden volgens beschrijving",
      quantity: 8,
      unit: "uur",
      unitPrice: 55,
      total: 440,
      btw: 21,
    })
    items.push({
      description: "Materiaalkosten",
      quantity: 1,
      unit: "forfait",
      unitPrice: 250,
      total: 250,
      btw: 21,
    })
  }

  return items
}

// OpenAI integratie voor slimmere generatie
async function generateWithOpenAI(prompt: string, clientName: string): Promise<GeneratedItem[]> {
  const openaiKey = process.env.OPENAI_API_KEY
  
  if (!openaiKey) {
    // Fallback naar keyword matching als geen API key
    return matchWerkzaamheden(prompt)
  }

  try {
    const systemPrompt = `Je bent een AI assistent voor een Nederlandse bouwbedrijf. Je helpt met het maken van offertes.
    
Analyseer de projectbeschrijving en genereer een lijst van werkzaamheden met realistische prijzen voor de Nederlandse markt.

Geef je antwoord als JSON array met objecten die deze velden hebben:
- description: omschrijving van de werkzaamheid
- quantity: aantal (getal)
- unit: eenheid (m2, m, stuk, uur, dag, of forfait)
- unitPrice: prijs per eenheid in euro (getal)
- btw: BTW percentage (9 voor arbeid aan woningen ouder dan 2 jaar, 21 voor overig)

Houd rekening met:
- Realistische Nederlandse marktprijzen 2024/2025
- Arbeid aan woningen ouder dan 2 jaar: 9% BTW
- Materialen en nieuwbouw: 21% BTW
- Splits arbeid en materiaal waar relevant
- Voeg voorrijkosten toe indien nodig

Geef ALLEEN de JSON array terug, geen andere tekst.`

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Klant: ${clientName}\n\nProjectbeschrijving:\n${prompt}` }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      console.error("OpenAI API error:", response.status)
      return matchWerkzaamheden(prompt)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return matchWerkzaamheden(prompt)
    }

    // Parse JSON response
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      return matchWerkzaamheden(prompt)
    }

    const parsedItems = JSON.parse(jsonMatch[0])
    
    return parsedItems.map((item: any) => ({
      description: item.description || "Werkzaamheid",
      quantity: Number(item.quantity) || 1,
      unit: item.unit || "stuk",
      unitPrice: Number(item.unitPrice) || 0,
      total: (Number(item.quantity) || 1) * (Number(item.unitPrice) || 0),
      btw: Number(item.btw) || 21,
    }))

  } catch (error) {
    console.error("OpenAI generation error:", error)
    return matchWerkzaamheden(prompt)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateOfferteRequest = await request.json()
    const { prompt, clientName, useAI = true } = body

    if (!prompt || !clientName) {
      return NextResponse.json(
        { error: "Prompt en klantnaam zijn verplicht" },
        { status: 400 }
      )
    }

    let items: GeneratedItem[]

    if (useAI && process.env.OPENAI_API_KEY) {
      items = await generateWithOpenAI(prompt, clientName)
    } else {
      items = matchWerkzaamheden(prompt)
    }

    // Bereken totalen
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const btwTotals = items.reduce((acc, item) => {
      const btwAmount = (item.total * item.btw) / 100
      acc[item.btw] = (acc[item.btw] || 0) + btwAmount
      return acc
    }, {} as Record<number, number>)
    const totalBtw = Object.values(btwTotals).reduce((sum, val) => sum + val, 0)
    const total = subtotal + totalBtw

    return NextResponse.json({
      success: true,
      items,
      summary: {
        subtotal,
        btwTotals,
        totalBtw,
        total,
      },
      generatedAt: new Date().toISOString(),
      usedAI: useAI && !!process.env.OPENAI_API_KEY,
    })

  } catch (error) {
    console.error("Generate offerte error:", error)
    return NextResponse.json(
      { error: "Er ging iets mis bij het genereren" },
      { status: 500 }
    )
  }
}
