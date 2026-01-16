import { NextRequest, NextResponse } from 'next/server'

// App Store marketing copy generation
export async function POST(request: NextRequest) {
  try {
    const { copyConfig } = await request.json()
    
    // In production, this would call the actual Wavespeed API
    // For now, we'll simulate the generation
    
    const generatedCopy = {
      id: 'app_store_copy_1',
      title: copyConfig.title || 'ARCHON.AI - AI Bouwsoftware',
      subtitle: copyConfig.subtitle || 'Sneller betaald worden met AI',
      description: copyConfig.description || 'Professionele beschrijving voor App Store',
      keywords: copyConfig.keywords || ['bouwsoftware', 'AI', 'factuur', 'offerte', 'projectbeheer', 'bouw', 'aannemer'],
      features: copyConfig.features || [
        'AI-aangedreven factuur creatie',
        'Automatische offerte generatie',
        'Projectmanagement voor bouwers',
        'Klantenbeheer en contacten',
        'BTW aangifte en rapportages',
        'Real-time inzichten en analytics'
      ],
      privacyUrl: 'https://archonpro.com/privacy',
      supportUrl: 'https://archonpro.com/support',
      marketingUrl: 'https://archonpro.com',
      generatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      copy: generatedCopy,
      message: 'Marketing copy generated successfully'
    })

  } catch (error) {
    console.error('Copy generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate marketing copy' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return predefined copy configurations
    const copyConfigs = [
      {
        id: 'app_store_full',
        title: 'App Store Complete Copy',
        description: 'Volledige App Store beschrijving met alle secties',
        sections: ['title', 'subtitle', 'description', 'keywords', 'features', 'privacy']
      },
      {
        id: 'app_store_short',
        title: 'App Store Short Copy',
        description: 'Korte beschrijving voor snelle overzicht',
        sections: ['title', 'subtitle', 'description']
      },
      {
        id: 'social_media',
        title: 'Social Media Copy',
        description: 'Marketing teksten voor social media platforms',
        sections: ['title', 'description', 'hashtags']
      },
      {
        id: 'press_release',
        title: 'Press Release',
        description: 'Persbericht voor lancering',
        sections: ['title', 'description', 'features']
      }
    ]

    return NextResponse.json({
      success: true,
      copyConfigs
    })

  } catch (error) {
    console.error('Error fetching copy configs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch copy configurations' },
      { status: 500 }
    )
  }
}
