"use client"

import { useState, useEffect } from "react"
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
  Trash2,
  Loader2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewOfferteDialog } from "@/components/dashboard/new-offerte-dialog"
import { AIOfferteDialog } from "@/components/dashboard/ai-offerte-dialog"
import { useAuth } from "@/lib/auth-context"
import { createDocument, getDocuments, updateDocument, deleteDocument } from "@/lib/firebase"

interface Quote {
  id: string
  offerteNummer: string
  client: string
  email: string
  description: string
  items: { description: string; quantity: number; price: number }[]
  amount: number
  status: "pending" | "accepted" | "rejected"
  validDays: string
  notes: string
  createdAt: any
}

const statusConfig = {
  pending: { label: "In Afwachting", variant: "secondary" as const, icon: Clock },
  accepted: { label: "Geaccepteerd", variant: "default" as const, icon: CheckCircle },
  rejected: { label: "Afgewezen", variant: "destructive" as const, icon: XCircle },
}

export default function OffertesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [newOfferteOpen, setNewOfferteOpen] = useState(false)
  const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)

  // Load offertes from Firestore
  useEffect(() => {
    const loadOffertes = async () => {
      if (!user) {
        setLoading(false)
        return
      }
      
      const { data, error } = await getDocuments("offertes", user.uid)
      if (!error && data) {
        setQuotes(data as Quote[])
      }
      setLoading(false)
    }
    
    loadOffertes()
  }, [user])

  // Calculate stats
  const stats = [
    { 
      label: "Totaal Offertes", 
      value: quotes.length.toString(), 
      change: quotes.length > 0 ? `+${quotes.length}` : "-", 
      icon: FileText, 
      color: "text-blue-500" 
    },
    { 
      label: "In Afwachting", 
      value: quotes.filter(q => q.status === "pending").length.toString(), 
      change: "-", 
      icon: Clock, 
      color: "text-amber-500" 
    },
    { 
      label: "Geaccepteerd", 
      value: quotes.filter(q => q.status === "accepted").length.toString(), 
      change: "-", 
      icon: CheckCircle, 
      color: "text-emerald-500" 
    },
    { 
      label: "Totale Waarde", 
      value: `€${quotes.reduce((sum, q) => sum + (q.amount || 0), 0).toLocaleString("nl-NL")}`, 
      change: "-", 
      icon: Euro, 
      color: "text-primary" 
    },
  ]

  // Generate offerte nummer
  const generateOfferteNummer = () => {
    const year = new Date().getFullYear()
    const num = (quotes.length + 1).toString().padStart(3, "0")
    return `OFF-${year}-${num}`
  }

  // Handle new offerte submission
  const handleNewOfferte = async (data: any) => {
    if (!user) return
    
    const amount = data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0)
    const offerteData = {
      ...data,
      offerteNummer: generateOfferteNummer(),
      amount,
      status: "pending",
    }
    
    const { id, error } = await createDocument("offertes", offerteData, user.uid)
    if (!error && id) {
      setQuotes([{ id, ...offerteData, createdAt: new Date() } as Quote, ...quotes])
    }
    setNewOfferteOpen(false)
  }

  // Handle AI generated offerte
  const handleAIOfferte = async (data: any) => {
    if (!user) return
    
    const amount = data.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0)
    const offerteData = {
      ...data,
      offerteNummer: generateOfferteNummer(),
      amount,
      status: "pending",
    }
    
    const { id, error } = await createDocument("offertes", offerteData, user.uid)
    if (!error && id) {
      setQuotes([{ id, ...offerteData, createdAt: new Date() } as Quote, ...quotes])
    }
    setAiGeneratorOpen(false)
  }

  // Handle status change
  const handleStatusChange = async (quoteId: string, newStatus: "pending" | "accepted" | "rejected") => {
    const { error } = await updateDocument("offertes", quoteId, { status: newStatus })
    if (!error) {
      setQuotes(quotes.map(q => q.id === quoteId ? { ...q, status: newStatus } : q))
    }
  }

  // Handle delete
  const handleDelete = async (quoteId: string) => {
    const { error } = await deleteDocument("offertes", quoteId)
    if (!error) {
      setQuotes(quotes.filter(q => q.id !== quoteId))
    }
  }

  // Filter quotes by search
  const filteredQuotes = quotes.filter(q => 
    q.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.offerteNummer?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Format date
  const formatDate = (date: any) => {
    if (!date) return "-"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString("nl-NL", { day: "2-digit", month: "short", year: "numeric" })
  }

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
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">AI Offerte Generator</h3>
                <p className="text-sm text-muted-foreground">Beschrijf je project en laat AI een offerte maken</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto" onClick={() => setAiGeneratorOpen(true)}>
              <Sparkles className="w-4 h-4 mr-2" />
              Genereer met AI
            </Button>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Alle Offertes</CardTitle>
              <div className="relative w-full sm:w-64">
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
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
                <p className="text-muted-foreground">Offertes laden...</p>
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nog geen offertes</h3>
                <p className="text-muted-foreground mb-4">Maak je eerste offerte aan om te beginnen</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setNewOfferteOpen(true)} variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Handmatig maken
                  </Button>
                  <Button onClick={() => setAiGeneratorOpen(true)}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Met AI maken
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Offerte Nr.</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Klant</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Omschrijving</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bedrag</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Datum</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Acties</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotes.map((quote) => {
                      const status = statusConfig[quote.status as keyof typeof statusConfig]
                      return (
                        <tr key={quote.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-mono text-sm text-foreground">{quote.offerteNummer}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-foreground">{quote.client}</span>
                          </td>
                          <td className="py-4 px-4 hidden md:table-cell">
                            <span className="text-muted-foreground truncate max-w-[200px] block">{quote.description}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-foreground">
                              €{(quote.amount || 0).toLocaleString("nl-NL")}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant={status.variant} className="gap-1">
                              <status.icon className="w-3 h-3" />
                              <span className="hidden sm:inline">{status.label}</span>
                            </Badge>
                          </td>
                          <td className="py-4 px-4 hidden sm:table-cell">
                            <span className="text-sm text-muted-foreground">{formatDate(quote.createdAt)}</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleStatusChange(quote.id, "accepted")}>
                                  <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> Accepteren
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(quote.id, "rejected")}>
                                  <XCircle className="w-4 h-4 mr-2 text-red-500" /> Afwijzen
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(quote.id, "pending")}>
                                  <Clock className="w-4 h-4 mr-2" /> In Afwachting
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(quote.id)} className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" /> Verwijderen
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
        onSubmit={handleNewOfferte}
      />
      <AIOfferteDialog
        open={aiGeneratorOpen}
        onOpenChange={setAiGeneratorOpen}
        onSubmit={handleAIOfferte}
      />
    </DashboardLayout>
  )
}
