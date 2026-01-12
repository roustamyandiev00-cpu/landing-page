"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"

interface NewKlantDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: KlantData) => void
}

interface KlantData {
  bedrijfsnaam: string
  contactpersoon: string
  email: string
  telefoon: string
  adres: string
  stad: string
  postcode: string
}

export function NewKlantDialog({ open, onOpenChange, onSubmit }: NewKlantDialogProps) {
  const [formData, setFormData] = useState<KlantData>({
    bedrijfsnaam: "",
    contactpersoon: "",
    email: "",
    telefoon: "",
    adres: "",
    stad: "",
    postcode: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
    onOpenChange(false)
    setFormData({
      bedrijfsnaam: "",
      contactpersoon: "",
      email: "",
      telefoon: "",
      adres: "",
      stad: "",
      postcode: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nieuwe Klant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="bedrijfsnaam">Bedrijfsnaam</Label>
              <Input
                id="bedrijfsnaam"
                value={formData.bedrijfsnaam}
                onChange={(e) => setFormData({ ...formData, bedrijfsnaam: e.target.value })}
                className="bg-muted/50 border-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactpersoon">Contactpersoon</Label>
              <Input
                id="contactpersoon"
                value={formData.contactpersoon}
                onChange={(e) => setFormData({ ...formData, contactpersoon: e.target.value })}
                className="bg-muted/50 border-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-muted/50 border-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefoon">Telefoon</Label>
              <Input
                id="telefoon"
                value={formData.telefoon}
                onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                className="bg-muted/50 border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adres">Adres</Label>
              <Input
                id="adres"
                value={formData.adres}
                onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                className="bg-muted/50 border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                className="bg-muted/50 border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stad">Stad</Label>
              <Input
                id="stad"
                value={formData.stad}
                onChange={(e) => setFormData({ ...formData, stad: e.target.value })}
                className="bg-muted/50 border-0"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuleren
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Opslaan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
