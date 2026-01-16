import { NextRequest, NextResponse } from 'next/server'

// Simulate generating App Store screenshots using Wavespeed API
export async function POST(request: NextRequest) {
  try {
    const { screenshots } = await request.json()
    
    // In production, this would call the actual Wavespeed API
    // For now, we'll simulate the generation with placeholder URLs
    
    const generatedScreenshots = screenshots.map((screenshot: any, index: number) => ({
      id: `screenshot_${index + 1}`,
      type: screenshot.type,
      title: screenshot.title,
      description: screenshot.description,
      url: `https://via.placeholder.com/640x1136/4287f0/ffffff/000000?text=${encodeURIComponent(screenshot.title)}`,
      generatedAt: new Date().toISOString()
    }))

    return NextResponse.json({
      success: true,
      screenshots: generatedScreenshots,
      message: `${screenshots.length} screenshots generated successfully`
    })

  } catch (error) {
    console.error('Screenshot generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate screenshots' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return predefined screenshot types for the UI
    const screenshotTypes = [
      {
        id: 'dashboard',
        type: 'dashboard',
        title: 'Dashboard Overzicht',
        description: 'Hoofddashboard met AI insights en statistieken',
        prompt: 'Professioneel dashboard voor bouwsoftware met AI features, statistieken, en factuurbeheer'
      },
      {
        id: 'invoice',
        type: 'invoice',
        title: 'Factuur Aanmaken',
        description: 'Interface voor het snel aanmaken van facturen met AI assistentie',
        prompt: 'Mobiele app interface voor factuur creatie, moderne UI, bouwsector context'
      },
      {
        id: 'quotes',
        type: 'quotes',
        title: 'Offerte Generator',
        description: 'AI-powered offerte generator met project templates',
        prompt: 'Offerte interface met AI suggesties, professionele bouwtemplates, moderne design'
      },
      {
        id: 'projects',
        type: 'projects',
        title: 'Projectbeheer',
        description: 'Projectoverzicht met timeline en budget tracking',
        prompt: 'Project management interface, bouwprojecten, Gantt chart, moderne styling'
      },
      {
        id: 'clients',
        type: 'clients',
        title: 'Klantenoverzicht',
        description: 'Klantendatabase met contactgegevens en projecthistorie',
        prompt: 'Klanten management interface, professionele contactkaarten, bouwsector styling'
      },
      {
        id: 'ai-chat',
        type: 'ai-chat',
        title: 'AI Assistent',
        description: 'AI chat interface voor bouwadvies en documentgeneratie',
        prompt: 'AI chat interface, moderne conversatie UI, bouwsector context, professioneel design'
      }
    ]

    return NextResponse.json({
      success: true,
      screenshotTypes
    })

  } catch (error) {
    console.error('Error fetching screenshot types:', error)
    return NextResponse.json(
      { error: 'Failed to fetch screenshot types' },
      { status: 500 }
    )
  }
}
