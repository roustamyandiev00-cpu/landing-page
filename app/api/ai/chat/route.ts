import { NextRequest, NextResponse } from "next/server"
import { chatWithAI } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: "Bericht is verplicht" },
        { status: 400 }
      )
    }

    const response = await chatWithAI(message, context)
    
    return NextResponse.json({ response })
  } catch (error: any) {
    console.error("AI Chat error:", error)
    return NextResponse.json(
      { error: "Er ging iets mis bij het verwerken van je vraag" },
      { status: 500 }
    )
  }
}
