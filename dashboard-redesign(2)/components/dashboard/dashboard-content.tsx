"use client"

import { WelcomeBanner } from "./welcome-banner"
import { QuickActions } from "./quick-actions"
import { StatsGrid } from "./stats-grid"
import { AiInsights } from "./ai-insights"
import { PerformanceChart } from "./performance-chart"
import { RecentTransactions } from "./recent-transactions"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Grid */}
      <StatsGrid />

      {/* AI Insights Section */}
      <AiInsights />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <PerformanceChart />
        </div>
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}
