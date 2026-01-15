"use client"

import { useState, useEffect } from "react"
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
import { 
  Sparkles, Loader2, CheckCircle, FileText, Trash2, Plus, 
  ChevronRight, ChevronLeft, Search, Download, Eye,
  Building2, User, Wand2, ListChecks, FileCheck
} from "lucide-react"
import { categorieën, werkzaamheden, zoekWerkzaamheden, getEenheidLabel, type Werkzaamheid } from "@/lib/werkzaamheden-data"
import { generateOfferteHTML, openPDFPreview, type OfferteData } from "@/lib/pdf-generator"

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

type Step = "klant" | "beschrijving" | "genereren" | "items" | "preview"

const steps: { id: Step; label: string; icon: any }[] = [
  { id: "klant", label: "Klant", icon: User },
  { id: "beschrijving", label: "Project", icon: Building2 },
  { id: "genereren", label: "AI Genereren", icon: Wand2 },
  { id: "items", label: "Aanpassen", icon: ListChecks },
  { id: "preview", label: "Afronden", icon: FileCheck },
]

export function AIOfferteDialogV2({ open, onOpenChange, onSubmit }: AIOfferteDialogV2Props) {
  const [step, setStep] = useState<Step>("klant")
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Form data
  const [klantNaam, setKlantNaam] = useState("")
  const [klantEmail, setKlantEmail] = useState("")
  const [klantAdres, setKlantAdres] = useState("")
  const [projectBeschrijving, setProjectBeschrijving] = useState("")
  const [items, setItems] = useState<LineItem[]>([])
  const [opmerkingen, setOpmerkingen] = useState("")
  const [geldigheid, setGeldigheid] = useState("30")
  
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
        setItems([])
        setOpmerkingen("")
        setGeldigheid("30")
        setSearchQuery("")
        setSelectedCategorie(null)
        setShowWerkzaamheden(false)
      }, 200)
    }
  }, [open])

  // Generate offerte with AI
  const generateOfferte = async () => {
    if (!projectBeschrijving || !klantNaam) return
    
    setStep("genereren")
    setIsGenerating(true)
    
    try {
      const response = await fetch("/api/ai/generate-offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: projectBeschrijving,
          clientName: klantNaam,
          useAI: true,
        }),
      })
      
      const data = await response.json()
      
      if (data.success && data.items) {
        setItems(data.items.map((item: any, index: number) => ({
          id: `item-${index}-${Date.now()}`,
          werkzaamheidId: item.werkzaamheidId,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit || "stuk",
          unitPrice: item.unitPrice,
          btw: item.btw || 21,
        })))
        setOpmerkingen("Offerte gegenereerd met AI. Prijzen zijn indicatief en gebaseerd op marktgemiddelden.")
      }
    } catch (error) {
      console.error("Error generating offerte:", error)
      // Fallback: add generic items
      setItems([
        { id: "1", description: "Werkzaamheden volgens beschrijving", quantity: 8, unit: "uur", unitPrice: 55, btw: 21 },
        { id: "2", description: "Materiaalkosten", quantity: 1, unit: "forfait", unitPrice: 250, btw: 21 },
      ])
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
  const handleSubmit = () => {
    const offerteData = {
      client: klantNaam,
      email: klantEmail,
      adres: klantAdres,
      description: projectBeschrijving,
      items: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price: item.unitPrice,
        unit: item.unit,
        btw: item.btw,
      })),
      notes: opmerkingen,
      validDays: geldigheid,
    }
    
    onSubmit?.(offerteData)
    onOpenChange(false)
  }

  // Navigation
  const canGoNext = () => {
    switch (step) {
      case "klant": return klantNaam.length > 0
      case "beschrijving": return projectBeschrijving.length > 0
      case "items": return items.length > 0
      default: return true
    }
  }

  const goNext = () => {
    const stepIndex = steps.findIndex(s => s.id === step)
    if (step === "beschrijving") {
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
