"use client"

import { ArrowUpRight, Plus, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface Transaction {
  id: number
  name: string
  category: string
  amount: number
  date: string
  icon: string
}

export function RecentTransactions() {
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      name: "Bouwmaat Amsterdam",
      category: "Materialen",
      amount: -450.50,
      date: "Vandaag, 10:23",
      icon: "🏗️",
    },
    {
      id: 2,
      name: "Fam. Jansen",
      category: "Betaling Factuur #2024-001",
      amount: 2500.00,
      date: "Gisteren, 14:45",
      icon: "💰",
    },
    {
      id: 3,
      name: "Shell Station",
      category: "Brandstof",
      amount: -85.20,
      date: "13 jan, 09:15",
      icon: "⛽",
    },
    {
      id: 4,
      name: "Gamma Bouwmarkt",
      category: "Gereedschap",
      amount: -129.95,
      date: "12 jan, 16:30",
      icon: "🔧",
    },
    {
      id: 5,
      name: "Fam. de Vries",
      category: "Aanbetaling Project",
      amount: 1500.00,
      date: "10 jan, 11:00",
      icon: "🏠",
    },
  ])

  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recente Transacties</h3>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <ArrowUpRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Receipt className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Nog geen transacties</p>
          </div>
        ) : (
          transactions.map((transaction) => (
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
          ))
        )}
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
