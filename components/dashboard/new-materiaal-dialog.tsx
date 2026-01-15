"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Save } from "lucide-react"

interface NewMateriaalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: () => void
}

export function NewMateriaalDialog({ open, onOpenChange, onSubmit }: NewMateriaalDialogProps) {
  const [formData, setFormData] = useState({
    naam: "",
    sku: "",
    categorie: "",
    voorraad: "",
    minVoorraad: "",
    eenheid: "stuk",
    prijs: "",
    leverancier: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save to Firestore
    onSubmit?.()
    onOpenChange(false)
    setFormData({
      naam: "",
      sku: "",
      categorie: "",
      voorraad: "",
      minVoorraad: "",
      eenheid: "stuk",
      prijs: "",
      leverancier: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Nieuw Materiaal
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="naam">Productnaam *</Label>
              <Input
                id="naam"
                value={formData.naam}
                onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                className="bg-muted/50 border-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="bg-muted/50 border-0"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categorie">Categorie</Label>
              <Select value={formData.categorie} onValueChange={(value) => setFormData({ ...formData, categorie: value })}>
                <SelectTrigger className="bg-muted/50 border-0">
                  <SelectValue placeholder="Selecteer categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bouwmaterialen">Bouwmaterialen</SelectItem>
                  <SelectItem value="gereedschap">Gereedschap</SelectItem>
                  <SelectItem value="elektrisch">Elektrisch</SelectItem>
                  <SelectItem value="sanitair">Sanitair</SelectItem>
                  <SelectItem value="verf">Verf & Afwerking</SelectItem>
                  <SelectItem value="overig">Overig</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="leverancier">Leverancier</Label>
              <Input
                id="leverancier"
                value={formData.leverancier}
                onChange={(e) => setFormData({ ...formData, leverancier: e.target.value })}
                className="bg-muted/50 border-0"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voorraad">Voorraad *</Label>
              <Input
                id="voorraad"
                type="number"
                value={formData.voorraad}
                onChange={(e) => setFormData({ ...formData, voorraad: e.target.value })}
                className="bg-muted/50 border-0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minVoorraad">Min. Voorraad</Label>
              <Input
                id="minVoorraad"
                type="number"
                value={formData.minVoorraad}
                onChange={(e) => setFormData({ ...formData, minVoorraad: e.target.value })}
                className="bg-muted/50 border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eenheid">Eenheid</Label>
              <Select value={formData.eenheid} onValueChange={(value) => setFormData({ ...formData, eenheid: value })}>
                <SelectTrigger className="bg-muted/50 border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stuk">stuk</SelectItem>
                  <SelectItem value="m">meter</SelectItem>
                  <SelectItem value="m2">m²</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="liter">liter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prijs">Prijs per eenheid (€) *</Label>
            <Input
              id="prijs"
              type="number"
              step="0.01"
              value={formData.prijs}
              onChange={(e) => setFormData({ ...formData, prijs: e.target.value })}
              className="bg-muted/50 border-0"
              required
            />
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
