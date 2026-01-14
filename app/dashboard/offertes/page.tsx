"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Send,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  Euro,
  TrendingUp,
  Sparkles,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewOfferteDialog } from "@/components/dashboard/new-offerte-dialog"
import { AIGeneratorDialog } from "@/components/dashboard/ai-generator-dialog"

const stats = [
  { label: "Totaal Offertes", value: "0", change: "-", icon: FileText, color: "text-blue-500" },
  { label: "In Afwachting", value: "0", change: "-", icon: Clock, color: "text-amber-500" },
  { label: "Geaccepteerd", value: "0", change: "-", icon: CheckCircle, color: "text-emerald-500" },
  { label: "Totale Waarde", value: "€0", change: "-", icon: Euro, color: "text-primary" },
]

interface Quote {
  id: string
  client: string
  description: string
  amount: number
  status: "pending" | "accepted" | "rejected"
  date: string
  validUntil: string
}

const statusConfig = {
  pending: { label: "In Afwachting", variant: "secondary" as const, icon: Clock },
  accepted: { label: "Geaccepteerd", variant: "default" as const, icon: CheckCircle },
  rejected: { label: "Afgewezen", variant: "destructive" as const, icon: XCircle },
}

export default function OffertesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newOfferteOpen, setNewOfferteOpen] = useState(false)
  const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>([])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Offertes"
          description="Maak en beheer je offertes"
          icon={FileText}
          actionLabel="Nieuwe Offerte"
          onAction={() => setNewOfferteOpen(true)}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-emerald-500">{stat.change}</span>
                  <span className="text-sm text-muted-foreground">deze maand</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Quick Action */}
        <Card className="glass-card border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">AI Offerte Generator</h3>
                <p className="text-sm text-muted-foreground">Laat AI een professionele offerte opstellen</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setAiGeneratorOpen(true)}>
              <Sparkles className="w-4 h-4 mr-2" />
              Genereer Offerte
            </Button>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alle Offertes</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Zoeken..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {quotes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nog geen offertes</h3>
                <p className="text-muted-foreground mb-4">Maak je eerste offerte aan om te beginnen</p>
                <Button onClick={() => setNewOfferteOpen(true)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Nieuwe Offerte
                </Button>
              </div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Offerte Nr.</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Klant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Omschrijving</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bedrag</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Datum</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => {
                    const status = statusConfig[quote.status as keyof typeof statusConfig]
                    return (
                      <tr key={quote.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm text-foreground">{quote.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">{quote.client}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-muted-foreground">{quote.description}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">
                            {quote.amount.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={status.variant} className="gap-1">
                            <status.icon className="w-3 h-3" />
                            {status.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">{quote.date}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" /> Bekijken
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" /> Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="w-4 h-4 mr-2" /> Versturen
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" /> Dupliceren
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            )}
          </CardContent>
        </Card>
      </div>

      <NewOfferteDialog
        open={newOfferteOpen}
        onOpenChange={setNewOfferteOpen}
        onSubmit={(data) => {
          console.log("Nieuwe offerte:", data)
        }}
      />
      <AIGeneratorDialog
        open={aiGeneratorOpen}
        onOpenChange={setAiGeneratorOpen}
        type="offerte"
        onGenerate={(data) => {
          console.log("AI gegenereerde offerte:", data)
        }}
      />
    </DashboardLayout>
  )
}
