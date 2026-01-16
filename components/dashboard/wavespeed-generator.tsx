"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Video, 
  Image, 
  FileText, 
  Share2, 
  Wand2, 
  Download, 
  Copy, 
  RefreshCw,
  Sparkles,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react"
import { toast } from "sonner"

interface GeneratedContent {
  url?: string
  text?: string
  title?: string
  description?: string
  hashtags?: string[]
}

interface ContentVariation {
  id: string
  style: string
  content: GeneratedContent
}

export function WavespeedGenerator() {
  const [prompt, setPrompt] = useState("")
  const [type, setType] = useState<'video' | 'image' | 'text' | 'social'>('video')
  const [style, setStyle] = useState<'professional' | 'modern' | 'minimal' | 'bold'>('professional')
  const [duration, setDuration] = useState(15)
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1' | '4:5'>('16:9')
  const [generating, setGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [variations, setVariations] = useState<ContentVariation[]>([])
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("single")

  const generateContent = async (variationsCount = 1) => {
    if (!prompt.trim()) {
      toast.error("Voer een beschrijving in")
      return
    }

    setGenerating(true)
    setProgress(0)
    
    try {
      const endpoint = variationsCount > 1 ? '/api/wavespeed/generate' : '/api/wavespeed/generate'
      const method = variationsCount > 1 ? 'PUT' : 'POST'
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          type,
          style,
          duration: type === 'video' ? duration : undefined,
          aspectRatio: type === 'video' || type === 'image' ? aspectRatio : undefined,
          count: variationsCount
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        if (data.variations) {
          setVariations(data.variations)
          setGeneratedContent(data.variations[0].content)
          toast.success(`${variationsCount} varianties gegenereerd!`)
        } else {
          setGeneratedContent(data.content)
          toast.success("Content succesvol gegenereerd!")
        }
      } else {
        toast.error(data.error || "Generatie mislukt")
      }
    } catch (error) {
      toast.error("Netwerkfout bij genereren")
    } finally {
      setGenerating(false)
      setProgress(0)
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
    toast.success("Gekopieerd naar klembord!")
  }

  const getDeviceIcon = (ratio: string) => {
    switch (ratio) {
      case '16:9': return Monitor
      case '9:16': return Smartphone
      case '1:1': return Tablet
      case '4:5': return Smartphone
      default: return Monitor
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Wand2 className="w-5 h-5" />
        <h2 className="text-2xl font-bold">App Store Content Generator</h2>
        <Badge variant="secondary" className="ml-auto">
          <Sparkles className="w-3 h-3 mr-1" />
          Wavespeed AI
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Configuratie</CardTitle>
              <CardDescription>
                Genereer professionele marketing content voor ARCHON.AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Content Type */}
              <div className="space-y-2">
                <Label>Content Type</Label>
                <Select value={type} onValueChange={(value: any) => setType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Promotie Video
                      </div>
                    </SelectItem>
                    <SelectItem value="image">
                      <div className="flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        App Store Screenshot
                      </div>
                    </SelectItem>
                    <SelectItem value="text">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Marketing Tekst
                      </div>
                    </SelectItem>
                    <SelectItem value="social">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Social Media Post
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Style */}
              <div className="space-y-2">
                <Label>Stijl</Label>
                <Select value={style} onValueChange={(value: any) => setStyle(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professioneel</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="minimal">Minimalistisch</SelectItem>
                    <SelectItem value="bold">Opvallend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conditional Fields */}
              {type === 'video' && (
                <>
                  <div className="space-y-2">
                    <Label>Video Duur (seconden)</Label>
                    <Input
                      type="number"
                      min="5"
                      max="60"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                    />
                  </div>
                </>
              )}

              {(type === 'video' || type === 'image') && (
                <div className="space-y-2">
                  <Label>Beeldverhouding</Label>
                  <Select value={aspectRatio} onValueChange={(value: any) => setAspectRatio(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:9">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4" />
                          16:9 (Landscape)
                        </div>
                      </SelectItem>
                      <SelectItem value="9:16">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          9:16 (Portrait)
                        </div>
                      </SelectItem>
                      <SelectItem value="1:1">
                        <div className="flex items-center gap-2">
                          <Tablet className="w-4 h-4" />
                          1:1 (Square)
                        </div>
                      </SelectItem>
                      <SelectItem value="4:5">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          4:5 (App Store)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Prompt */}
              <div className="space-y-2">
                <Label>Beschrijving</Label>
                <Textarea
                  placeholder="Beschrijf wat je wilt genereren..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  onClick={() => generateContent(1)} 
                  disabled={generating || !prompt.trim()}
                  className="w-full"
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
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => generateContent(3)} 
                  disabled={generating || !prompt.trim()}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Genereer 3 Varianties
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Resultaat</TabsTrigger>
              <TabsTrigger value="variations" disabled={variations.length === 0}>
                Varianties ({variations.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4">
              {generating && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <RefreshCw className="w-8 h-8 mx-auto animate-spin" />
                      <div>
                        <p className="font-medium">Content wordt gegenereerd...</p>
                        <p className="text-sm text-muted-foreground">Dit kan tot 30 seconden duren</p>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {generatedContent && !generating && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Gegenereerd Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Video/Image Preview */}
                    {(type === 'video' || type === 'image') && generatedContent.url && (
                      <div className="space-y-2">
                        <Label>Preview</Label>
                        <div className="relative rounded-lg overflow-hidden bg-muted">
                          {type === 'video' ? (
                            <video 
                              src={generatedContent.url} 
                              controls 
                              className="w-full h-auto max-h-96"
                              poster="/placeholder.jpg"
                            />
                          ) : (
                            <img 
                              src={generatedContent.url} 
                              alt="Generated content"
                              className="w-full h-auto"
                            />
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => downloadContent(generatedContent.url!, `archon-${type}-${Date.now()}.${type === 'video' ? 'mp4' : 'png'}`)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(generatedContent.url!)}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Kopieer URL
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Text Content */}
                    {(type === 'text' || type === 'social') && (
                      <div className="space-y-4">
                        {generatedContent.title && (
                          <div className="space-y-2">
                            <Label>Titel</Label>
                            <div className="p-3 bg-muted rounded-lg">
                              <p className="font-medium">{generatedContent.title}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => copyToClipboard(generatedContent.title!)}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Kopieer
                            </Button>
                          </div>
                        )}

                        {generatedContent.text && (
                          <div className="space-y-2">
                            <Label>Beschrijving</Label>
                            <div className="p-3 bg-muted rounded-lg">
                              <p className="whitespace-pre-wrap">{generatedContent.text}</p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => copyToClipboard(generatedContent.text!)}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Kopieer
                            </Button>
                          </div>
                        )}

                        {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
                          <div className="space-y-2">
                            <Label>Hashtags</Label>
                            <div className="flex flex-wrap gap-2">
                              {generatedContent.hashtags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => copyToClipboard(generatedContent.hashtags!.join(' '))}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Kopieer Hashtags
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {!generatedContent && !generating && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Genereer content om het resultaat te zien</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="variations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {variations.map((variation) => (
                  <Card key={variation.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {variation.style.charAt(0).toUpperCase() + variation.style.slice(1)} Stijl
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {variation.content.url && (
                        <div className="relative rounded-lg overflow-hidden bg-muted">
                          {type === 'video' ? (
                            <video 
                              src={variation.content.url} 
                              controls 
                              className="w-full h-auto max-h-48"
                            />
                          ) : (
                            <img 
                              src={variation.content.url} 
                              alt={`Variation ${variation.id}`}
                              className="w-full h-auto"
                            />
                          )}
                        </div>
                      )}
                      
                      {variation.content.text && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{variation.content.text}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => downloadContent(variation.content.url!, `archon-${type}-${variation.style}-${Date.now()}.${type === 'video' ? 'mp4' : 'png'}`)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setGeneratedContent(variation.content)}
                        >
                          Gebruik deze
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Tips */}
      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          <strong>Pro Tips:</strong> Wees specifiek in je beschrijving. Bijvoorbeeld: &quot;Professionele builder die op tablet factuur maakt op bouwplaats met moderne tools&quot; voor betere resultaten.
        </AlertDescription>
      </Alert>
    </div>
  )
}
