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
          projectDescription: projectBeschrijving,
          clientName: klantNaam,
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
      }
    } catch (error) {
      console.error("Error generating offerte:", error)
      // Fallback: add generic items
      setItems([
        { id: "1", description: "Werkzaamheden volgens beschrijving", quantity: 8, unit: "uur", unitPrice: 55, btw: 21 },
        { id: "2", description: "Materiaalkosten", quantity: 1, unit: "forfait", unitPrice: 250, btw: 21 },
      ])
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
          {step === "beschrijving" && (
            <div className="space-y-4 px-1">
              <div className="space-y-2">
                <Label htmlFor="project">Beschrijf het project *</Label>
                <Textarea
                  id="project"
                  placeholder="Bijv: Badkamer renovatie van 8m², inclusief nieuwe tegels, inloopdouche, toilet en wastafel. Oude sanitair verwijderen en afvoeren. Wanden en vloer betegelen."
                  value={projectBeschrijving}
                  onChange={(e) => setProjectBeschrijving(e.target.value)}
                  rows={6}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Vermeld afmetingen (m², meters), aantallen en specifieke werkzaamheden voor een nauwkeurigere offerte
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

          {/* Step 3: Generating */}
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

          {/* Step 4: Items aanpassen */}
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
                  <div key={item.id} className="flex flex-col sm:flex-row gap-2 p-3 bg-muted/30 rounded-lg">
                    <Input
                      placeholder="Omschrijving"
                      className="flex-1"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Aantal"
                        className="w-20"
                        min={0.1}
                        step={0.1}
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                      />
                      <select
                        className="w-24 rounded-md border bg-background px-3 text-sm"
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
                      <div className="relative w-28">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                        <Input
                          type="number"
                          placeholder="Prijs"
                          className="pl-7"
                          min={0}
                          step={0.01}
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <select
                        className="w-20 rounded-md border bg-background px-2 text-sm"
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
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
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

          {/* Step 5: Preview */}
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
              <Button onClick={handleSubmit}>
                <FileText className="w-4 h-4 mr-2" />
                Offerte Opslaan
              </Button>
            ) : step !== "genereren" && (
              <Button onClick={goNext} disabled={!canGoNext()}>
                {step === "beschrijving" ? (
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
