"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Euro, Users, FileText, ArrowRight, Sparkles, Target } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

const revenueData = [
  { month: "Jul", omzet: 0, kosten: 0 },
  { month: "Aug", omzet: 0, kosten: 0 },
  { month: "Sep", omzet: 0, kosten: 0 },
  { month: "Okt", omzet: 0, kosten: 0 },
  { month: "Nov", omzet: 0, kosten: 0 },
  { month: "Dec", omzet: 0, kosten: 0 },
]

const categoryData: { name: string; value: number; color: string }[] = []

const clientData: { name: string; revenue: number }[] = []

const kpiCards = [
  {
    title: "Maandelijkse Omzet",
    value: "€0",
    change: "-",
    trend: "up",
    icon: Euro,
    description: "vs vorige maand",
  },
  {
    title: "Winstmarge",
    value: "0%",
    change: "-",
    trend: "up",
    icon: TrendingUp,
    description: "vs vorige maand",
  },
  {
    title: "Actieve Klanten",
    value: "0",
    change: "-",
    trend: "up",
    icon: Users,
    description: "nieuwe deze maand",
  },
  {
    title: "Gem. Factuurwaarde",
    value: "€0",
    change: "-",
    trend: "up",
    icon: FileText,
    description: "vs vorige maand",
  },
]

const aiInsights = [
  {
    type: "tip",
    title: "Welkom bij Inzichten",
    description:
      "Begin met het toevoegen van klanten en facturen om hier waardevolle inzichten te zien over je bedrijfsprestaties.",
  },
]

export default function InzichtenPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Inzichten" description="Analyseer je bedrijfsprestaties" icon={TrendingUp} />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => (
            <Card key={kpi.title} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <kpi.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div
                    className={`flex items-center gap-1 ${kpi.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {kpi.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="text-sm font-medium">{kpi.change}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        <Card className="glass-card border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle>AI Inzichten</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${
                    insight.type === "opportunity"
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : insight.type === "warning"
                        ? "bg-amber-500/10 border border-amber-500/20"
                        : "bg-blue-500/10 border border-blue-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === "opportunity" && <Target className="w-4 h-4 text-emerald-500" />}
                    {insight.type === "warning" && <TrendingDown className="w-4 h-4 text-amber-500" />}
                    {insight.type === "tip" && <Sparkles className="w-4 h-4 text-blue-500" />}
                    <span
                      className={`text-sm font-medium ${
                        insight.type === "opportunity"
                          ? "text-emerald-500"
                          : insight.type === "warning"
                            ? "text-amber-500"
                            : "text-blue-500"
                      }`}
                    >
                      {insight.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Omzet vs Kosten</CardTitle>
                <Tabs defaultValue="6m">
                  <TabsList>
                    <TabsTrigger value="3m">3M</TabsTrigger>
                    <TabsTrigger value="6m">6M</TabsTrigger>
                    <TabsTrigger value="1y">1J</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="omzetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="kostenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `€${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`€${value.toLocaleString()}`, ""]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="omzet"
                      stroke="#0ea5e9"
                      fill="url(#omzetGradient)"
                      strokeWidth={2}
                      name="Omzet"
                    />
                    <Area
                      type="monotone"
                      dataKey="kosten"
                      stroke="#f43f5e"
                      fill="url(#kostenGradient)"
                      strokeWidth={2}
                      name="Kosten"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Omzet per Categorie</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryData.length === 0 ? (
                <div className="text-center py-12">
                  <TrendingUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Nog geen data beschikbaar</p>
                </div>
              ) : (
              <>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-sm text-muted-foreground">{category.name}</span>
                    <span className="text-sm font-medium text-foreground ml-auto">{category.value}%</span>
                  </div>
                ))}
              </div>
              </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Clients */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top 5 Klanten</CardTitle>
              <Button variant="outline" size="sm">
                Alle Klanten <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {clientData.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Nog geen klanten toegevoegd</p>
              </div>
            ) : (
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientData} layout="vertical">
                  <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(v) => `€${v / 1000}k`} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, "Omzet"]}
                  />
                  <Bar dataKey="revenue" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
