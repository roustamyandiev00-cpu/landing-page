"use client"

import { PageHeader } from "./page-header"
import { LayoutDashboard } from "lucide-react"
import { WelcomeBanner } from "./welcome-banner"
import { QuickActions } from "./quick-actions"
import { StatsGrid } from "./stats-grid"
import { AiInsights } from "./ai-insights"
import { PerformanceChart } from "./performance-chart"
import { RecentTransactions } from "./recent-transactions"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overzicht van je bedrijf, acties en recente activiteit"
        icon={LayoutDashboard}
      />

      <WelcomeBanner />

      <QuickActions />

      <StatsGrid />

      <AiInsights />

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
