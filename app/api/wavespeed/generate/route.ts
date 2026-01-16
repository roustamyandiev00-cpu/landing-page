import { NextRequest, NextResponse } from 'next/server'

interface WavespeedRequest {
  prompt: string
  type: 'video' | 'image' | 'text' | 'social'
  style?: 'professional' | 'modern' | 'minimal' | 'bold'
  duration?: number // for videos in seconds
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5'
}

interface WavespeedResponse {
  success: boolean
  content?: {
    url?: string
    text?: string
    title?: string
    description?: string
    hashtags?: string[]
  }
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: WavespeedRequest = await request.json()
    const { prompt, type, style = 'professional', duration, aspectRatio = '16:9' } = body

    if (!prompt || !type) {
      return NextResponse.json(
        { error: 'Prompt and type are required' },
        { status: 400 }
      )
    }

    // App Store specific prompts based on type
    let enhancedPrompt = ''
    
    switch (type) {
      case 'video':
        enhancedPrompt = `Create a professional App Store promotional video for ARCHON.AI - AI-powered construction software. ${prompt}. Style: ${style}, Duration: ${duration || 15}s, Aspect Ratio: ${aspectRatio}. Focus on: invoice management, AI quotes, project tracking, professional builders using the app. Modern construction site background.`
        break
      case 'image':
        enhancedPrompt = `Create a professional App Store screenshot for ARCHON.AI - AI-powered construction software. ${prompt}. Style: ${style}, Aspect Ratio: ${aspectRatio}. Show: clean interface, professional dashboard, mobile app screen, construction industry context. High quality, professional lighting.`
        break
      case 'text':
        enhancedPrompt = `Write compelling App Store marketing copy for ARCHON.AI - AI-powered construction software. ${prompt}. Style: ${style}. Include: catchy headline, app description, key features, call to action. Target: construction professionals, builders, contractors.`
        break
      case 'social':
        enhancedPrompt = `Create social media content for ARCHON.AI - AI-powered construction software. ${prompt}. Style: ${style}. Include: engaging caption, relevant hashtags, call to action. Platform: Instagram/Facebook/LinkedIn. Target: construction industry.`
        break
    }

    // Call Wavespeed API
    const wavespeedResponse = await callWavespeedAPI({
      prompt: enhancedPrompt,
      type,
      style,
      duration,
      aspectRatio
    })

    if (!wavespeedResponse.success) {
      return NextResponse.json(
        { error: wavespeedResponse.error || 'Failed to generate content' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      content: wavespeedResponse.content,
      metadata: {
        type,
        style,
        prompt: enhancedPrompt,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Wavespeed API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function callWavespeedAPI(request: {
  prompt: string
  type: string
  style?: string
  duration?: number
  aspectRatio?: string
}): Promise<WavespeedResponse> {
  try {
    const response = await fetch('https://api.wavespeed.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WAVESPEED_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: request.prompt,
        model: request.type === 'video' ? 'wavespeed-video-v1' : 'wavespeed-image-v1',
        parameters: {
          style: request.style,
          duration: request.duration,
          aspect_ratio: request.aspectRatio,
          quality: 'high',
          format: request.type === 'text' ? 'json' : 'url'
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}: ${response.statusText}`
      }
    }

    const data = await response.json()
    
    return {
      success: true,
      content: {
        url: data.url,
        text: data.text,
        title: data.title,
        description: data.description,
        hashtags: data.hashtags
      }
    }
  } catch (error) {
    console.error('Wavespeed API call failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Generate multiple content variations for A/B testing
export async function PUT(request: NextRequest) {
  try {
    const { prompt, type, count = 3 } = await request.json()
    
    if (!prompt || !type) {
      return NextResponse.json(
        { error: 'Prompt and type are required' },
        { status: 400 }
      )
    }

    const variations = []
    const styles = ['professional', 'modern', 'minimal']
    
    for (let i = 0; i < count; i++) {
      const style = styles[i % styles.length]
      
      const response = await callWavespeedAPI({
        prompt: `${prompt} - Variation ${i + 1}`,
        type,
        style,
        aspectRatio: type === 'video' ? '16:9' : type === 'image' ? '9:16' : undefined
      })
      
      if (response.success) {
        variations.push({
          id: `variation_${i + 1}`,
          style,
          content: response.content
        })
      }
    }

    return NextResponse.json({
      success: true,
      variations,
      metadata: {
        type,
        count,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Wavespeed variations error:', error)
    return NextResponse.json(
      { error: 'Failed to generate variations' },
      { status: 500 }
    )
  }
}
