"use client"

import type React from "react"

import { useState, useRef } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, Loader2, CheckCircle, Receipt, X } from "lucide-react"

interface BonScannerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: BonData) => void
}

interface BonData {
  vendor: string
  amount: number
  btw: number
  category: string
  date: string
  description: string
}

export function BonScannerDialog({ open, onOpenChange, onSubmit }: BonScannerDialogProps) {
  const [step, setStep] = useState<"upload" | "scanning" | "review">("upload")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<BonData>({
    vendor: "",
    amount: 0,
    btw: 0,
    category: "kantoor",
    date: new Date().toISOString().split("T")[0],
    description: "",
  })

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setStep("scanning")

    // Simulate OCR scanning
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock scanned data
    setFormData({
      vendor: "Albert Heijn",
      amount: 45.67,
      btw: 9.59,
      category: "kantoor",
      date: new Date().toISOString().split("T")[0],
      description: "Kantoorbenodigdheden",
    })

    setStep("review")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file)
    }
  }

  const handleSubmit = () => {
    onSubmit?.(formData)
    handleClose()
  }

  const handleClose = () => {
    setStep("upload")
    setSelectedFile(null)
    setPreviewUrl(null)
    setFormData({
      vendor: "",
      amount: 0,
      btw: 0,
      category: "kantoor",
      date: new Date().toISOString().split("T")[0],
      description: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Bon Scannen
          </DialogTitle>
          <DialogDescription>Upload een foto van je bon en we halen automatisch de gegevens eruit</DialogDescription>
        </DialogHeader>

        {step === "upload" && (
          <div className="py-4">
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileSelect(file)
                }}
              />
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <p className="font-medium mb-1">Sleep je bon hierheen</p>
              <p className="text-sm text-muted-foreground mb-4">of klik om een bestand te selecteren</p>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Selecteer Bestand
              </Button>
            </div>
          </div>
        )}

        {step === "scanning" && (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              {previewUrl && (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Bon preview"
                  className="w-32 h-40 object-cover rounded-lg opacity-50"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium">Bon wordt gescand...</p>
              <p className="text-sm text-muted-foreground mt-1">We halen de gegevens automatisch uit je bon</p>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-emerald-500 mb-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Bon succesvol gescand!</span>
            </div>

            {previewUrl && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4">
                <img src={previewUrl || "/placeholder.svg"} alt="Bon preview" className="w-full h-full object-cover" />
                <button
                  onClick={() => {
                    setPreviewUrl(null)
                    setSelectedFile(null)
                    setStep("upload")
                  }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">Leverancier</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Bedrag (incl. BTW)</Label>
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
                    <SelectItem value="overig">Overig</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Omschrijving</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Annuleren
          </Button>
          {step === "review" && (
            <Button onClick={handleSubmit}>
              <Receipt className="w-4 h-4 mr-2" />
              Uitgave Opslaan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
