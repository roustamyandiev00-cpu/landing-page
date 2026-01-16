"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Shield,
  Zap,
  History,
  Bot,
  Settings,
  Check,
  AlertTriangle
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAi } from "@/lib/ai-context"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default function AiSettingsPage() {
  const { logs, aiLevel, setAiLevel } = useAi()

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Archon AI Assistant
            </h1>
            <p className="text-muted-foreground mt-1">Beheer hoe AI jouw bedrijf ondersteunt en automatiseert.</p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
            <span className="text-sm font-medium px-2">Huidig Niveau:</span>
            <Badge variant="default" className="bg-primary text-primary-foreground">
              {aiLevel === "suggestion" ? "Adviseur" : aiLevel === "semi-auto" ? "Co-piloot" : "Autopiloot"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Automatiseringsniveau
                </CardTitle>
                <CardDescription>
                  Kies hoeveel controle je wilt behouden over de acties van Archon.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${aiLevel === 'suggestion' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  onClick={() => setAiLevel('suggestion')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base">Adviseur (Veilig)</h3>
                        <p className="text-sm text-muted-foreground">AI doet alleen suggesties. Jij beslist alles.</p>
                      </div>
                    </div>
                    {aiLevel === 'suggestion' && <Check className="w-6 h-6 text-primary" />}
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${aiLevel === 'semi-auto' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  onClick={() => setAiLevel('semi-auto')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base">Co-piloot (Aanbevolen)</h3>
                        <p className="text-sm text-muted-foreground">AI stelt acties voor en bereidt ze voor. Jij klikt op &apos;ok&apos;.</p>
                      </div>
                    </div>
                    {aiLevel === 'semi-auto' && <Check className="w-6 h-6 text-primary" />}
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${aiLevel === 'auto' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                  onClick={() => setAiLevel('auto')}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base">Autopiloot (Advanced)</h3>
                        <p className="text-sm text-muted-foreground">AI stuurt herinneringen en plant afspraken zelfstandig.</p>
                      </div>
                    </div>
                    {aiLevel === 'auto' && <Check className="w-6 h-6 text-primary" />}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Toggles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Specifieke Instellingen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Betaalherinneringen</Label>
                    <p className="text-sm text-muted-foreground">Laat AI concepten schrijven voor late betalers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Prijsoptimalisatie</Label>
                    <p className="text-sm text-muted-foreground">Suggesties voor marges op offertes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">BTW Alerts</Label>
                    <p className="text-sm text-muted-foreground">Waarschuwingen voor deadlines en grote uitgaven</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Log Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full max-h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-md">
                  <History className="w-4 h-4" />
                  AI Actie Logboek
                </CardTitle>
                <CardDescription>
                  Recente activiteiten van Archon
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pr-2 space-y-4">
                {logs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">Nog geen activiteit.</p>
                  </div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="relative pl-4 border-l-2 border-border pb-1 last:pb-0">
                      <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${log.type === 'warning' ? 'bg-orange-500' :
                          log.type === 'automation' ? 'bg-purple-500' :
                            'bg-blue-500'
                        }`} />
                      <div className="bg-muted/30 p-3 rounded-lg text-sm">
                        <p className="font-medium text-foreground">{log.message}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <span className="capitalize bg-background px-1.5 py-0.5 rounded border shadow-sm">{log.context}</span>
                          <span>{log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
