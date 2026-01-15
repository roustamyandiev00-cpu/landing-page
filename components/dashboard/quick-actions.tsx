"use client"

import { useState } from "react"
import { Sparkles, FileText, Camera, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewFactuurDialog } from "./new-factuur-dialog"
import { NewOfferteDialog } from "./new-offerte-dialog"
import { BonScannerDialog } from "./bon-scanner-dialog"
import { NewUitgaveDialog } from "./new-uitgave-dialog"

export function QuickActions() {
  const [factuurOpen, setFactuurOpen] = useState(false)
  const [offerteOpen, setOfferteOpen] = useState(false)
  const [bonScannerOpen, setBonScannerOpen] = useState(false)
  const [uitgaveOpen, setUitgaveOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setFactuurOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Nieuwe Factuur (AI)
        </Button>
        <Button
          onClick={() => setOfferteOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
          <FileText className="w-4 h-4" />
          Nieuwe Offerte (AI)
        </Button>
        <Button
          onClick={() => setBonScannerOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
        >
          <Camera className="w-4 h-4" />
          Bon Scannen
        </Button>
        <Button
          onClick={() => setUitgaveOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
        >
          <CreditCard className="w-4 h-4" />
          Uitgave
        </Button>
      </div>

      <NewFactuurDialog
        open={factuurOpen}
        onOpenChange={setFactuurOpen}
        onSubmit={() => setFactuurOpen(false)}
      />
      <NewOfferteDialog
        open={offerteOpen}
        onOpenChange={setOfferteOpen}
        onSubmit={() => setOfferteOpen(false)}
      />
      <BonScannerDialog
        open={bonScannerOpen}
        onOpenChange={setBonScannerOpen}
        onSubmit={() => setBonScannerOpen(false)}
      />
      <NewUitgaveDialog
        open={uitgaveOpen}
        onOpenChange={setUitgaveOpen}
        onSubmit={() => setUitgaveOpen(false)}
      />
    </>
  )
}
