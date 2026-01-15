"use client"

import { useState } from "react"
import { Sparkles, FileText, Camera, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewFactuurDialog } from "./new-factuur-dialog"
import { AIOfferteDialogV2 as NewOfferteDialog } from "./ai-offerte-dialog-v2"
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
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Nieuwe Factuur (AI)
        </Button>
        <Button
          onClick={() => setOfferteOpen(true)}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <FileText className="w-4 h-4" />
          Nieuwe Offerte (AI)
        </Button>
        <Button
          onClick={() => setUitgaveOpen(true)}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <CreditCard className="w-4 h-4" />
          Nieuwe Uitgave
        </Button>
        <Button
          onClick={() => setBonScannerOpen(true)}
          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <Camera className="w-4 h-4" />
          Bon Scannen
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
