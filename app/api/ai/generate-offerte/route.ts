import { NextRequest, NextResponse } from "next/server"
import { generateOfferteWithAI } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { projectDescription, clientName } = await request.json()

    if (!projectDescription) {
      return NextResponse.json(
        { error: "Project beschrijving is verplicht" },
        { status: 400 }
      )
    }

    const offerte = await generateOfferteWithAI(projectDescription, clientName || "Klant")
    
    return NextResponse.json(offerte)
  } catch (error: any) {
    console.error("AI Offerte error:", error)
    return NextResponse.json(
      { error: "Er ging iets mis bij het genereren van de offerte" },
      { status: 500 }
    )
  }
}
