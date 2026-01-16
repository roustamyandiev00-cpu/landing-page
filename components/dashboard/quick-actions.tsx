"use client"

import { useState } from "react"
import { Sparkles, FileText, Camera, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewFactuurDialog } from "./new-factuur-dialog"
import { AIOfferteDialog as NewOfferteDialog } from "./ai-offerte-dialog"
import { BonScannerDialog } from "./bon-scanner-dialog"
import { NewUitgaveDialog } from "./new-uitgave-dialog"

export function QuickActions() {
  const [factuurOpen, setFactuurOpen] = useState(false)
  const [offerteOpen, setOfferteOpen] = useState(false)
  const [bonScannerOpen, setBonScannerOpen] = useState(false)
  const [uitgaveOpen, setUitgaveOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {/* Primary CTA */}
        <Button
          onClick={() => setFactuurOpen(true)}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-6 shadow-md hover:shadow-lg transition-all"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Nieuwe Factuur (AI)
        </Button>

        {/* Secondary Actions */}
        <Button
          onClick={() => setOfferteOpen(true)}
          variant="outline"
          className="w-full sm:w-auto border-primary/20 hover:border-primary hover:bg-primary/5 h-11"
        >
          <FileText className="w-4 h-4 mr-2" />
          Nieuwe Offerte
        </Button>

        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <Button
            onClick={() => setUitgaveOpen(true)}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted"
            title="Nieuwe Uitgave"
          >
            <CreditCard className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setBonScannerOpen(true)}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-muted"
            title="Bon Scannen"
          >
            <Camera className="w-5 h-5" />
          </Button>
        </div>
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
