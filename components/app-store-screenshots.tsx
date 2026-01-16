"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Smartphone, 
  Monitor, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  Clock,
  Image as ImageIcon,
  Wand2
} from "lucide-react"
import { toast } from "sonner"

interface ScreenshotType {
  id: string
  type: string
  title: string
  description: string
  prompt: string
}

interface GeneratedScreenshot {
  id: string
  type: string
  title: string
  description: string
  url: string
  generatedAt: string
}

export function AppStoreScreenshots() {
  const [screenshotTypes, setScreenshotTypes] = useState<ScreenshotType[]>([])
  const [generatedScreenshots, setGeneratedScreenshots] = useState<GeneratedScreenshot[]>([])
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    fetchScreenshotTypes()
  }, [])

  const fetchScreenshotTypes = async () => {
    try {
      const response = await fetch('/api/app-store/screenshots')
      const data = await response.json()
      if (response.ok) {
        setScreenshotTypes(data.screenshotTypes)
      }
    } catch (error) {
      console.error('Error fetching screenshot types:', error)
    }
  }

  const generateScreenshots = async () => {
    setGenerating(true)
    setProgress(0)
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch('/api/app-store/screenshots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ screenshots: screenshotTypes })
      })

      const data = await response.json()
      
      clearInterval(progressInterval)
      setProgress(100)
      
      if (response.ok) {
        setGeneratedScreenshots(data.screenshots)
        toast.success(`${data.screenshots.length} screenshots gegenereerd!`)
      } else {
        toast.error(data.error || "Generatie mislukt")
      }
    } catch (error) {
      toast.error("Netwerkfout bij genereren")
    } finally {
      setGenerating(false)
      setTimeout(() => setProgress(0), 2000)
    }
  }

  const downloadAllScreenshots = () => {
    generatedScreenshots.forEach((screenshot, index) => {
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = screenshot.url
        link.download = `archon-screenshot-${screenshot.type}-${index + 1}.png`
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, index * 500) // Stagger downloads
    })
    toast.success("Download van alle screenshots gestart!")
  }

  const downloadScreenshot = (screenshot: GeneratedScreenshot, index: number) => {
    const link = document.createElement('a')
    link.href = screenshot.url
    link.download = `archon-screenshot-${screenshot.type}.png`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Screenshot gedownload!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Smartphone className="w-5 h-5" />
        <h2 className="text-2xl font-bold">App Store Screenshots</h2>
        <Badge variant="secondary" className="ml-auto">
          <Wand2 className="w-3 h-3 mr-1" />
          Wavespeed AI
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Screenshot Types */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Screenshot Types</CardTitle>
              <CardDescription>
                Kies welke screenshots gegenereerd moeten worden
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {screenshotTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{type.title}</p>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Button 
            onClick={generateScreenshots} 
            disabled={generating || screenshotTypes.length === 0}
            className="w-full"
            size="lg"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Genereren...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Genereer Alle Screenshots
              </>
            )}
          </Button>

          {generating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Voortgang</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </div>

        {/* Generated Screenshots */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Gegenereerde Screenshots
                {generatedScreenshots.length > 0 && (
                  <Badge variant="outline">
                    {generatedScreenshots.length} screenshots
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {generatedScreenshots.length > 0 
                  ? "Klik op een screenshot om te downloaden"
                  : "Genereer screenshots om ze hier te zien"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedScreenshots.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button 
                      variant="outline" 
                      onClick={downloadAllScreenshots}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Alle
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedScreenshots.map((screenshot, index) => (
                      <div key={screenshot.id} className="group cursor-pointer" onClick={() => downloadScreenshot(screenshot, index)}>
                        <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
                          <Image
                            src={screenshot.url} 
                            alt={screenshot.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-end">
                            <div className="p-3 text-white">
                              <p className="font-medium text-sm">{screenshot.title}</p>
                              <p className="text-xs opacity-90">{screenshot.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Genereer screenshots om ze hier te zien</p>
                  <p className="text-sm mt-2">Klik op &quot;Genereer Alle Screenshots&quot; om te beginnen</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* App Store Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>App Store Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Required Screenshots</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 6.7-inch display (iPhone)</li>
                <li>• 5.5-inch display (iPhone)</li>
                <li>• 12.9-inch display (iPad)</li>
                <li>• 12.9-inch display (iPad Pro)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Technical Specs</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Resolution: 1242 x 2208 (iPhone)</li>
                <li>• Resolution: 2048 x 2732 (iPad)</li>
                <li>• Format: PNG or JPEG</li>
                <li>• Color space: sRGB</li>
                <li>• No transparency</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
