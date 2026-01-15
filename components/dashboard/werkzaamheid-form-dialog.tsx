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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Edit, Euro, Percent, Ruler, Tag, FileText } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { addUserWerkzaamheid, updateUserWerkzaamheid } from "@/lib/firestore"
import { categorieën } from "@/lib/werkzaamheden-data"
import type { UserWerkzaamheid } from "@/lib/firestore"

interface WerkzaamheidFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  werkzaamheid?: UserWerkzaamheid | null
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

export function WerkzaamheidFormDialog({
  open,
  onOpenChange,
  werkzaamheid,
  onSave
}: WerkzaamheidFormDialogProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  
  const [formData, setFormData] = useState({
    naam: "",
    omschrijving: "",
    categorie: "",
    standaardPrijs: 0,
    prijsMin: 0,
    prijsMax: 0,
    btwTarief: 21 as 9 | 21,
    eenheid: "stuk" as const,
  })

  const isEditing = !!werkzaamheid

  useEffect(() => {
    if (werkzaamheid) {
      setFormData({
        naam: werkzaamheid.naam,
        omschrijving: werkzaamheid.omschrijving,
        categorie: werkzaamheid.categorie,
        standaardPrijs: werkzaamheid.standaardPrijs,
        prijsMin: werkzaamheid.prijsMin,
        prijsMax: werkzaamheid.prijsMax,
        btwTarief: werkzaamheid.btwTarief,
        eenheid: werkzaamheid.eenheid,
      })
      setTags(werkzaamheid.tags || [])
    } else {
      // Reset form for new werkzaamheid
      setFormData({
        naam: "",
        omschrijving: "",
        categorie: "",
        standaardPrijs: 0,
        prijsMin: 0,
        prijsMax: 0,
        btwTarief: 21,
        eenheid: "stuk",
      })
      setTags([])
    }
  }, [werkzaamheid, open])

  const handleSave = async () => {
    if (!user) return

    // Validation
    if (!formData.naam.trim()) {
      toast.error("Naam is verplicht")
      return
    }
    if (!formData.omschrijving.trim()) {
      toast.error("Omschrijving is verplicht")
      return
    }
    if (!formData.categorie) {
      toast.error("Categorie is verplicht")
      return
    }
    if (formData.standaardPrijs <= 0) {
      toast.error("Standaard prijs moet groter zijn dan 0")
      return
    }

    setLoading(true)
    try {
      const werkzaamheidData = {
        ...formData,
        userId: user.uid,
        tags,
        isCustom: true,
        originalId: undefined, // This is a completely custom werkzaamheid
      }

      if (isEditing && werkzaamheid?.id) {
        await updateUserWerkzaamheid(werkzaamheid.id, werkzaamheidData)
        toast.success("Werkzaamheid bijgewerkt")
      } else {
        await addUserWerkzaamheid(werkzaamheidData)
        toast.success("Werkzaamheid toegevoegd")
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
      [field]: typeof value === 'string' && field.includes('prijs') ? parseFloat(value) || 0 : value
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isEditing ? "Werkzaamheid bewerken" : "Nieuwe werkzaamheid toevoegen"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Bewerk de details van deze werkzaamheid" : "Voeg een nieuwe werkzaamheid toe aan je bibliotheek"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4" />
              <Label className="text-base font-medium">Algemene informatie</Label>
            </div>
            
            <div>
              <Label htmlFor="naam">Naam *</Label>
              <Input
                id="naam"
                value={formData.naam}
                onChange={(e) => handleInputChange('naam', e.target.value)}
                placeholder="Bijv. Wandtegels plaatsen"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="omschrijving">Omschrijving *</Label>
              <Textarea
                id="omschrijving"
                value={formData.omschrijving}
                onChange={(e) => handleInputChange('omschrijving', e.target.value)}
                placeholder="Beschrijf wat deze werkzaamheid inhoudt..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="categorie">Categorie *</Label>
              <Select
                value={formData.categorie}
                onValueChange={(value) => handleInputChange('categorie', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecteer een categorie" />
                </SelectTrigger>
                <SelectContent>
                  {categorieën.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.naam}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Euro className="w-4 h-4" />
              <Label className="text-base font-medium">Prijzen</Label>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="prijsMin">Min. prijs *</Label>
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
                <Label htmlFor="standaardPrijs">Standaard *</Label>
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
                <Label htmlFor="prijsMax">Max. prijs *</Label>
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

          {/* Unit and VAT */}
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <Label className="text-base font-medium">Tags</Label>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Voeg een tag toe..."
                className="flex-1"
              />
              <Button type="button" onClick={addTag} size="sm">
                Toevoegen
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Preview */}
          {formData.naam && (
            <div className="p-4 bg-muted/20 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Voorbeeld</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Standaard prijs:</span>
                  <span className="font-medium">
                    €{formData.standaardPrijs.toFixed(2)} {eenheidOptions.find(e => e.value === formData.eenheid)?.label.toLowerCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Inclusief BTW:</span>
                  <span className="font-medium">
                    €{(formData.standaardPrijs * (1 + formData.btwTarief / 100)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Prijsrange:</span>
                  <span className="font-medium">
                    €{formData.prijsMin.toFixed(2)} - €{formData.prijsMax.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isEditing ? "Bijwerken" : "Toevoegen"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}