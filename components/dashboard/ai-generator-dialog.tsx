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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"

interface AIGeneratorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: "email" | "invoice" | "quote"
}

export function AIGeneratorDialog({ open, onOpenChange, type = "email" }: AIGeneratorDialogProps) {
  const [prompt, setPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")

  const handleGenerate = () => {
    // Simulate AI generation logic
    setGeneratedContent("Dit is een voorbeeld van gegenereerde tekst door de AI assistent op basis van jouw instructies.")
  }

  const handleUse = () => {
    onOpenChange(false)
    setPrompt("")
    setGeneratedContent("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Assistent
          </DialogTitle>
          <DialogDescription>
            Laat AI je helpen met het schrijven van {type === "email" ? "e-mails" : type === "invoice" ? "factuuromschrijvingen" : "offerteteksten"}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Wat wil je schrijven?</Label>
            <Textarea
              id="prompt"
              placeholder="Bijv: Schrijf een vriendelijke herinnering voor factuur #2024-001..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
            />
          </div>

          {generatedContent && (
            <div className="space-y-2">
              <Label>Gegenereerd voorstel</Label>
              <div className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">
                {generatedContent}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          {!generatedContent ? (
            <Button onClick={handleGenerate} disabled={!prompt}>
              <Sparkles className="w-4 h-4 mr-2" />
              Genereren
            </Button>
          ) : (
            <Button onClick={handleUse}>
              Gebruiken
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
