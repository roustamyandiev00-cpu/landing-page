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
  { month: "Jul", omzet: 18500, kosten: 12000 },
  { month: "Aug", omzet: 22000, kosten: 13500 },
  { month: "Sep", omzet: 19800, kosten: 11800 },
  { month: "Okt", omzet: 25600, kosten: 14200 },
  { month: "Nov", omzet: 28400, kosten: 15800 },
  { month: "Dec", omzet: 32100, kosten: 16500 },
]

const categoryData = [
  { name: "Consultancy", value: 45, color: "#0ea5e9" },
  { name: "Development", value: 30, color: "#22c55e" },
  { name: "Design", value: 15, color: "#f59e0b" },
  { name: "Support", value: 10, color: "#8b5cf6" },
]

const clientData = [
  { name: "ABC Corp", revenue: 28500 },
  { name: "XYZ Tech", revenue: 22000 },
  { name: "Global Ind.", revenue: 18500 },
  { name: "StartUp Hub", revenue: 15200 },
  { name: "Digital Plus", revenue: 12800 },
]

const kpiCards = [
  {
    title: "Maandelijkse Omzet",
    value: "€32.100",
    change: "+18.5%",
    trend: "up",
    icon: Euro,
    description: "vs vorige maand",
  },
  {
    title: "Winstmarge",
    value: "48.6%",
    change: "+2.3%",
    trend: "up",
    icon: TrendingUp,
    description: "vs vorige maand",
  },
  {
    title: "Actieve Klanten",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Users,
    description: "nieuwe deze maand",
  },
  {
    title: "Gem. Factuurwaarde",
    value: "€2.450",
    change: "-5%",
    trend: "down",
    icon: FileText,
    description: "vs vorige maand",
  },
]

const aiInsights = [
  {
    type: "opportunity",
    title: "Groeipotentieel gedetecteerd",
    description:
      "Je consultancy diensten groeien 25% sneller dan andere categorieën. Overweeg om hier meer op in te zetten.",
  },
  {
    type: "warning",
    title: "Cashflow aandachtspunt",
    description: "Op basis van openstaande facturen en geplande uitgaven, kan je cashflow in februari krap worden.",
  },
  {
    type: "tip",
    title: "Klantretentie tip",
    description: "3 klanten hebben al 6 maanden geen nieuwe opdracht geplaatst. Een follow-up kan helpen.",
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
