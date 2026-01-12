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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2 } from "lucide-react"

interface BankConnectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BankConnectDialog({ open, onOpenChange }: BankConnectDialogProps) {
  const [bank, setBank] = useState<string>("")

  const handleConnect = () => {
    // Simulate connection logic
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Koppel Bankrekening
          </DialogTitle>
          <DialogDescription>Selecteer je bank om een beveiligde verbinding te maken.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bank">Kies je bank</Label>
            <Select onValueChange={setBank} value={bank}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ing">ING</SelectItem>
                <SelectItem value="rabobank">Rabobank</SelectItem>
                <SelectItem value="abn">ABN AMRO</SelectItem>
                <SelectItem value="bunq">Bunq</SelectItem>
                <SelectItem value="knab">Knab</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleConnect} disabled={!bank}>
            Verbinden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
