"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "./page-header"
import { LayoutDashboard } from "lucide-react"
import { WelcomeBanner } from "./welcome-banner"
import { QuickActions } from "./quick-actions"
import { StatsGrid } from "./stats-grid"
import { AiInsights } from "./ai-insights"
import { PerformanceChart } from "./performance-chart"
import { RecentTransactions } from "./recent-transactions"
import { SkeletonCard, SkeletonChart, SkeletonTransaction } from "./skeletons"
import { AIActionLog } from "./ai-action-log"

export function DashboardContent() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading for demo - in real app, this would be based on actual data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overzicht van je bedrijf, acties en recente activiteit"
        icon={LayoutDashboard}
      />

      <WelcomeBanner />

      <QuickActions />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <StatsGrid />
      )}

      {isLoading ? (
        <div className="glass-card rounded-2xl p-6">
          <div className="h-6 w-32 rounded bg-muted animate-pulse mb-4" />
          <div className="h-20 w-full rounded bg-muted animate-pulse" />
        </div>
      ) : (
        <>
          <AiInsights />
          <div className="mt-4">
            <AIActionLog />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          {isLoading ? <SkeletonChart /> : <PerformanceChart />}
        </div>
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 w-32 rounded bg-muted animate-pulse" />
                <div className="w-8 h-8 rounded bg-muted animate-pulse" />
              </div>
              <div className="flex-1 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <SkeletonTransaction key={i} />
                ))}
              </div>
            </div>
          ) : (
            <RecentTransactions />
          )}
        </div>
      </div>
    </div>
  )
}
