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
import { Badge } from "@/components/ui/badge"
import { Loader2, Euro, Percent, Ruler } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { customizeWerkzaamheid, updateUserWerkzaamheid } from "@/lib/firestore"
import type { Werkzaamheid } from "@/lib/werkzaamheden-data"
import type { UserWerkzaamheid } from "@/lib/firestore"

interface WerkzaamheidEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  werkzaamheid: Werkzaamheid | UserWerkzaamheid
  onSave?: () => void
}

const eenheidOptions = [
  { value: "stuk", label: "Per stuk" },
  { value: "m2", label: "Per m²" },
  { value: "m", label: "Per lopende meter" },
  { value: "uur", label: "Per uur" },
  { value: "dag", label: "Per dag" },
  { value: "forfait", label: "Vaste prijs (forfait)" },
]

const btwOptions = [
  { value: 9, label: "9% BTW (verlaagd tarief)" },
  { value: 21, label: "21% BTW (hoog tarief)" },
]

export function WerkzaamheidEditDialog({
  open,
  onOpenChange,
  werkzaamheid,
  onSave
}: WerkzaamheidEditDialogProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    standaardPrijs: werkzaamheid.standaardPrijs,
    prijsMin: werkzaamheid.prijsMin,
    prijsMax: werkzaamheid.prijsMax,
    btwTarief: werkzaamheid.btwTarief,
    eenheid: werkzaamheid.eenheid,
  })

  const isCustomWerkzaamheid = 'isCustom' in werkzaamheid && werkzaamheid.isCustom

  const handleSave = async () => {
    if (!user) return

    setLoading(true)
    try {
      if (isCustomWerkzaamheid) {
        // Update existing custom werkzaamheid
        await updateUserWerkzaamheid(werkzaamheid.id!, formData)
        toast.success("Werkzaamheid bijgewerkt")
      } else {
        // Create new custom werkzaamheid based on standard one
        await customizeWerkzaamheid(user.uid, werkzaamheid, formData)
        toast.success("Aangepaste werkzaamheid opgeslagen")
      }
      
      onSave?.()
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving werkzaamheid:", error)
      toast.error("Fout bij opslaan")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Euro className="w-5 h-5" />
            Prijzen aanpassen
          </DialogTitle>
          <DialogDescription>
            Pas de prijzen en instellingen aan voor &quot;{werkzaamheid.naam}&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Werkzaamheid Info */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium text-sm text-muted-foreground mb-1">
              {werkzaamheid.naam}
            </h3>
            <p className="text-sm text-muted-foreground">
              {werkzaamheid.omschrijving}
            </p>
            {isCustomWerkzaamheid && (
              <Badge variant="secondary" className="mt-2">
                Aangepast
              </Badge>
            )}
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Euro className="w-4 h-4" />
              <Label className="text-base font-medium">Prijzen</Label>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="prijsMin" className="text-sm">Min. prijs</Label>
                <Input
                  id="prijsMin"
                  type="number"
                  step="0.01"
                  value={formData.prijsMin}
                  onChange={(e) => handleInputChange('prijsMin', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="standaardPrijs" className="text-sm">Standaard</Label>
                <Input
                  id="standaardPrijs"
                  type="number"
                  step="0.01"
                  value={formData.standaardPrijs}
                  onChange={(e) => handleInputChange('standaardPrijs', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="prijsMax" className="text-sm">Max. prijs</Label>
                <Input
                  id="prijsMax"
                  type="number"
                  step="0.01"
                  value={formData.prijsMax}
                  onChange={(e) => handleInputChange('prijsMax', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Unit Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              <Label className="text-base font-medium">Eenheid</Label>
            </div>
            <Select
              value={formData.eenheid}
              onValueChange={(value) => handleInputChange('eenheid', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eenheidOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* VAT Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              <Label className="text-base font-medium">BTW Tarief</Label>
            </div>
            <Select
              value={formData.btwTarief.toString()}
              onValueChange={(value) => handleInputChange('btwTarief', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {btwOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          <div className="p-4 bg-muted/20 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Voorbeeld</h4>
            <div className="flex justify-between items-center text-sm">
              <span>Standaard prijs:</span>
              <span className="font-medium">
                €{formData.standaardPrijs.toFixed(2)} {eenheidOptions.find(e => e.value === formData.eenheid)?.label.toLowerCase()}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span>Inclusief BTW:</span>
              <span className="font-medium">
                €{(formData.standaardPrijs * (1 + formData.btwTarief / 100)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isCustomWerkzaamheid ? "Bijwerken" : "Opslaan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}