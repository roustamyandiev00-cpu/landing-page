"use client"

import { TrendingUp, TrendingDown, Euro, FileWarning, Users, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    icon: Euro,
    label: "Totale Omzet",
    value: "€24.580,00",
    change: "+12.5%",
    positive: true,
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    icon: FileWarning,
    label: "Openstaande Facturen",
    value: "€3.250,00",
    change: "-5.2%",
    positive: false,
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
  {
    icon: Users,
    label: "Nieuwe Klanten",
    value: "12",
    change: "+8.1%",
    positive: true,
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
  },
  {
    icon: Percent,
    label: "BTW te betalen (Q2)",
    value: "€1.840,00",
    change: "+2.4%",
    positive: true,
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bgColor)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                stat.positive ? "text-success bg-success/20" : "text-destructive bg-destructive/20",
              )}
            >
              {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </div>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
