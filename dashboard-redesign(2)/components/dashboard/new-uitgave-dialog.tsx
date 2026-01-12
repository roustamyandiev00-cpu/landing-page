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
import { CreditCard } from "lucide-react"

interface NewUitgaveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: UitgaveData) => void
}

interface UitgaveData {
  vendor: string
  amount: number
  btw: number
  category: string
  date: string
  description: string
  paymentMethod: string
}

export function NewUitgaveDialog({ open, onOpenChange, onSubmit }: NewUitgaveDialogProps) {
  const [formData, setFormData] = useState<UitgaveData>({
    vendor: "",
    amount: 0,
    btw: 0,
    category: "kantoor",
    date: new Date().toISOString().split("T")[0],
    description: "",
    paymentMethod: "bank",
  })

  const handleSubmit = () => {
    onSubmit?.(formData)
    onOpenChange(false)
    setFormData({
      vendor: "",
      amount: 0,
      btw: 0,
      category: "kantoor",
      date: new Date().toISOString().split("T")[0],
      description: "",
      paymentMethod: "bank",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Nieuwe Uitgave
          </DialogTitle>
          <DialogDescription>Voeg een nieuwe uitgave toe aan je administratie</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="vendor">Leverancier *</Label>
            <Input
              id="vendor"
              placeholder="Naam leverancier"
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Bedrag (incl. BTW) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-7"
                  step={0.01}
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="btw">BTW bedrag</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <Input
                  id="btw"
                  type="number"
                  className="pl-7"
                  step={0.01}
                  value={formData.btw}
                  onChange={(e) => setFormData({ ...formData, btw: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Datum</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kantoor">Kantoorkosten</SelectItem>
                  <SelectItem value="reizen">Reiskosten</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="software">Software & Licenties</SelectItem>
                  <SelectItem value="hosting">Hosting & Domein</SelectItem>
                  <SelectItem value="verzekering">Verzekeringen</SelectItem>
                  <SelectItem value="overig">Overig</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Betaalmethode</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bankrekening</SelectItem>
                <SelectItem value="creditcard">Creditcard</SelectItem>
                <SelectItem value="contant">Contant</SelectItem>
                <SelectItem value="ideal">iDEAL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Omschrijving</Label>
            <Textarea
              id="description"
              placeholder="Korte omschrijving van de uitgave..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.vendor || formData.amount <= 0}>
            Uitgave Opslaan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
