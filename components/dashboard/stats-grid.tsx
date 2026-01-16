"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Euro, FileWarning, Users, Percent, Bell, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getDashboardStats } from "@/lib/firestore"
import type { DashboardStats } from "@/types"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export function StatsGrid() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [reminding, setReminding] = useState(false)

  useEffect(() => {
    if (!user?.uid) return
    
    const loadStats = async () => {
      try {
        const data = await getDashboardStats(user.uid)
        setStats(data)
      } catch (error) {
        console.error('Error loading stats:', error)
        toast.error('Fout bij laden statistieken')
      } finally {
        setLoading(false)
      }
    }
    
    loadStats()
  }, [user?.uid])

  const handleSendReminders = async () => {
    if (!user?.uid) return
    
    setReminding(true)
    try {
      const response = await fetch('/api/reminders/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        toast.success(`${result.reminded} herinnering${result.reminded !== 1 ? 'en' : ''} verstuurd`)
        // Refresh stats to update counts
        const freshStats = await getDashboardStats(user.uid)
        setStats(freshStats)
      } else {
        toast.error(result.error || 'Fout bij versturen herinneringen')
      }
    } catch (error) {
      console.error('Error sending reminders:', error)
      toast.error('Fout bij versturen herinneringen')
    } finally {
      setReminding(false)
    }
  }

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-5 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted" />
              <div className="w-12 h-5 rounded-full bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-muted" />
              <div className="h-6 w-24 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      icon: Euro,
      label: "Totale Omzet",
      value: `€${stats.totalRevenue.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}`,
      change: "+12%",
      positive: true,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      icon: FileWarning,
      label: "Openstaande Facturen",
      value: `€${stats.openInvoices.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}`,
      change: "-5%",
      positive: true,
      color: "text-accent",
      bgColor: "bg-accent/20",
      overdueCount: stats.overdueCount,
      dueTodayCount: stats.dueTodayCount,
    },
    {
      icon: Users,
      label: "Nieuwe Klanten",
      value: stats.totalClients.toString(),
      change: "+4",
      positive: true,
      color: "text-chart-3",
      bgColor: "bg-chart-3/20",
    },
    {
      icon: Percent,
      label: "BTW te betalen",
      value: `€${(stats.openInvoices * 0.21).toLocaleString('nl-NL', { minimumFractionDigits: 2 })}`,
      change: "+8%",
      positive: false,
      color: "text-chart-4",
      bgColor: "bg-chart-4/20",
      dueInDays: stats.dueInDays,
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="glass-card rounded-xl p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              "bg-muted group-hover:bg-primary/10"
            )}>
              <stat.icon className={cn("w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors")} />
            </div>
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border",
                stat.positive
                  ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10"
                  : "text-red-500 border-red-500/20 bg-red-500/10",
              )}
            >
              {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </div>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium">{stat.label}</p>
          <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</p>

          {/* Time-sensitive badges */}
          {stat.label === "Openstaande Facturen" && (
            <div className="mt-3 space-y-2">
              {(stat.overdueCount || stat.dueTodayCount) && (
                <div className="flex flex-wrap gap-1">
                  {stat.overdueCount > 0 && <TimeBadge type="overdue" count={stat.overdueCount} />}
                  {stat.dueTodayCount > 0 && <TimeBadge type="today" count={stat.dueTodayCount} />}
                </div>
              )}
              {/* Inline action */}
              <Button
                size="sm"
                variant="outline"
                onClick={handleSendReminders}
                disabled={reminding || (stat.overdueCount === 0 && stat.dueTodayCount === 0)}
                className="w-full h-8 text-xs border-dashed border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                <Bell className="w-3 h-3 mr-1" />
                {reminding ? "Bezig..." : "Herinneringen sturen"}
              </Button>
            </div>
          )}

          {stat.label === "BTW te betalen" && stat.dueInDays && (
            <div className="mt-3">
              <TimeBadge type="due" count={1} days={stat.dueInDays} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function TimeBadge({ type, count, days }: { type: 'overdue' | 'today' | 'soon' | 'due'; count: number; days?: number }) {
  const variants = {
    overdue: { icon: AlertCircle, label: 'Te laat', color: 'text-red-500 border-red-500/20 bg-red-500/10' },
    today: { icon: Clock, label: 'Vandaag', color: 'text-orange-500 border-orange-500/20 bg-orange-500/10' },
    soon: { icon: Clock, label: `Over ${days} dagen`, color: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10' },
    due: { icon: Clock, label: `Over ${days} dagen`, color: 'text-blue-500 border-blue-500/20 bg-blue-500/10' },
  }
  const { icon: Icon, label, color } = variants[type]
  
  return (
    <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border", color)}>
      <Icon className="w-3 h-3" />
      {count} {label}
    </div>
  )
}
