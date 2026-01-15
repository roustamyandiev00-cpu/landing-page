"use client"

import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles, Loader2, CheckCircle, FileText, Trash2, Plus,
  ChevronRight, ChevronLeft, Search, Download, Eye,
  Building2, User, Wand2, ListChecks, FileCheck, Mic, MicOff,
  Camera, Upload, X, Ruler, Lightbulb, Image as ImageIcon
} from "lucide-react"

import { categorieën, werkzaamheden, zoekWerkzaamheden, getEenheidLabel, type Werkzaamheid } from "@/lib/werkzaamheden-data"
import { generateOfferteHTML, openPDFPreview, type OfferteData } from "@/lib/pdf-generator"
import { useAuth } from "@/lib/auth-context"
import { addQuote, generateQuoteNumber } from "@/lib/firestore"
import { toast } from "sonner"

interface AIOfferteDialogV2Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: any) => void
}

interface LineItem {
  id: string
  werkzaamheidId?: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  btw: number
}

interface ProjectDimensions {
  length: number
  width: number
  height?: number
  area?: number
}

interface UploadedImage {
  id: string
  file: File
  url: string
  analysis?: string
  suggestions?: string[]
}

type Step = "klant" | "project" | "afmetingen" | "fotos" | "genereren" | "items" | "preview"

const steps: { id: Step; label: string; icon: any }[] = [
  { id: "klant", label: "Klant", icon: User },
  { id: "project", label: "Project", icon: Building2 },
  { id: "afmetingen", label: "Afmetingen", icon: Ruler },
  { id: "fotos", label: "Foto's", icon: Camera },
  { id: "genereren", label: "AI Genereren", icon: Wand2 },
  { id: "items", label: "Aanpassen", icon: ListChecks },
  { id: "preview", label: "Afronden", icon: FileCheck },
]

