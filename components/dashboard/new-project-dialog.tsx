"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FolderKanban, Save } from "lucide-react"

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: () => void
}

export function NewProjectDialog({ open, onOpenChange, onSubmit }: NewProjectDialogProps) {
  const [formData, setFormData] = useState({
    naam: "",
    klant: "",
    beschrijving: "",
    budget: "",
    deadline: "",
    status: "actief",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save to Firestore
    onSubmit?.()
    onOpenChange(false)
    setFormData({
      naam: "",
      klant: "",
      beschrijving: "",
      budget: "",
      deadline: "",
      status: "actief",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-primary" />
            Nieuw Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="naam">Projectnaam *</Label>
            <Input
              id="naam"
              value={formData.naam}
              onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
              className="bg-muted/50 border-0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="klant">Klant *</Label>
            <Input
              id="klant"
              value={formData.klant}
              onChange={(e) => setFormData({ ...formData, klant: e.target.value })}
              className="bg-muted/50 border-0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="beschrijving">Beschrijving</Label>
            <Textarea
              id="beschrijving"
              value={formData.beschrijving}
              onChange={(e) => setFormData({ ...formData, beschrijving: e.target.value })}
              className="bg-muted/50 border-0"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (€)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="bg-muted/50 border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="bg-muted/50 border-0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-muted/50 border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actief">Actief</SelectItem>
                <SelectItem value="wachtend">In Afwachting</SelectItem>
                <SelectItem value="afgerond">Afgerond</SelectItem>
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
