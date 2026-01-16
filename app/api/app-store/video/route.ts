import { NextRequest, NextResponse } from 'next/server'

// App Store promotional video generation
export async function POST(request: NextRequest) {
  try {
    const { videoConfig } = await request.json()
    
    // In production, this would call the actual Wavespeed API
    // For now, we'll simulate the generation
    
    const generatedVideo = {
      id: 'promo_video_1',
      title: videoConfig.title || 'ARCHON.AI - Promotie Video',
      description: videoConfig.description || 'Professionele promotie video voor App Store',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Placeholder video
      duration: videoConfig.duration || 15,
      aspectRatio: videoConfig.aspectRatio || '16:9',
      resolution: '1920x1080',
      fileSize: '2.5MB',
      generatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      video: generatedVideo,
      message: 'Promotional video generated successfully'
    })

  } catch (error) {
    console.error('Video generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return predefined video configurations
    const videoConfigs = [
      {
        id: 'app_store_intro',
        title: 'App Store Intro',
        description: 'Korte introductie video voor App Store pagina (15-30 seconden)',
        duration: 15,
        aspectRatio: '16:9',
        prompt: 'Professionele App Store promotie video voor ARCHON.AI, bouwsoftware, AI features, moderne interface, 15 seconden'
      },
      {
        id: 'feature_showcase',
        title: 'Feature Showcase',
        description: 'Video die belangrijkste features toont (30-60 seconden)',
        duration: 30,
        aspectRatio: '16:9',
        prompt: 'Feature showcase video voor bouwsoftware, factuur management, AI assistentie, project tracking, 30 seconden'
      },
      {
        id: 'social_media',
        title: 'Social Media Ad',
        description: 'Korte video voor social media (10-15 seconden)',
        duration: 10,
        aspectRatio: '9:16',
        prompt: 'Social media video advertentie voor bouwsoftware, verticale formaat, 10 seconden, modern design'
      },
      {
        id: 'tutorial',
        title: 'Tutorial Video',
        description: 'Korte tutorial over een specifieke feature (60-90 seconden)',
        duration: 60,
        aspectRatio: '16:9',
        prompt: 'Tutorial video voor bouwsoftware, hoe factuur maken met AI, 60 seconden, professioneel'
      }
    ]

    return NextResponse.json({
      success: true,
      videoConfigs
    })

  } catch (error) {
    console.error('Error fetching video configs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video configurations' },
      { status: 500 }
    )
  }
}
