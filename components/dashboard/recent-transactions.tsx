"use client"

import { ArrowUpRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const transactions = [
  {
    id: 1,
    name: "Adobe Creative Cloud",
    category: "Software",
    amount: -54.99,
    date: "Vandaag",
    icon: "🎨",
  },
  {
    id: 2,
    name: "Klant: Tech Solutions BV",
    category: "Factuur betaald",
    amount: 2450.0,
    date: "Gisteren",
    icon: "💼",
  },
  {
    id: 3,
    name: "Google Workspace",
    category: "Software",
    amount: -12.0,
    date: "2 dagen geleden",
    icon: "☁️",
  },
  {
    id: 4,
    name: "Klant: Design Studio",
    category: "Factuur betaald",
    amount: 890.0,
    date: "3 dagen geleden",
    icon: "🎯",
  },
]

export function RecentTransactions() {
  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recente Transacties</h3>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <ArrowUpRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg">
              {transaction.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{transaction.name}</p>
              <p className="text-xs text-muted-foreground">{transaction.category}</p>
            </div>
            <div className="text-right">
              <p className={cn("text-sm font-semibold", transaction.amount > 0 ? "text-success" : "text-foreground")}>
                {transaction.amount > 0 ? "+" : ""}€
                {Math.abs(transaction.amount).toLocaleString("nl-NL", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <Button
        variant="outline"
        className="w-full mt-4 border-dashed border-border bg-transparent hover:bg-secondary/50 text-muted-foreground"
      >
        <Plus className="w-4 h-4 mr-2" />
        Upload Bestanden
      </Button>
    </div>
  )
}
