"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: ProjectData) => void
}

interface ProjectData {
  naam: string
  klant: string
  beschrijving: string
  budget: string
  deadline: string
  status: string
}

export function NewProjectDialog({ open, onOpenChange, onSubmit }: NewProjectDialogProps) {
  const [formData, setFormData] = useState<ProjectData>({
    naam: "",
    klant: "",
    beschrijving: "",
    budget: "",
    deadline: "",
    status: "wachtend",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
    onOpenChange(false)
    setFormData({
      naam: "",
      klant: "",
      beschrijving: "",
      budget: "",
      deadline: "",
      status: "wachtend",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nieuw Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="naam">Projectnaam</Label>
            <Input
              id="naam"
              value={formData.naam}
              onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
              className="bg-muted/50 border-0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="klant">Klant</Label>
            <Select value={formData.klant} onValueChange={(value) => setFormData({ ...formData, klant: value })}>
              <SelectTrigger className="bg-muted/50 border-0">
                <SelectValue placeholder="Selecteer klant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abc">ABC Corporation</SelectItem>
                <SelectItem value="xyz">XYZ Tech Solutions</SelectItem>
                <SelectItem value="global">Global Industries</SelectItem>
                <SelectItem value="startup">StartUp Hub</SelectItem>
                <SelectItem value="digital">Digital Agency Plus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="beschrijving">Beschrijving</Label>
            <Textarea
              id="beschrijving"
              value={formData.beschrijving}
              onChange={(e) => setFormData({ ...formData, beschrijving: e.target.value })}
              className="bg-muted/50 border-0 min-h-[80px]"
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
                <SelectItem value="wachtend">In Afwachting</SelectItem>
                <SelectItem value="actief">Actief</SelectItem>
                <SelectItem value="afgerond">Afgerond</SelectItem>
              </SelectContent>
            </Select>
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
