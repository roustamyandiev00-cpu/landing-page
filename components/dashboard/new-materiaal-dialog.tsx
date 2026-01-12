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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface NewMateriaalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: MateriaalFormData) => void
}

interface MateriaalFormData {
  naam: string
  categorie: string
  sku: string
  voorraad: number
  minVoorraad: number
  eenheid: string
  prijs: number
  leverancier: string
}

const categorieën = [
  "Bouwmaterialen",
  "Afwerking",
  "Isolatie",
  "Sanitair",
  "Elektra",
  "Bevestiging",
  "Gereedschap",
  "Verf & Coating",
  "Hout",
  "Metaal",
]

const eenheden = ["stuks", "zakken", "dozen", "meter", "m²", "m³", "kg", "liter"]

export function NewMateriaalDialog({ open, onOpenChange, onSubmit }: NewMateriaalDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<MateriaalFormData>({
    naam: "",
    categorie: "",
    sku: "",
    voorraad: 0,
    minVoorraad: 10,
    eenheid: "stuks",
    prijs: 0,
    leverancier: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit(formData)
    setIsLoading(false)
    onOpenChange(false)
    setFormData({
      naam: "",
      categorie: "",
      sku: "",
      voorraad: 0,
      minVoorraad: 10,
      eenheid: "stuks",
      prijs: 0,
      leverancier: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nieuw Materiaal Toevoegen</DialogTitle>
          <DialogDescription>
            Voeg een nieuw materiaal toe aan je voorraad.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="naam">Productnaam *</Label>
              <Input
                id="naam"
                placeholder="bijv. Cement Portland 25kg"
                value={formData.naam}
                onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="categorie">Categorie *</Label>
                <Select
                  value={formData.categorie}
                  onValueChange={(value) => setFormData({ ...formData, categorie: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categorieën.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU / Artikelnummer</Label>
                <Input
                  id="sku"
                  placeholder="bijv. CEM-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="voorraad">Huidige Voorraad</Label>
                <Input
                  id="voorraad"
                  type="number"
                  min="0"
                  value={formData.voorraad}
                  onChange={(e) => setFormData({ ...formData, voorraad: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minVoorraad">Min. Voorraad</Label>
                <Input
                  id="minVoorraad"
                  type="number"
                  min="0"
                  value={formData.minVoorraad}
                  onChange={(e) => setFormData({ ...formData, minVoorraad: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eenheid">Eenheid</Label>
                <Select
                  value={formData.eenheid}
                  onValueChange={(value) => setFormData({ ...formData, eenheid: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eenheden.map((eenheid) => (
                      <SelectItem key={eenheid} value={eenheid}>
                        {eenheid}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prijs">Prijs per eenheid (€)</Label>
                <Input
                  id="prijs"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.prijs}
                  onChange={(e) => setFormData({ ...formData, prijs: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="leverancier">Leverancier</Label>
                <Input
                  id="leverancier"
                  placeholder="bijv. Bouwdepot NL"
                  value={formData.leverancier}
                  onChange={(e) => setFormData({ ...formData, leverancier: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuleren
            </Button>
            <Button type="submit" disabled={isLoading || !formData.naam || !formData.categorie}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Toevoegen...
                </>
              ) : (
                "Materiaal Toevoegen"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
