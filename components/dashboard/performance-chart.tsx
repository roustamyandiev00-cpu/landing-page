"use client"

import { useState } from "react"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { month: "Jan", inkomsten: 4200, uitgaven: 2400 },
  { month: "Feb", inkomsten: 3800, uitgaven: 1398 },
  { month: "Mar", inkomsten: 6200, uitgaven: 4800 },
  { month: "Apr", inkomsten: 5080, uitgaven: 3908 },
  { month: "May", inkomsten: 7890, uitgaven: 4800 },
  { month: "Jun", inkomsten: 8390, uitgaven: 3800 },
]

export function PerformanceChart() {
  const [period, setPeriod] = useState<"month" | "year">("month")

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Prestaties</h3>
          <p className="text-sm text-muted-foreground">Cashflow trends afgelopen 6 maanden</p>
        </div>
        <div className="flex gap-1 p-1 bg-secondary/50 rounded-lg">
          <button
            onClick={() => setPeriod("month")}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md transition-all",
              period === "month"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Maand
          </button>
          <button
            onClick={() => setPeriod("year")}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md transition-all",
              period === "year"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Jaar
          </button>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="inkomstenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5B8DEF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#5B8DEF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="uitgavenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34D399" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(value) => `€${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(22, 22, 30, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "#fff", fontWeight: 600 }}
              itemStyle={{ color: "#9CA3AF" }}
              formatter={(value: number) => [`€${value.toLocaleString("nl-NL")}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="inkomsten"
              stroke="#5B8DEF"
              strokeWidth={2}
              fill="url(#inkomstenGradient)"
              name="Inkomsten"
            />
            <Area
              type="monotone"
              dataKey="uitgaven"
              stroke="#34D399"
              strokeWidth={2}
              fill="url(#uitgavenGradient)"
              strokeDasharray="5 5"
              name="Uitgaven"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Inkomsten</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Uitgaven</span>
        </div>
      </div>
    </div>
  )
}
