"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Sparkles, Loader2, Paperclip } from "lucide-react"

interface NewEmailDialogProps {
  children: React.ReactNode
}

export function NewEmailDialog({ children }: NewEmailDialogProps) {
  const [open, setOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  })

  const handleAIGenerate = async () => {
    if (!formData.subject) return
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormData({
      ...formData,
      body: `Geachte heer/mevrouw,

Graag zou ik met u in contact komen betreffende ${formData.subject.toLowerCase()}.

Na aanleiding van ons eerdere contact, wil ik u graag informeren over de volgende stappen die wij kunnen ondernemen om tot een succesvolle samenwerking te komen.

Mocht u nog vragen hebben, dan hoor ik het graag. Ik ben bereikbaar per e-mail of telefonisch.

Met vriendelijke groet,

[Uw naam]
ONYX.AI`,
    })
    setIsGenerating(false)
  }

  const handleSend = () => {
    console.log("Sending email:", formData)
    setOpen(false)
    setFormData({ to: "", subject: "", body: "" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Nieuwe E-mail
          </DialogTitle>
          <DialogDescription>Stel een nieuwe e-mail op of laat AI je helpen</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="to">Aan</Label>
            <Input
              id="to"
              placeholder="email@voorbeeld.nl"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="bg-muted/50 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Onderwerp</Label>
            <Input
              id="subject"
              placeholder="Onderwerp van je e-mail"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="bg-muted/50 border-0"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="body">Bericht</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAIGenerate}
                disabled={isGenerating || !formData.subject}
                className="gap-2 bg-transparent"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-primary" />
                )}
                AI Genereren
              </Button>
            </div>
            <Textarea
              id="body"
              placeholder="Schrijf je bericht..."
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="min-h-[200px] bg-muted/50 border-0"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Paperclip className="w-4 h-4" />
              Bijlage toevoegen
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSend} disabled={!formData.to || !formData.subject} className="gap-2">
            <Send className="w-4 h-4" />
            Verzenden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