export function AIOfferteDialogV2({ open, onOpenChange, onSubmit }: AIOfferteDialogV2Props) {
  const { user } = useAuth()
  const [step, setStep] = useState<Step>("klant")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Form data
  const [klantNaam, setKlantNaam] = useState("")
  const [klantEmail, setKlantEmail] = useState("")
  const [klantAdres, setKlantAdres] = useState("")
  const [projectBeschrijving, setProjectBeschrijving] = useState("")
  const [projectType, setProjectType] = useState("")
  const [dimensions, setDimensions] = useState<ProjectDimensions>({ length: 0, width: 0 })
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [items, setItems] = useState<LineItem[]>([])
  const [opmerkingen, setOpmerkingen] = useState("")
  const [geldigheid, setGeldigheid] = useState("30")
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  // Speech recognition
  const [isRecording, setIsRecording] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Werkzaamheden browser
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategorie, setSelectedCategorie] = useState<string | null>(null)
  const [showWerkzaamheden, setShowWerkzaamheden] = useState(false)

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("klant")
        setKlantNaam("")
        setKlantEmail("")
        setKlantAdres("")
        setProjectBeschrijving("")
        setProjectType("")
        setDimensions({ length: 0, width: 0 })
        setUploadedImages([])
        setItems([])
        setOpmerkingen("")
        setGeldigheid("30")
        setAiSuggestions([])
        setSearchQuery("")
        setSelectedCategorie(null)
        setShowWerkzaamheden(false)
        stopRecording()
      }, 200)
    }
  }, [open])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setSpeechSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'nl-NL'
        
        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }
          if (finalTranscript) {
            setProjectBeschrijving(prev => prev + ' ' + finalTranscript.trim())
          }
        }
        
        recognitionRef.current.onerror = () => {
          setIsRecording(false)
        }
        
        recognitionRef.current.onend = () => {
          setIsRecording(false)
        }
      }
    }
  }, [])

  // Speech functions
  const startRecording = () => {
    if (recognitionRef.current && speechSupported) {
      setIsRecording(true)
      recognitionRef.current.start()
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      setIsRecording(false)
      recognitionRef.current.stop()
    }
  }

  // Image upload functions
  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return
    
    const newImages: UploadedImage[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        const newImage: UploadedImage = {
          id: `img-${Date.now()}-${i}`,
          file,
          url,
        }
        newImages.push(newImage)
      }
    }
    
    setUploadedImages(prev => [...prev, ...newImages])
    
    // Analyze images with AI
    for (const image of newImages) {
      analyzeImage(image)
    }
  }

  const analyzeImage = async (image: UploadedImage) => {
    try {
      const formData = new FormData()
      formData.append('image', image.file)
      formData.append('projectType', projectType)
      
      const response = await fetch('/api/ai/analyze-image', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (data.analysis) {
        setUploadedImages(prev => prev.map(img => 
          img.id === image.id 
            ? { ...img, analysis: data.analysis, suggestions: data.suggestions || [] }
            : img
        ))
        
        // Add suggestions to global suggestions
        if (data.suggestions) {
          setAiSuggestions(prev => [...new Set([...prev, ...data.suggestions])])
        }
      }
    } catch (error) {
      console.error('Error analyzing image:', error)
    }
  }

  const removeImage = (imageId: string) => {
    setUploadedImages(prev => {
      const image = prev.find(img => img.id === imageId)
      if (image) {
        URL.revokeObjectURL(image.url)
      }
      return prev.filter(img => img.id !== imageId)
    })
  }

  // Calculate area from dimensions
  useEffect(() => {
    if (dimensions.length > 0 && dimensions.width > 0) {
      setDimensions(prev => ({
        ...prev,
        area: prev.length * prev.width
      }))
    }
  }, [dimensions.length, dimensions.width])

  // Generate offerte with AI
  const generateOfferte = async () => {
    if (!projectBeschrijving || !klantNaam) return

    setStep("genereren")
    setIsGenerating(true)

    try {
      // Prepare image data for AI analysis
      const imageAnalyses = uploadedImages
        .filter(img => img.analysis)
        .map(img => ({
          analysis: img.analysis,
          suggestions: img.suggestions || []
        }))

      const response = await fetch("/api/ai/generate-offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectDescription: projectBeschrijving,
          projectType,
          clientName: klantNaam,
          dimensions,
          imageAnalyses,
          existingSuggestions: aiSuggestions,
        }),
      })

      const data = await response.json()

      if (data.items) {
        setItems(data.items.map((item: any, index: number) => ({
          id: `item-${index}-${Date.now()}`,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit || "stuk",
          unitPrice: item.price,
          btw: item.btw || 21,
        })))
        setOpmerkingen(data.notes || "Offerte gegenereerd met AI. Prijzen zijn indicatief en gebaseerd op marktgemiddelden.")
        setGeldigheid(data.validDays || "30")
        
        // Add any additional AI suggestions
        if (data.additionalSuggestions) {
          setAiSuggestions(prev => [...new Set([...prev, ...data.additionalSuggestions])])
        }
      }
    } catch (error) {
      console.error("Error generating offerte:", error)
      // Fallback: add generic items based on dimensions
      const baseItems = []
      
      if (dimensions.area && dimensions.area > 0) {
        baseItems.push({
          id: "1", 
          description: `${projectType || 'Werkzaamheden'} - ${dimensions.area}m²`, 
          quantity: dimensions.area, 
          unit: "m2", 
          unitPrice: 45, 
          btw: 21 
        })
      } else {
        baseItems.push({
          id: "1", 
          description: "Werkzaamheden volgens beschrijving", 
          quantity: 8, 
          unit: "uur", 
          unitPrice: 55, 
          btw: 21 
        })
      }
      
      baseItems.push({
        id: "2", 
        description: "Materiaalkosten", 
        quantity: 1, 
        unit: "forfait", 
        unitPrice: 250, 
        btw: 21 
      })
      
      setItems(baseItems)
      setOpmerkingen("Offerte gegenereerd met standaard template.")
    }

    setIsGenerating(false)
    setStep("items")
  }

  // Item management
  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const addItem = (werkzaamheid?: Werkzaamheid) => {
    const newItem: LineItem = werkzaamheid ? {
      id: `item-${Date.now()}`,
      werkzaamheidId: werkzaamheid.id,
      description: werkzaamheid.naam,
      quantity: 1,
      unit: werkzaamheid.eenheid,
      unitPrice: werkzaamheid.standaardPrijs,
      btw: werkzaamheid.btwTarief,
    } : {
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      unit: "stuk",
      unitPrice: 0,
      btw: 21,
    }
    setItems([...items, newItem])
    setShowWerkzaamheden(false)
  }

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const btwGroups = items.reduce((acc, item) => {
    const btwAmount = (item.quantity * item.unitPrice * item.btw) / 100
    acc[item.btw] = (acc[item.btw] || 0) + btwAmount
    return acc
  }, {} as Record<number, number>)
  const totalBtw = Object.values(btwGroups).reduce((sum, val) => sum + val, 0)
  const total = subtotal + totalBtw

  // Filtered werkzaamheden
  const filteredWerkzaamheden = searchQuery
    ? zoekWerkzaamheden(searchQuery)
    : selectedCategorie
      ? werkzaamheden.filter(w => w.categorie === selectedCategorie)
      : werkzaamheden.slice(0, 20)

  // Generate PDF preview
  const handlePreviewPDF = () => {
    const offerteData: OfferteData = {
      offerteNummer: `OFF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      datum: new Date().toISOString(),
      geldigTot: new Date(Date.now() + parseInt(geldigheid) * 24 * 60 * 60 * 1000).toISOString(),
      klant: {
        naam: klantNaam,
        email: klantEmail,
        adres: klantAdres,
      },
      bedrijf: {
        naam: "Uw Bedrijfsnaam",
        email: "info@uwbedrijf.nl",
      },
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
        btw: item.btw,
      })),
      opmerkingen,
    }

    const html = generateOfferteHTML(offerteData)
    openPDFPreview(html)
  }

  // Submit offerte
  const handleSubmit = async () => {
    if (!user) {
      toast.error("Je moet ingelogd zijn om een offerte op te slaan")
      return
    }

    try {
      setIsSaving(true)
      const quoteNumber = await generateQuoteNumber(user.uid)

      const quoteData = {
        userId: user.uid,
        quoteNumber,
        clientId: "temp-client-id", // In a real app, you'd select or create a client first
        clientName: klantNaam,
        clientEmail: klantEmail,
        items: items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice
        })),
        subtotal,
        taxRate: 21, // Simplified for now, could be mixed
        taxAmount: totalBtw,
        total,
        status: 'draft' as const,
        validUntil: new Date(Date.now() + parseInt(geldigheid) * 24 * 60 * 60 * 1000) as any, // Cast to Timestamp in firestore
        notes: opmerkingen,
      }

      await addQuote(quoteData as any) // Type casting due to timestamp differences in local/firestore types

      toast.success("Offerte succesvol opgeslagen!")
      onSubmit?.(quoteData)
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving quote:", error)
      toast.error("Er ging iets mis bij het opslaan van de offerte")
    } finally {
      setIsSaving(false)
    }
  }

  // Navigation
  const canGoNext = () => {
    switch (step) {
      case "klant": return klantNaam.length > 0
      case "project": return projectBeschrijving.length > 0
      case "afmetingen": return true // Optional step
      case "fotos": return true // Optional step
      case "items": return items.length > 0
      default: return true
    }
  }

  const goNext = () => {
    const stepIndex = steps.findIndex(s => s.id === step)
    if (step === "fotos") {
      generateOfferte()
    } else if (stepIndex < steps.length - 1) {
      setStep(steps[stepIndex + 1].id)
    }
  }

  const goBack = () => {
    const stepIndex = steps.findIndex(s => s.id === step)
    if (stepIndex > 0) {
      setStep(steps[stepIndex - 1].id)
    }
  }

  const currentStepIndex = steps.findIndex(s => s.id === step)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Offerte Generator
          </DialogTitle>
          <DialogDescription>
            Maak snel professionele offertes met AI
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between px-2 py-4 border-b">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 ${index <= currentStepIndex ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index < currentStepIndex ? "bg-primary text-primary-foreground" :
                    index === currentStepIndex ? "bg-primary/20 text-primary border-2 border-primary" :
                      "bg-muted text-muted-foreground"}`}>
                  {index < currentStepIndex ? <CheckCircle className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Step 1: Klant */}
          {step === "klant" && (
            <div className="space-y-4 px-1">
              <div className="space-y-2">
                <Label htmlFor="klant-naam">Klantnaam *</Label>
                <Input
                  id="klant-naam"
                  placeholder="Bedrijfsnaam of naam klant"
                  value={klantNaam}
                  onChange={(e) => setKlantNaam(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="klant-email">E-mailadres</Label>
                <Input
                  id="klant-email"
                  type="email"
                  placeholder="klant@email.nl"
                  value={klantEmail}
                  onChange={(e) => setKlantEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="klant-adres">Adres (optioneel)</Label>
                <Textarea
                  id="klant-adres"
                  placeholder="Straat, postcode, plaats"
                  value={klantAdres}
                  onChange={(e) => setKlantAdres(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Step 2: Project beschrijving */}
          {step === "project" && (
            <div className="space-y-4 px-1">
              <div className="space-y-2">
                <Label htmlFor="project-type">Type project</Label>
                <select
                  id="project-type"
                  className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option value="">Selecteer type project</option>
                  <option value="badkamer">Badkamer renovatie</option>
                  <option value="keuken">Keuken plaatsen</option>
                  <option value="schilderen">Schilderwerk</option>
                  <option value="vloer">Vloer leggen</option>
                  <option value="tuin">Tuinwerk</option>
                  <option value="dak">Dakwerk</option>
                  <option value="elektra">Elektra</option>
                  <option value="loodgieter">Loodgieterswerk</option>
                  <option value="verbouwing">Verbouwing</option>
                  <option value="onderhoud">Onderhoud</option>
                  <option value="overig">Overig</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="project">Beschrijf het project *</Label>
                  {speechSupported && (
                    <Button
                      type="button"
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="w-4 h-4 mr-2" />
                          Stop opname
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Spraak
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <Textarea
                  id="project"
                  placeholder="Bijv: Badkamer renovatie van 8m², inclusief nieuwe tegels, inloopdouche, toilet en wastafel. Oude sanitair verwijderen en afvoeren. Wanden en vloer betegelen."
                  value={projectBeschrijving}
                  onChange={(e) => setProjectBeschrijving(e.target.value)}
                  rows={6}
                  autoFocus
                />
                {isRecording && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Aan het opnemen... Spreek duidelijk in het Nederlands
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Vermeld specifieke werkzaamheden voor een nauwkeurigere offerte. Je kunt ook spraak gebruiken!
                </p>
              </div>

              {/* Quick suggestions */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Snelle voorbeelden</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Badkamer renovatie 6m²",
                    "Keuken plaatsen 4m",
                    "Woonkamer schilderen 40m²",
                    "Laminaat leggen 25m²",
                    "Tuin aanleggen 50m²",
                    "Dak reparatie",
                  ].map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => setProjectBeschrijving(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Afmetingen */}
          {step === "afmetingen" && (
            <div className="space-y-4 px-1">
              <div className="text-center mb-4">
                <Ruler className="w-12 h-12 text-primary mx-auto mb-2" />
                <h3 className="text-lg font-medium">Afmetingen invoeren</h3>
                <p className="text-sm text-muted-foreground">
                  Voer de afmetingen in voor een nauwkeurigere berekening (optioneel)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Lengte (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder="0.0"
                    min={0}
                    step={0.1}
                    value={dimensions.length || ""}
                    onChange={(e) => setDimensions(prev => ({ 
                      ...prev, 
                      length: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Breedte (m)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="0.0"
                    min={0}
                    step={0.1}
                    value={dimensions.width || ""}
                    onChange={(e) => setDimensions(prev => ({ 
                      ...prev, 
                      width: parseFloat(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Hoogte (m) - optioneel</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="0.0"
                  min={0}
                  step={0.1}
                  value={dimensions.height || ""}
                  onChange={(e) => setDimensions(prev => ({ 
                    ...prev, 
                    height: parseFloat(e.target.value) || 0 
                  }))}
                />
              </div>

              {dimensions.area && dimensions.area > 0 && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Ruler className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Berekende oppervlakte</p>
                        <p className="text-2xl font-bold text-primary">{dimensions.area.toFixed(1)} m²</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <Label className="text-muted-foreground">Veelgebruikte afmetingen</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Kleine badkamer", length: 2.5, width: 1.8 },
                    { label: "Standaard badkamer", length: 3.0, width: 2.5 },
                    { label: "Grote badkamer", length: 4.0, width: 3.0 },
                    { label: "Toilet", length: 1.5, width: 1.0 },
                    { label: "Keuken", length: 4.0, width: 2.5 },
                    { label: "Woonkamer", length: 6.0, width: 4.0 },
                  ].map((preset) => (
                    <Button
                      key={preset.label}
                      variant="outline"
                      size="sm"
                      className="h-auto p-2 text-left"
                      onClick={() => setDimensions(prev => ({
                        ...prev,
                        length: preset.length,
                        width: preset.width
                      }))}
                    >
                      <div>
                        <p className="font-medium text-xs">{preset.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {preset.length}m × {preset.width}m
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Foto's */}
          {step === "fotos" && (
            <div className="space-y-4 px-1">
              <div className="text-center mb-4">
                <Camera className="w-12 h-12 text-primary mx-auto mb-2" />
                <h3 className="text-lg font-medium">Foto's toevoegen</h3>
                <p className="text-sm text-muted-foreground">
                  Upload foto's van het project voor betere AI-analyse (optioneel)
                </p>
              </div>

              {/* Upload area */}
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleImageUpload(e.dataTransfer.files)
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">Klik om foto's te uploaden</p>
                <p className="text-xs text-muted-foreground">Of sleep foto's hierheen</p>
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG tot 10MB per foto</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files)}
              />

              {/* Uploaded images */}
              {uploadedImages.length > 0 && (
                <div className="space-y-3">
                  <Label>Geüploade foto's ({uploadedImages.length})</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                          <img
                            src={image.url}
                            alt="Project foto"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(image.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        {image.analysis && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <Badge variant="secondary" className="text-xs">
                              <ImageIcon className="w-3 h-3 mr-1" />
                              AI geanalyseerd
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Suggestions from images */}
              {aiSuggestions.length > 0 && (
                <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                          AI Suggesties op basis van foto's
                        </p>
                        <div className="space-y-1">
                          {aiSuggestions.map((suggestion, index) => (
                            <p key={index} className="text-sm text-amber-700 dark:text-amber-300">
                              • {suggestion}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Image analysis results */}
              {uploadedImages.some(img => img.analysis) && (
                <div className="space-y-2">
                  <Label>AI Analyse resultaten</Label>
                  {uploadedImages
                    .filter(img => img.analysis)
                    .map((image) => (
                      <Card key={image.id} className="bg-muted/30">
                        <CardContent className="p-3">
                          <p className="text-sm text-muted-foreground mb-2">
                            Foto analyse:
                          </p>
                          <p className="text-sm">{image.analysis}</p>
                          {image.suggestions && image.suggestions.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground mb-1">Suggesties:</p>
                              {image.suggestions.map((suggestion, index) => (
                                <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                                  {suggestion}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Generating */}
          {step === "genereren" && (
            <div className="py-12 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">AI is bezig...</h3>
              <p className="text-muted-foreground">
                We analyseren je project en genereren een offerte
              </p>
              <div className="mt-6 flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Step 6: Items aanpassen */}
          {step === "items" && (
            <div className="space-y-4 px-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{items.length} items gegenereerd</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowWerkzaamheden(!showWerkzaamheden)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Item toevoegen
                </Button>
              </div>

              {/* Werkzaamheden browser */}
              {showWerkzaamheden && (
                <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Zoek werkzaamheden..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {categorieën.slice(0, 8).map((cat) => (
                      <Badge
                        key={cat.id}
                        variant={selectedCategorie === cat.id ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategorie(selectedCategorie === cat.id ? null : cat.id)}
                      >
                        {cat.icon} {cat.naam}
                      </Badge>
                    ))}
                  </div>

                  {/* Results */}
                  <ScrollArea className="h-40">
                    <div className="space-y-1">
                      {filteredWerkzaamheden.slice(0, 15).map((werk) => (
                        <div
                          key={werk.id}
                          className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                          onClick={() => addItem(werk)}
                        >
                          <div>
                            <p className="font-medium text-sm">{werk.naam}</p>
                            <p className="text-xs text-muted-foreground">{werk.omschrijving}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">€{werk.standaardPrijs}</p>
                            <p className="text-xs text-muted-foreground">{getEenheidLabel(werk.eenheid)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Button variant="ghost" size="sm" onClick={() => addItem()} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Lege regel toevoegen
                  </Button>
                </div>
              )}

              {/* Items list */}
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={item.id} className="flex flex-col gap-3 p-3 bg-muted/30 rounded-lg">
                    <Input
                      placeholder="Omschrijving"
                      className="w-full"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    />
                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Aantal"
                        className="w-full sm:w-20"
                        min={0.1}
                        step={0.1}
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                      />
                      <select
                        className="w-full sm:w-24 h-9 rounded-md border bg-background px-3 text-sm"
                        value={item.unit}
                        onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                      >
                        <option value="stuk">stuk</option>
                        <option value="m2">m²</option>
                        <option value="m">m</option>
                        <option value="uur">uur</option>
                        <option value="dag">dag</option>
                        <option value="forfait">forfait</option>
                      </select>
                      <div className="relative w-full sm:w-28">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                        <Input
                          type="number"
                          placeholder="Prijs"
                          className="pl-7 w-full"
                          min={0}
                          step={0.01}
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <select
                        className="w-full sm:w-20 h-9 rounded-md border bg-background px-2 text-sm"
                        value={item.btw}
                        onChange={(e) => updateItem(item.id, "btw", parseInt(e.target.value))}
                      >
                        <option value={0}>0%</option>
                        <option value={9}>9%</option>
                        <option value={21}>21%</option>
                      </select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="hidden sm:flex"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="sm:hidden col-span-2 text-destructive hover:text-destructive w-full flex items-center justify-center gap-2"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                        Verwijderen
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotaal</span>
                    <span>€{subtotal.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}</span>
                  </div>
                  {Object.entries(btwGroups).map(([percentage, amount]) => (
                    <div key={percentage} className="flex justify-between">
                      <span className="text-muted-foreground">BTW {percentage}%</span>
                      <span>€{amount.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t font-bold text-lg">
                    <span>Totaal</span>
                    <span className="text-primary">€{total.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Preview */}
          {step === "preview" && (
            <div className="space-y-4 px-1">
              {/* Summary card */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Klant</p>
                    <p className="font-medium">{klantNaam}</p>
                    {klantEmail && <p className="text-sm text-muted-foreground">{klantEmail}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Totaal incl. BTW</p>
                    <p className="text-2xl font-bold text-primary">€{total.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Project</p>
                  <p className="text-sm">{projectBeschrijving}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Items: </span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Geldig: </span>
                    <span className="font-medium">{geldigheid} dagen</span>
                  </div>
                </div>
              </div>

              {/* Geldigheid */}
              <div className="space-y-2">
                <Label>Geldigheid offerte</Label>
                <div className="flex gap-2">
                  {["14", "30", "60", "90"].map((days) => (
                    <Button
                      key={days}
                      variant={geldigheid === days ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGeldigheid(days)}
                    >
                      {days} dagen
                    </Button>
                  ))}
                </div>
              </div>

              {/* Opmerkingen */}
              <div className="space-y-2">
                <Label htmlFor="opmerkingen">Opmerkingen</Label>
                <Textarea
                  id="opmerkingen"
                  placeholder="Eventuele opmerkingen of voorwaarden..."
                  value={opmerkingen}
                  onChange={(e) => setOpmerkingen(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Preview button */}
              <Button variant="outline" onClick={handlePreviewPDF} className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                PDF Voorbeeld bekijken
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="flex-row justify-between border-t pt-4">
          <div>
            {currentStepIndex > 0 && step !== "genereren" && (
              <Button variant="ghost" onClick={goBack}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Terug
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuleren
            </Button>
            {step === "preview" ? (
              <Button onClick={handleSubmit} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                {isSaving ? "Even geduld..." : "Offerte Opslaan"}
              </Button>
            ) : step !== "genereren" && (
              <Button onClick={goNext} disabled={!canGoNext()}>
                {step === "fotos" ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Genereer met AI
                  </>
                ) : (
                  <>
                    Volgende
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
