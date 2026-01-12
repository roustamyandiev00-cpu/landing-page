"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiInsights() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Slimme Inzichten</h3>
      </div>
      <Button variant="outline" size="sm" className="text-xs border-border bg-secondary/50 hover:bg-secondary">
        Realtime Analyse
      </Button>
    </div>
  )
}
