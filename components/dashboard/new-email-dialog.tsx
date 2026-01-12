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
import { Mail } from "lucide-react"

interface NewEmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewEmailDialog({ open, onOpenChange }: NewEmailDialogProps) {
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSend = () => {
    // Simulate sending logic
    onOpenChange(false)
    setRecipient("")
    setSubject("")
    setMessage("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Nieuwe E-mail
          </DialogTitle>
          <DialogDescription>Stuur een bericht naar je klant of contactpersoon.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Aan</Label>
            <Input
              id="recipient"
              placeholder="naam@voorbeeld.nl"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Onderwerp</Label>
            <Input
              id="subject"
              placeholder="Onderwerp van je bericht"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Bericht</Label>
            <Textarea
              id="message"
              placeholder="Typ hier je bericht..."
              className="min-h-[200px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSend} disabled={!recipient || !subject || !message}>
            Versturen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
