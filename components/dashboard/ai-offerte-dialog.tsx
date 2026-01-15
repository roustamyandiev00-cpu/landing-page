"use client"

import { useState } from "react"
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
import { Sparkles, Loader2, CheckCircle, FileText, Trash2, Plus } from "lucide-react"

interface AIOfferteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: any) => void
}

interface LineItem {
  description: string
  quantity: number
  price: number
}

export function AIOfferteDialog({ open, onOpenChange, onSubmit }: AIOfferteDialogProps) {
  const [step, setStep] = useState<"input" | "generating" | "preview">("input")
  const [prompt, setPrompt] = useState("")
  const [client, setClient] = useState("")
  const [email, setEmail] = useState("")
  const [items, setItems] = useState<LineItem[]>([])
  const [description, setDescription] = useState("")
  const [notes, setNotes] = useState("")

  const generateOfferte = async () => {
    if (!prompt || !client) return
    
    setStep("generating")
    
    // Simulate AI generation (in production, this would call an AI API)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Parse the prompt and generate items
    const generatedItems = generateItemsFromPrompt(prompt)
    setItems(generatedItems)
    setDescription(prompt)
    setNotes("Offerte gegenereerd met AI. Prijzen zijn indicatief en kunnen worden aangepast.")
    
    setStep("preview")
  }

  const generateItemsFromPrompt = (text: string): LineItem[] => {
    // Simple AI simulation - in production use real AI
    const lowerText = text.toLowerCase()
    const items: LineItem[] = []
    
    // Detect common construction/renovation terms
    if (lowerText.includes("badkamer")) {
      items.push({ description: "Badkamer renovatie - arbeid", quantity: 1, price: 2500 })
      items.push({ description: "Sanitair materialen", quantity: 1, price: 1800 })
      items.push({ description: "Tegels en afwerking", quantity: 1, price: 1200 })
    }
    if (lowerText.includes("keuken")) {
      items.push({ description: "Keuken installatie - arbeid", quantity: 1, price: 1500 })
      items.push({ description: "Keukenkasten en werkblad", quantity: 1, price: 3500 })
      items.push({ description: "Apparatuur aansluiting", quantity: 1, price: 450 })
    }
    if (lowerText.includes("schilder") || lowerText.includes("verf")) {
      items.push({ description: "Schilderwerk - arbeid", quantity: 1, price: 850 })
      items.push({ description: "Verf en materialen", quantity: 1, price: 350 })
    }
    if (lowerText.includes("vloer")) {
      items.push({ description: "Vloer leggen - arbeid", quantity: 1, price: 1200 })
      items.push({ description: "Vloermateriaal", quantity: 1, price: 2000 })
    }
    if (lowerText.includes("dak")) {
      items.push({ description: "Dakwerk - arbeid", quantity: 1, price: 3500 })
      items.push({ description: "Dakpannen/materiaal", quantity: 1, price: 2500 })
    }
    if (lowerText.includes("elektr")) {
      items.push({ description: "Elektra werkzaamheden", quantity: 1, price: 950 })
      items.push({ description: "Elektra materialen", quantity: 1, price: 450 })
    }
    if (lowerText.includes("loodgieter") || lowerText.includes("leiding")) {
      items.push({ description: "Loodgieterwerk", quantity: 1, price: 750 })
      items.push({ description: "Leidingwerk materialen", quantity: 1, price: 350 })
    }
    
    // If no specific items detected, add generic
    if (items.length === 0) {
      items.push({ description: "Werkzaamheden volgens beschrijving", quantity: 1, price: 1500 })
      items.push({ description: "Materiaalkosten", quantity: 1, price: 500 })
    }
    
    return items
  }

  const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0)

  const handleSubmit = () => {
    onSubmit?.({
      client,
      email,
      description,
      items,
      notes,
      validDays: "30",
    })
    
    // Reset form
    setStep("input")
    setPrompt("")
    setClient("")
    setEmail("")
    setItems([])
    setDescription("")
    setNotes("")
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset after close animation
    setTimeout(() => {
      setStep("input")
      setPrompt("")
      setClient("")
      setEmail("")
      setItems([])
      setDescription("")
      setNotes("")
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Offerte Generator
          </DialogTitle>
          <DialogDescription>
            Beschrijf het project en laat AI een offerte voor je maken
          </DialogDescription>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ai-client">Klantnaam *</Label>
                <Input
                  id="ai-client"
                  placeholder="Bedrijfsnaam of naam klant"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ai-email">E-mailadres</Label>
                <Input
                  id="ai-email"
                  type="email"
                  placeholder="klant@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ai-prompt">Beschrijf het project *</Label>
              <Textarea
                id="ai-prompt"
                placeholder="Bijv: Badkamer renovatie van 8m², inclusief nieuwe tegels, douche, toilet en wastafel. Oude sanitair verwijderen en afvoeren."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Hoe meer details je geeft, hoe nauwkeuriger de offerte
              </p>
            </div>
          </div>
        )}

        {step === "generating" && (
          <div className="py-12 text-center">
            <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="font-medium text-foreground">AI is bezig met genereren...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Even geduld terwijl we je offerte opstellen
            </p>
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-emerald-500 mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Offerte gegenereerd!</span>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm"><strong>Klant:</strong> {client}</p>
              {email && <p className="text-sm"><strong>Email:</strong> {email}</p>}
              <p className="text-sm"><strong>Project:</strong> {description}</p>
            </div>

            {/* Editable Items */}
            <div className="space-y-3">
              <Label>Regelitems (aanpasbaar)</Label>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 p-3 sm:p-0 bg-muted/30 sm:bg-transparent rounded-lg">
                    <Input
                      placeholder="Omschrijving"
                      className="flex-1"
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Aantal"
                        className="w-full sm:w-20"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 0)}
                      />
                      <div className="relative w-full sm:w-28">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                        <Input
                          type="number"
                          placeholder="Prijs"
                          className="pl-7"
                          min={0}
                          value={item.price}
                          onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                        className="shrink-0"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addItem} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Regel toevoegen
              </Button>
            </div>

            {/* Total */}
            <div className="flex justify-end p-4 bg-muted/50 rounded-lg">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Totaal excl. BTW</p>
                <p className="text-2xl font-bold text-foreground">
                  €{total.toLocaleString("nl-NL")}
                </p>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="ai-notes">Opmerkingen</Label>
              <Textarea
                id="ai-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Annuleren
          </Button>
          
          {step === "input" && (
            <Button 
              onClick={generateOfferte} 
              disabled={!prompt || !client}
              className="w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Genereer Offerte
            </Button>
          )}
          
          {step === "preview" && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setStep("input")}
                className="w-full sm:w-auto"
              >
                Opnieuw genereren
              </Button>
              <Button onClick={handleSubmit} className="w-full sm:w-auto">
                <FileText className="w-4 h-4 mr-2" />
                Offerte Opslaan
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
