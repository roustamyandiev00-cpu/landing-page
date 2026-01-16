"use client"

import { useState } from "react"
import { 
  Video, 
  Image, 
  FileText, 
  Share2, 
  Wand2, 
  Download, 
  Copy, 
  RefreshCw,
  Sparkles
} from "lucide-react"

interface GeneratedContent {
  url?: string
  text?: string
  title?: string
  description?: string
  hashtags?: string[]
}

export function WavespeedSimple() {
  const [prompt, setPrompt] = useState("")
  const [type, setType] = useState<'video' | 'image' | 'text' | 'social'>('video')
  const [style, setStyle] = useState<'professional' | 'modern' | 'minimal' | 'bold'>('professional')
  const [duration, setDuration] = useState(15)
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1' | '4:5'>('16:9')
  const [generating, setGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)

  const generateContent = async () => {
    if (!prompt.trim()) {
      alert("Voer een beschrijving in")
      return
    }

    setGenerating(true)
    
    try {
      const response = await fetch('/api/wavespeed/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          type,
          style,
          duration: type === 'video' ? duration : undefined,
          aspectRatio: type === 'video' || type === 'image' ? aspectRatio : undefined
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setGeneratedContent(data.content)
        alert("Content succesvol gegenereerd!")
      } else {
        alert(data.error || "Generatie mislukt")
      }
    } catch (error) {
      alert("Netwerkfout bij genereren")
    } finally {
      setGenerating(false)
    }
  }

  const downloadContent = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Gekopieerd naar klembord!")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">App Store Content Generator</h1>
        <p className="text-gray-600">Genereer professionele marketing content voor ARCHON.AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Configuratie</h2>
            
            <div className="space-y-4">
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="video">📹 Promotie Video</option>
                  <option value="image">🖼️ App Store Screenshot</option>
                  <option value="text">📝️ Marketing Tekst</option>
                  <option value="social">📱 Social Media Post</option>
                </select>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stijl</label>
                <select 
                  value={style} 
                  onChange={(e) => setStyle(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="professional">Professioneel</option>
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimalistisch</option>
                  <option value="bold">Opvallend</option>
                </select>
              </div>

              {/* Conditional Fields */}
              {type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Duur (seconden)</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              {(type === 'video' || type === 'image') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beeldverhouding</label>
                  <select 
                    value={aspectRatio} 
                    onChange={(e) => setAspectRatio(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="16:9">🖥️ 16:9 (Landscape)</option>
                    <option value="9:16">📱 9:16 (Portrait)</option>
                    <option value="1:1">📱 1:1 (Square)</option>
                    <option value="4:5">📱 4:5 (App Store)</option>
                  </select>
                </div>
              )}

              {/* Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beschrijving</label>
                <textarea
                  placeholder="Beschrijf wat je wilt genereren..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Generate Button */}
              <button 
                onClick={generateContent} 
                disabled={generating || !prompt.trim()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center font-medium"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Genereren...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Genereer Content
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {generating && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center space-y-4">
                <RefreshCw className="w-12 h-12 mx-auto animate-spin text-blue-600" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Content wordt gegenereerd...</p>
                  <p className="text-sm text-gray-600">Dit kan tot 30 seconden duren</p>
                </div>
              </div>
            </div>
          )}

          {generatedContent && !generating && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Gegenereerd Content</h2>
              </div>
              
              <div className="space-y-6">
                {/* Video/Image Preview */}
                {(type === 'video' || type === 'image') && generatedContent.url && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Preview</h3>
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-300">
                      {type === 'video' ? (
                        <video 
                          src={generatedContent.url} 
                          controls 
                          className="w-full h-auto max-h-96"
                        />
                      ) : (
                        <img 
                          src={generatedContent.url} 
                          alt="Generated content"
                          className="w-full h-auto"
                        />
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => downloadContent(generatedContent.url!, `archon-${type}-${Date.now()}.${type === 'video' ? 'mp4' : 'png'}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                      <button 
                        onClick={() => copyToClipboard(generatedContent.url!)}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 flex items-center"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Kopieer URL
                      </button>
                    </div>
                  </div>
                )}

                {/* Text Content */}
                {(type === 'text' || type === 'social') && (
                  <div className="space-y-4">
                    {generatedContent.title && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Titel</h3>
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                          <p className="font-medium">{generatedContent.title}</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(generatedContent.title!)}
                          className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Kopieer
                        </button>
                      </div>
                    )}

                    {generatedContent.text && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Beschrijving</h3>
                        <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                          <p className="whitespace-pre-wrap">{generatedContent.text}</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(generatedContent.text!)}
                          className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Kopieer
                        </button>
                      </div>
                    )}

                    {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Hashtags</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {generatedContent.hashtags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <button 
                          onClick={() => copyToClipboard(generatedContent.hashtags!.join(' '))}
                          className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 flex items-center"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Kopieer Hashtags
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {!generatedContent && !generating && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="text-center text-gray-500">
                <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Genereer content om het resultaat te zien</p>
                <p className="text-sm mt-2">Voer een beschrijving in en klik op &quot;Genereer Content&quot;</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Sparkles className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Pro Tips</h3>
            <p className="text-blue-800">
              Wees specifiek in je beschrijving voor betere resultaten. Bijvoorbeeld:<br/>
              <em>&quot;Professionele builder die op tablet factuur maakt op bouwplaats met moderne tools&quot;</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
