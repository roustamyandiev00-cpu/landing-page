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
import { FileText, Plus, Trash2 } from "lucide-react"

interface NewOfferteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: OfferteData) => void
}

interface LineItem {
  description: string
  quantity: number
  price: number
}

interface OfferteData {
  client: string
  email: string
  description: string
  validDays: string
  items: LineItem[]
  notes: string
}

export function NewOfferteDialog({ open, onOpenChange, onSubmit }: NewOfferteDialogProps) {
  const [formData, setFormData] = useState<OfferteData>({
    client: "",
    email: "",
    description: "",
    validDays: "30",
    items: [{ description: "", quantity: 1, price: 0 }],
    notes: "",
  })

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, price: 0 }],
    })
  }

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    })
  }

  const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...formData.items]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData({ ...formData, items: newItems })
  }

  const total = formData.items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const handleSubmit = () => {
    onSubmit?.(formData)
    onOpenChange(false)
    setFormData({
      client: "",
      email: "",
      description: "",
      validDays: "30",
      items: [{ description: "", quantity: 1, price: 0 }],
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Nieuwe Offerte
          </DialogTitle>
          <DialogDescription>Maak een nieuwe offerte aan voor je klant</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Client Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Klantnaam *</Label>
              <Input
                id="client"
                placeholder="Bedrijfsnaam"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres *</Label>
              <Input
                id="email"
                type="email"
                placeholder="klant@bedrijf.nl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Projectomschrijving</Label>
              <Input
                id="description"
                placeholder="Korte omschrijving"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validDays">Geldig voor</Label>
              <Select
                value={formData.validDays}
                onValueChange={(value) => setFormData({ ...formData, validDays: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14">14 dagen</SelectItem>
                  <SelectItem value="30">30 dagen</SelectItem>
                  <SelectItem value="60">60 dagen</SelectItem>
                  <SelectItem value="90">90 dagen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-3">
            <Label>Regelitems</Label>
            <div className="space-y-2">
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <Input
                    placeholder="Omschrijving"
                    className="flex-1"
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Aantal"
                    className="w-20"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                  />
                  <div className="relative w-28">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <Input
                      type="number"
                      placeholder="Prijs"
                      className="pl-7"
                      min={0}
                      step={0.01}
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Regel toevoegen
            </Button>
          </div>

          {/* Total */}
          <div className="flex justify-end p-4 bg-muted/50 rounded-lg">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Totaal excl. BTW</p>
              <p className="text-2xl font-bold text-foreground">
                {total.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Opmerkingen</Label>
            <Textarea
              id="notes"
              placeholder="Eventuele opmerkingen of voorwaarden..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.client || !formData.email}>
            Offerte Aanmaken
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
