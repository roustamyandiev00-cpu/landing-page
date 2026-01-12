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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2, CheckCircle, FileText, Receipt } from "lucide-react"

interface AIGeneratorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "offerte" | "factuur"
  onGenerate?: (data: GeneratedDocument) => void
}

interface GeneratedDocument {
  client: string
  description: string
  items: Array<{ description: string; quantity: number; price: number }>
  total: number
}

export function AIGeneratorDialog({ open, onOpenChange, type, onGenerate }: AIGeneratorDialogProps) {
  const [step, setStep] = useState<"input" | "generating" | "preview">("input")
  const [prompt, setPrompt] = useState("")
  const [client, setClient] = useState("")
  const [template, setTemplate] = useState("standaard")
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null)

  const isOfferte = type === "offerte"
  const Icon = isOfferte ? FileText : Receipt

  const handleGenerate = async () => {
    setStep("generating")

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock generated document based on prompt
    const mockDoc: GeneratedDocument = {
      client: client || "Nieuwe Klant B.V.",
      description: prompt || (isOfferte ? "Website ontwikkeling project" : "Maandelijkse diensten"),
      items: [
        { description: "Ontwerp en planning", quantity: 1, price: 1500 },
        { description: "Development werkzaamheden", quantity: 40, price: 85 },
        { description: "Testing en oplevering", quantity: 1, price: 500 },
      ],
      total: 5400,
    }

    setGeneratedDoc(mockDoc)
    setStep("preview")
  }

  const handleConfirm = () => {
    if (generatedDoc) {
      onGenerate?.(generatedDoc)
    }
    handleClose()
  }

  const handleClose = () => {
    setStep("input")
    setPrompt("")
    setClient("")
    setTemplate("standaard")
    setGeneratedDoc(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI {isOfferte ? "Offerte" : "Factuur"} Generator
          </DialogTitle>
          <DialogDescription>
            Beschrijf wat je nodig hebt en laat AI een {isOfferte ? "offerte" : "factuur"} voor je opstellen
          </DialogDescription>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="client">Klantnaam (optioneel)</Label>
              <Input
                id="client"
                placeholder="Naam van de klant"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standaard">Standaard</SelectItem>
                  <SelectItem value="consultancy">Consultancy</SelectItem>
                  <SelectItem value="development">Software Development</SelectItem>
                  <SelectItem value="design">Design & Creatie</SelectItem>
                  <SelectItem value="marketing">Marketing Diensten</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Beschrijf het project *</Label>
              <Textarea
                id="prompt"
                placeholder={
                  isOfferte
                    ? "Bijv: Website redesign voor een restaurant met online reserveringssysteem, 5 pagina's, responsief ontwerp..."
                    : "Bijv: Consultancy werkzaamheden voor december, 20 uur tegen uurtarief van €95..."
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Hoe meer details je geeft, hoe beter de AI je {isOfferte ? "offerte" : "factuur"} kan opstellen
              </p>
            </div>
          </div>
        )}

        {step === "generating" && (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-medium">AI is bezig met genereren...</p>
              <p className="text-sm text-muted-foreground mt-1">
                Een moment geduld terwijl we je {isOfferte ? "offerte" : "factuur"} opstellen
              </p>
            </div>
          </div>
        )}

        {step === "preview" && generatedDoc && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-emerald-500">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{isOfferte ? "Offerte" : "Factuur"} gegenereerd!</span>
            </div>

            <div className="border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{generatedDoc.client}</p>
                  <p className="text-sm text-muted-foreground">{generatedDoc.description}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                {generatedDoc.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.description} ({item.quantity}x)
                    </span>
                    <span>
                      {(item.quantity * item.price).toLocaleString("nl-NL", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-medium">Totaal</span>
                <span className="text-lg font-bold">
                  {generatedDoc.total.toLocaleString("nl-NL", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Je kunt de {isOfferte ? "offerte" : "factuur"} na het aanmaken nog aanpassen
            </p>
          </div>
        )}

        <DialogFooter>
          {step === "input" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Annuleren
              </Button>
              <Button onClick={handleGenerate} disabled={!prompt}>
                <Sparkles className="w-4 h-4 mr-2" />
                Genereer met AI
              </Button>
            </>
          )}
          {step === "preview" && (
            <>
              <Button variant="outline" onClick={() => setStep("input")}>
                Opnieuw genereren
              </Button>
              <Button onClick={handleConfirm}>
                <CheckCircle className="w-4 h-4 mr-2" />
                {isOfferte ? "Offerte" : "Factuur"} Aanmaken
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
