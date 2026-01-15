"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Camera, Upload, Scan } from "lucide-react"

interface BonScannerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: () => void
}

export function BonScannerDialog({ open, onOpenChange, onSubmit }: BonScannerDialogProps) {
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    setScanning(true)
    // TODO: Implement receipt scanning with AI
    setTimeout(() => {
      setScanning(false)
      onSubmit?.()
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Bon Scannen
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {!scanning ? (
            <>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Scan className="w-12 h-12 text-primary" />
                </div>
                <p className="text-muted-foreground">Upload een foto van je bon om automatisch de gegevens te extraheren</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Camera className="w-6 h-6" />
                  Camera
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Upload className="w-6 h-6" />
                  Upload
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-foreground font-medium">Bon wordt gescand...</p>
              <p className="text-sm text-muted-foreground">AI extraheert de gegevens</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          {!scanning && (
            <Button onClick={handleScan} className="bg-primary hover:bg-primary/90">
              <Scan className="w-4 h-4 mr-2" />
              Scan Starten
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}