"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  Euro, 
  Users, 
  FileText, 
  Calendar,
  ArrowUp,
  ArrowDown,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

const kpis = [
  { 
    label: "Maandelijkse Omzet", 
    value: "€0", 
    change: "-", 
    trend: "up", 
    icon: Euro, 
    color: "text-emerald-500" 
  },
  { 
    label: "Nieuwe Klanten", 
    value: "0", 
    change: "-", 
    trend: "up", 
    icon: Users, 
    color: "text-blue-500" 
  },
  { 
    label: "Facturen Verzonden", 
    value: "0", 
    change: "-", 
    trend: "up", 
    icon: FileText, 
    color: "text-purple-500" 
  },
  { 
    label: "Gemiddelde Betaaltijd", 
    value: "0 dagen", 
    change: "-", 
    trend: "down", 
    icon: Clock, 
    color: "text-amber-500" 
  }
]

const monthlyData = [
  { month: "Jan", omzet: 0, facturen: 0, klanten: 0 },
  { month: "Feb", omzet: 0, facturen: 0, klanten: 0 },
  { month: "Mrt", omzet: 0, facturen: 0, klanten: 0 },
  { month: "Apr", omzet: 0, facturen: 0, klanten: 0 },
  { month: "Mei", omzet: 0, facturen: 0, klanten: 0 },
  { month: "Jun", omzet: 0, facturen: 0, klanten: 0 }
]

const topClients = []

const recentActivity = []

export default function InzichtenPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Inzichten"
          description="Analyseer je bedrijfsprestaties en trends"
          icon={TrendingUp}
        />

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${kpi.color}`}>
                    <kpi.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {kpi.trend === "up" ? (
                    <ArrowUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${kpi.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs vorige maand</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Omzet Overzicht</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="revenue" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="revenue">Omzet</TabsTrigger>
                    <TabsTrigger value="invoices">Facturen</TabsTrigger>
                    <TabsTrigger value="clients">Klanten</TabsTrigger>
                  </TabsList>
                  <TabsContent value="revenue" className="space-y-4">
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Nog geen omzetgegevens</p>
                        <p className="text-sm text-muted-foreground">Maak je eerste factuur aan om data te zien</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="invoices" className="space-y-4">
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Nog geen factuurgegevens</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="clients" className="space-y-4">
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
                      <div className="text-center">
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Nog geen klantgegevens</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Doelstellingen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="font-medium">Maandelijkse Omzet</span>
                    </div>
                    <Badge variant="secondary">€0 / €5.000</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">0% van je maanddoel behaald</p>
                </div>
                
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Nieuwe Klanten</span>
                    </div>
                    <Badge variant="secondary">0 / 10</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "0%" }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">0% van je maanddoel behaald</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Clients */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Top Klanten</CardTitle>
              </CardHeader>
              <CardContent>
                {topClients.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Nog geen klantgegevens</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {topClients.map((client: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.invoices} facturen</p>
                        </div>
                        <span className="font-medium text-foreground">€{client.total}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recente Activiteit</CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Nog geen activiteit</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentActivity.map((activity: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Snelle Acties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Rapport
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Plan Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Stel Doelen In
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}