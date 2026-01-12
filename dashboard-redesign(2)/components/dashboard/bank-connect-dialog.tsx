"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Building2, CheckCircle, Loader2, Shield, ArrowRight } from "lucide-react"

interface BankConnectDialogProps {
  children: React.ReactNode
}

const banks = [
  { id: "ing", name: "ING", color: "bg-orange-500", logo: "ING" },
  { id: "abn", name: "ABN AMRO", color: "bg-green-600", logo: "ABN" },
  { id: "rabo", name: "Rabobank", color: "bg-blue-600", logo: "RABO" },
  { id: "sns", name: "SNS Bank", color: "bg-purple-600", logo: "SNS" },
  { id: "bunq", name: "bunq", color: "bg-pink-500", logo: "bunq" },
  { id: "knab", name: "Knab", color: "bg-cyan-500", logo: "Knab" },
]

export function BankConnectDialog({ children }: BankConnectDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = async () => {
    if (!selectedBank) return
    setIsConnecting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnecting(false)
    setIsConnected(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedBank(null)
    setIsConnecting(false)
    setIsConnected(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Bank Koppelen
          </DialogTitle>
          <DialogDescription>Verbind je bankrekening voor automatische import</DialogDescription>
        </DialogHeader>

        {isConnected ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">Succesvol gekoppeld!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Je {banks.find((b) => b.id === selectedBank)?.name} rekening is nu gekoppeld
              </p>
            </div>
            <Button onClick={handleClose} className="mt-4">
              Sluiten
            </Button>
          </div>
        ) : (
          <>
            <div className="py-4">
              <div className="grid grid-cols-3 gap-3">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedBank === bank.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-muted/30"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${bank.color} flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-white font-bold text-xs">{bank.logo}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground text-center">{bank.name}</p>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-6 p-3 rounded-lg bg-muted/50">
                <Shield className="w-5 h-5 text-emerald-500" />
                <p className="text-sm text-muted-foreground">
                  Veilige verbinding via PSD2. Wij hebben geen toegang tot je inloggegevens.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Annuleren
              </Button>
              <Button onClick={handleConnect} disabled={!selectedBank || isConnecting} className="gap-2">
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verbinden...
                  </>
                ) : (
                  <>
                    Koppelen
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
