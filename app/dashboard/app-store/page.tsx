"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Image, 
  Video, 
  CheckCircle, 
  Download, 
  Upload,
  Smartphone,
  Monitor,
  Wand2
} from "lucide-react"
import { toast } from "sonner"

export default function AppStorePrepPage() {
  const [activeTab, setActiveTab] = useState("screenshots")
  const [generatedContent, setGeneratedContent] = useState<any>({} as Record<string, any>)

  const handleGenerateScreenshots = async () => {
    try {
      const response = await fetch('/api/app-store/screenshots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          screenshots: [
            { type: 'dashboard', title: 'Dashboard Overzicht', description: 'Hoofddashboard' },
            { type: 'invoice', title: 'Factuur Aanmaken', description: 'Factuur interface' },
            { type: 'quotes', title: 'Offerte Generator', description: 'Offerte interface' },
            { type: 'projects', title: 'Projectbeheer', description: 'Project management' },
            { type: 'clients', title: 'Klantenoverzicht', description: 'Klanten database' },
            { type: 'ai-chat', title: 'AI Assistent', description: 'AI chat interface' }
          ]
        })
      })
      
      const data = await response.json()
      if (response.ok) {
        setGeneratedContent((prev: Record<string, any>) => ({ ...prev, screenshots: data.screenshots }))
        toast.success("Screenshots gegenereerd!")
      } else {
        toast.error("Generatie mislukt")
      }
    } catch (error) {
      toast.error("Netwerkfout")
    }
  }

  const handleGenerateVideo = async () => {
    try {
      const response = await fetch('/api/app-store/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          videoConfig: { 
            title: 'ARCHON.AI - Promotie Video',
            description: 'Professionele App Store video',
            duration: 15,
            aspectRatio: '16:9'
          }
        })
      })
      
      const data = await response.json()
      if (response.ok) {
        setGeneratedContent((prev: Record<string, any>) => ({ ...prev, video: data.video }))
        toast.success("Promotie video gegenereerd!")
      } else {
        toast.error("Generatie mislukt")
      }
    } catch (error) {
      toast.error("Netwerkfout")
    }
  }

  const handleGenerateCopy = async () => {
    try {
      const response = await fetch('/api/app-store/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          copyConfig: { 
            title: 'App Store Complete Copy',
            subtitle: 'Sneller betaald worden met AI',
            description: 'Complete beschrijving',
            keywords: ['bouwsoftware', 'AI', 'factuur', 'offerte', 'projectbeheer']
          }
        })
      })
      
      const data = await response.json()
      if (response.ok) {
        setGeneratedContent((prev: Record<string, any>) => ({ ...prev, copy: data.copy }))
        toast.success("Marketing copy gegenereerd!")
      } else {
        toast.error("Generatie mislukt")
      }
    } catch (error) {
      toast.error("Netwerkfout")
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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">App Store Voorbereiding</h1>
        <p className="text-xl text-gray-600">Genereer alle benodigde content voor App Store submission</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="screenshots">
            <Smartphone className="w-4 h-4 mr-2" />
            Screenshots
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="w-4 h-4 mr-2" />
            Promotie Video
          </TabsTrigger>
          <TabsTrigger value="copy">
            <FileText className="w-4 h-4 mr-2" />
            Marketing Copy
          </TabsTrigger>
          <TabsTrigger value="checklist">
            <CheckCircle className="w-4 h-4 mr-2" />
            Checklist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="screenshots" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                App Store Screenshots
                <Badge variant="secondary">
                  <Wand2 className="w-3 h-3 mr-1" />
                  Wavespeed AI
                </Badge>
              </CardTitle>
              <CardDescription>
                Genereer professionele screenshots voor alle Apple devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Vereiste Screenshots</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 6.7-inch display (iPhone)</li>
                    <li>• 5.5-inch display (iPhone)</li>
                    <li>• 12.9-inch display (iPad)</li>
                    <li>• 12.9-inch display (iPad Pro)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Technische Specificaties</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Resolution: 1242x2208 (iPhone)</li>
                    <li>• Resolution: 2048x2732 (iPad)</li>
                    <li>• Format: PNG/JPEG</li>
                    <li>• Color space: sRGB</li>
                  </ul>
                </div>
              </div>
              
              <Button onClick={handleGenerateScreenshots} className="w-full" size="lg">
                <Wand2 className="w-4 h-4 mr-2" />
                Genereer Alle Screenshots
              </Button>
              
              {generatedContent.screenshots && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Gegenereerde Screenshots</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {generatedContent.screenshots.map((screenshot: any, index: number) => (
                      <div key={screenshot.id} className="text-center">
                        <div className="border rounded-lg p-2 hover:bg-gray-50">
                          <Monitor className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <p className="text-sm font-medium">{screenshot.title}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadContent(screenshot.url, `screenshot-${screenshot.type}.png`)}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Promotie Video
                <Badge variant="secondary">
                  <Wand2 className="w-3 h-3 mr-1" />
                  Wavespeed AI
                </Badge>
              </CardTitle>
              <CardDescription>
                Maak een professionele promotie video voor de App Store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Video Specificaties</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Duur: 15-30 seconden</li>
                    <li>• Aspect ratio: 16:9</li>
                    <li>• Resolutie: 1920x1080</li>
                    <li>• Formaat: MP4/MOV</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Content Type</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• App Store intro</li>
                    <li>• Feature showcase</li>
                    <li>• Tutorial video</li>
                  </ul>
                </div>
              </div>
              
              <Button onClick={handleGenerateVideo} className="w-full" size="lg">
                <Wand2 className="w-4 h-4 mr-2" />
                Genereer Promotie Video
              </Button>
              
              {generatedContent.video && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Gegenereerde Video</h4>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{generatedContent.video.title}</span>
                      <Badge>{generatedContent.video.duration}s</Badge>
                    </div>
                    <video 
                      src={generatedContent.video.url} 
                      controls 
                      className="w-full max-h-64"
                    />
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Resolution: {generatedContent.video.resolution}</p>
                      <p>File size: {generatedContent.video.fileSize}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => downloadContent(generatedContent.video.url, 'promo-video.mp4')}
                      className="mt-2"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Video
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="copy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Marketing Copy
                <Badge variant="secondary">
                  <Wand2 className="w-3 h-3 mr-1" />
                  Wavespeed AI
                </Badge>
              </CardTitle>
              <CardDescription>
                Genereer professionele marketing teksten voor App Store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">App Store Teksten</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• App naam (max 30 karakters)</li>
                  <li>• Subtitel (max 30 karakters)</li>
                  <li>• Beschrijving (max 4000 karakters)</li>
                  <li>• Keywords (max 100 karakters)</li>
                </ul>
              </div>
              
              <Button onClick={handleGenerateCopy} className="w-full" size="lg">
                <Wand2 className="w-4 h-4 mr-2" />
                Genereer Marketing Copy
              </Button>
              
              {generatedContent.copy && (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Gegenereerde Copy</h4>
                  <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                    <div>
                      <label className="text-sm font-medium">Titel:</label>
                      <p className="text-lg font-bold">{generatedContent.copy.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subtitel:</label>
                      <p className="text-md">{generatedContent.copy.subtitle}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Beschrijving:</label>
                      <p className="text-sm text-gray-700">{generatedContent.copy.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Keywords:</label>
                      <div className="flex flex-wrap gap-1">
                        {generatedContent.copy.keywords.map((keyword: string, index: number) => (
                          <Badge key={index} variant="secondary">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => downloadContent('app-store-copy.txt', 'marketing-copy.txt')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Copy
                    </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Submission Checklist
              </CardTitle>
              <CardDescription>
                Volledige checklist voor App Store submission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">📱 Benodigd</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-200"></span>
                        Screenshots (6 formaten)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-200"></span>
                        Promotie video
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-200"></span>
                        Marketing copy
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-200"></span>
                        Privacy policy
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">🔧 Technisch</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-200"></span>
                        Xcode project
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-200"></span>
                        Distribution certificate
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-gray-200"></span>
                        App Store Connect
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">📋 Volgende Stappen</h4>
                  <ol className="space-y-2 text-sm">
                    <li>1. Genereer alle content met bovenstaande tools</li>
                    <li>2. Download en review alle materialen</li>
                    <li>3. Upload naar App Store Connect</li>
                    <li>4. Submit voor review</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
