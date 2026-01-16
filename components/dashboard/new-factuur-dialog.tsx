"use client"

import { useState, useEffect } from "react"
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
import { Receipt, Plus, Trash2, Loader2, Sparkles, AlertTriangle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useAi } from "@/lib/ai-context"
import { AiSuggestionCard } from "./ai-suggestion-card"
import { addInvoice, generateInvoiceNumber, getClients, type Client } from "@/lib/firestore"
import { Timestamp } from "firebase/firestore"

interface NewFactuurDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: () => void
}

interface LineItem {
  description: string
  quantity: number
  price: number
  btw: number
}

interface FactuurData {
  client: string
  clientId: string
  email: string
  description: string
  paymentDays: string
  items: LineItem[]
  notes: string
}

export function NewFactuurDialog({ open, onOpenChange, onSubmit }: NewFactuurDialogProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [formData, setFormData] = useState<FactuurData>({
    client: "",
    clientId: "",
    email: "",
    description: "",
    paymentDays: "14",
    items: [{ description: "", quantity: 1, price: 0, btw: 21 }],
    notes: "",
  })

  useEffect(() => {
    if (user && open) {
      getClients(user.uid).then(setClients)
    }
  }, [user, open])

  const handleClientSelect = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    if (client) {
      setFormData({
        ...formData,
        clientId: client.id!,
        client: client.company || client.name,
        email: client.email,
      })
    }
  }

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, price: 0, btw: 21 }],
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

  const subtotal = formData.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const btwTotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.price * item.btw) / 100, 0)
  const total = subtotal + btwTotal

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    try {
      const invoiceNumber = await generateInvoiceNumber(user.uid)
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + parseInt(formData.paymentDays))

      const invoiceItems = formData.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.quantity * item.price,
      }))

      await addInvoice({
        userId: user.uid,
        invoiceNumber,
        clientId: formData.clientId,
        clientName: formData.client,
        clientEmail: formData.email,
        items: invoiceItems,
        subtotal,
        taxRate: 21,
        taxAmount: btwTotal,
        total,
        status: 'draft',
        dueDate: Timestamp.fromDate(dueDate),
        notes: formData.notes,
      })

      onSubmit?.()
      onOpenChange(false)
      setFormData({
        client: "",
        clientId: "",
        email: "",
        description: "",
        paymentDays: "14",
        items: [{ description: "", quantity: 1, price: 0, btw: 21 }],
        notes: "",
      })
    } catch (error) {
      console.error('Error creating invoice:', error)
      alert('Er ging iets mis bij het aanmaken van de factuur')
    } finally {
      setLoading(false)
    }
  }

  const { addLog } = useAi()
  const [showAiSuggestion, setShowAiSuggestion] = useState(true)

  const handleAiAction = () => {
    // In a real app, this would update the 'vervaldatum' field
    setFormData((prev) => ({ ...prev, paymentDays: "14" }))
    addLog({
      type: "automation",
      message: "AI betaaltermijn toegepast (14 dagen) voor Klant",
      context: "invoice"
    })
    setShowAiSuggestion(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Nieuwe Factuur
          </DialogTitle>
          <DialogDescription>Maak een nieuwe factuur aan voor je klant</DialogDescription>
        </DialogHeader>

        {showAiSuggestion && (
          <div className="mt-4">
            <AiSuggestionCard
              compact
              suggestion={{
                id: "invoice-term",
                type: "automation",
                title: "AI Betaaladvies",
                message: "Deze klant betaalt gemiddeld binnen 12 dagen. Ik stel een termijn van 14 dagen voor.",
                actionLabel: "Pas termijn toe",
                context: "invoice",
                onAction: handleAiAction
              }}
            />
          </div>
        )}

        <div className="space-y-6 py-4">
          {/* Client Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Selecteer Klant *</Label>
              <Select onValueChange={handleClientSelect}>
                <SelectTrigger className="bg-muted/50 border-0 h-12 text-base">
                  <SelectValue placeholder="Kies een klant" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id!}>
                      {client.company || client.name} - {client.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres *</Label>
              <Input
                id="email"
                type="email"
                placeholder="klant@bedrijf.nl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-muted/50 border-0 h-12 text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Factuurbeschrijving</Label>
              <Input
                id="description"
                placeholder="Korte omschrijving"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-muted/50 border-0 h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentDays">Betalingstermijn</Label>
              <Select
                value={formData.paymentDays}
                onValueChange={(value) => setFormData({ ...formData, paymentDays: value })}
              >
                <SelectTrigger className="bg-muted/50 border-0 h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 dagen</SelectItem>
                  <SelectItem value="14">14 dagen</SelectItem>
                  <SelectItem value="30">30 dagen</SelectItem>
                  <SelectItem value="60">60 dagen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-2">
            <Label>Regelitems</Label>
            <div className="space-y-2">
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <Input
                    placeholder="Omschrijving"
                    className="flex-1 bg-muted/50 border-0 h-12 text-base"
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Aantal"
                    className="w-24 bg-muted/50 border-0 h-12 text-base"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                  />
                  <div className="relative w-28">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <Input
                      type="number"
                      placeholder="Prijs"
                      className="pl-7 bg-muted/50 border-0 h-12 text-base"
                      min={0}
                      step={0.01}
                      value={item.price}
                      onChange={(e) => updateItem(index, "price", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <Select
                    value={item.btw.toString()}
                    onValueChange={(value) => updateItem(index, "btw", Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-28 bg-muted/50 border-0 h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% BTW</SelectItem>
                      <SelectItem value="9">9% BTW</SelectItem>
                      <SelectItem value="21">21% BTW</SelectItem>
                    </SelectContent>
                  </Select>
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
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotaal</span>
              <span>{subtotal.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">BTW</span>
              <span>{btwTotal.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-medium">Totaal incl. BTW</span>
              <span className="text-xl font-bold text-foreground">
                {total.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Opmerkingen</Label>
            <Textarea
              id="notes"
              placeholder="Eventuele opmerkingen of betalingsinstructies..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-muted/50 border-0 text-base min-h-[120px]"
              rows={5}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.client || !formData.email || loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Factuur Aanmaken
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
