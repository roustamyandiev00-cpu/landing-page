"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Loader2, Sparkles, Send } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { addQuote, generateQuoteNumber } from "@/lib/firestore"
import { toast } from "sonner"
import { offerteTemplates, type OfferteTemplate } from "@/lib/offerte-templates"

interface QuickOfferteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: any) => void
}

export function QuickOfferteDialog({ open, onOpenChange, onSubmit }: QuickOfferteDialogProps) {
  const { user } = useAuth()
  const [step, setStep] = useState<"template" | "details" | "generating">("template")
  const [selectedTemplate, setSelectedTemplate] = useState<OfferteTemplate | null>(null)
  const [klantNaam, setKlantNaam] = useState("")
  const [klantEmail, setKlantEmail] = useState("")
  const [projectDetails, setProjectDetails] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleTemplateSelect = (template: OfferteTemplate) => {
    setSelectedTemplate(template)
    setProjectDetails(template.standaardBeschrijving)
    setStep("details")
  }

  const handleGenerate = async () => {
    if (!user || !selectedTemplate) return

    setStep("generating")
    setIsGenerating(true)

    try {
      // Generate with AI based on template
      const response = await fetch("/api/ai/generate-offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectDescription: projectDetails,
          projectType: selectedTemplate.categorie,
          clientName: klantNaam,
          template: selectedTemplate,
        }),
      })

      const data = await response.json()

      // Save quote
      const quoteNumber = await generateQuoteNumber(user.uid)
      const items = data.items || selectedTemplate.items

      const subtotal = items.reduce((sum: number, item: any) => 
        sum + (item.quantity * item.unitPrice), 0
      )
      const taxAmount = subtotal * 0.21
      const total = subtotal + taxAmount

      const quoteData = {
        userId: user.uid,
        quoteNumber,
        clientId: "temp",
        clientName: klantNaam,
        clientEmail: klantEmail,
        items: items.map((item: any) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice || item.price,
          total: item.quantity * (item.unitPrice || item.price)
        })),
        subtotal,
        taxRate: 21,
        taxAmount,
        total,
        status: 'draft' as const,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) as any,
        notes: data.notes || selectedTemplate.opmerkingen,
      }

      await addQuote(quoteData as any)
      toast.success("Offerte succesvol aangemaakt!")
      onSubmit?.(quoteData)
      onOpenChange(false)
      
      // Reset
      setStep("template")
      setSelectedTemplate(null)
      setKlantNaam("")
      setKlantEmail("")
      setProjectDetails("")
    } catch (error) {
      console.error("Error generating quick offerte:", error)
      toast.error("Er ging iets mis bij het genereren")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Snelle Offerte
          </DialogTitle>
          <DialogDescription>
            Maak een offerte in 3 stappen met templates
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Template Selection */}
        {step === "template" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">Kies een template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {offerteTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{template.naam}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {template.omschrijving}
                          </p>
                        </div>
                        <Badge variant="secondary">{template.categorie}</Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <span className="text-sm text-muted-foreground">
                          {template.geschatteTijd}
                        </span>
                        <span className="font-bold text-primary">
                          €{template.geschattePrijs.toLocaleString("nl-NL")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === "details" && selectedTemplate && (
          <div className="space-y-4">
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{selectedTemplate.naam}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedTemplate.omschrijving}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep("template")}
                  >
                    Wijzigen
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
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
                <Label htmlFor="project-details">Project details</Label>
                <Textarea
                  id="project-details"
                  placeholder="Eventuele aanvullende details..."
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Voeg specifieke wensen of afwijkingen van de standaard toe
                </p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setStep("template")}>
                Terug
              </Button>
              <Button onClick={handleGenerate} disabled={!klantNaam}>
                <Sparkles className="w-4 h-4 mr-2" />
                Genereer Offerte
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Generating */}
        {step === "generating" && (
          <div className="py-12 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Offerte wordt gegenereerd...
            </h3>
            <p className="text-muted-foreground">
              AI past de template aan op basis van je input
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
