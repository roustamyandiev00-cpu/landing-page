"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Save } from "lucide-react"

interface NewUitgaveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: () => void
}

export function NewUitgaveDialog({ open, onOpenChange, onSubmit }: NewUitgaveDialogProps) {
  const [formData, setFormData] = useState({
    beschrijving: "",
    bedrag: "",
    categorie: "",
    datum: new Date().toISOString().split('T')[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save to Firestore
    onSubmit?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Nieuwe Uitgave
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="beschrijving">Beschrijving *</Label>
            <Input
              id="beschrijving"
              value={formData.beschrijving}
              onChange={(e) => setFormData({ ...formData, beschrijving: e.target.value })}
              className="bg-muted/50 border-0"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrag">Bedrag (€) *</Label>
              <Input
                id="bedrag"
                type="number"
                step="0.01"
                value={formData.bedrag}
                onChange={(e) => setFormData({ ...formData, bedrag: e.target.value })}
                className="bg-muted/50 border-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="datum">Datum *</Label>
              <Input
                id="datum"
                type="date"
                value={formData.datum}
                onChange={(e) => setFormData({ ...formData, datum: e.target.value })}
                className="bg-muted/50 border-0"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="categorie">Categorie</Label>
            <Select value={formData.categorie} onValueChange={(value) => setFormData({ ...formData, categorie: value })}>
              <SelectTrigger className="bg-muted/50 border-0">
                <SelectValue placeholder="Selecteer categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="materialen">Materialen</SelectItem>
                <SelectItem value="brandstof">Brandstof</SelectItem>
                <SelectItem value="maaltijden">Maaltijden</SelectItem>
                <SelectItem value="kantoor">Kantoor</SelectItem>
                <SelectItem value="overig">Overig</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuleren
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Opslaan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}