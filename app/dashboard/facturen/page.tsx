"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Receipt,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Euro,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CreditCard,
  Loader2,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewFactuurDialog } from "@/components/dashboard/new-factuur-dialog"
import { AIGeneratorDialog } from "@/components/dashboard/ai-generator-dialog"
import { useAuth } from "@/lib/auth-context"
import { getInvoices, updateInvoice, deleteInvoice, type Invoice } from "@/lib/firestore"

interface DisplayInvoice {
  id: string
  client: string
  description: string
  amount: number
  status: "pending" | "paid" | "overdue"
  date: string
  dueDate: string
}

const statusConfig = {
  pending: { label: "In Afwachting", variant: "secondary" as const, icon: Clock },
  paid: { label: "Betaald", variant: "default" as const, icon: CheckCircle },
  overdue: { label: "Achterstallig", variant: "destructive" as const, icon: AlertTriangle },
}

export default function FacturenPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [newFactuurOpen, setNewFactuurOpen] = useState(false)
  const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false)
  const [invoices, setInvoices] = useState<DisplayInvoice[]>([])
  const [loading, setLoading] = useState(true)

  // Calculate stats from real data
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
  const openAmount = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0)
  const paidThisMonth = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0)

  const stats = [
    { label: "Totale Omzet", value: `€${totalRevenue.toLocaleString('nl-NL')}`, change: "-", trend: "up" as const, icon: Euro, color: "text-emerald-500" },
    { label: "Openstaand", value: `€${openAmount.toLocaleString('nl-NL')}`, change: "-", trend: "down" as const, icon: Clock, color: "text-amber-500" },
    { label: "Betaald (MTD)", value: `€${paidThisMonth.toLocaleString('nl-NL')}`, change: "-", trend: "up" as const, icon: CheckCircle, color: "text-blue-500" },
    { label: "Achterstallig", value: `€${overdueAmount.toLocaleString('nl-NL')}`, change: "-", trend: "down" as const, icon: AlertTriangle, color: "text-red-500" },
  ]

  const loadInvoices = async () => {
    if (!user) return
    setLoading(true)
    try {
      const data = await getInvoices(user.uid)
      const mapped: DisplayInvoice[] = data.map(inv => ({
        id: inv.invoiceNumber || inv.id || '',
        client: inv.clientName,
        description: inv.items?.[0]?.description || 'Factuur',
        amount: inv.total,
        status: inv.status === 'sent' ? 'pending' : inv.status as any,
        date: inv.createdAt?.toDate?.()?.toLocaleDateString('nl-NL') || '',
        dueDate: inv.dueDate?.toDate?.()?.toLocaleDateString('nl-NL') || '',
      }))
      setInvoices(mapped)
    } catch (error) {
      console.error('Error loading invoices:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInvoices()
  }, [user])

  const handleMarkPaid = async (invoiceId: string) => {
    try {
      await updateInvoice(invoiceId, { status: 'paid' })
      loadInvoices()
    } catch (error) {
      console.error('Error updating invoice:', error)
    }
  }

  const handleDelete = async (invoiceId: string) => {
    if (!confirm('Weet je zeker dat je deze factuur wilt verwijderen?')) return
    try {
      await deleteInvoice(invoiceId)
      loadInvoices()
    } catch (error) {
      console.error('Error deleting invoice:', error)
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    if (activeTab === "all") return true
    return invoice.status === activeTab
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Facturen"
          description="Maak en beheer je facturen"
          icon={Receipt}
          actionLabel="Nieuwe Factuur"
          onAction={() => setNewFactuurOpen(true)}
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
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs vorige maand</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="glass-card border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">AI Factuur Generator</h3>
                  <p className="text-sm text-muted-foreground">Genereer automatisch facturen van offertes</p>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setAiGeneratorOpen(true)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Genereer
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Betalingsherinnering</h3>
                  <p className="text-sm text-muted-foreground">3 facturen wachten op herinnering</p>
                </div>
              </div>
              <Button variant="outline">
                <Send className="w-4 h-4 mr-2" />
                Verstuur Alle
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Invoices List */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Alle Facturen</CardTitle>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">Alle</TabsTrigger>
                    <TabsTrigger value="pending">Openstaand</TabsTrigger>
                    <TabsTrigger value="paid">Betaald</TabsTrigger>
                    <TabsTrigger value="overdue">Achterstallig</TabsTrigger>
                  </TabsList>
                </Tabs>
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
            </div>
          </CardHeader>
          <CardContent>
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nog geen facturen</h3>
                <p className="text-muted-foreground mb-4">Maak je eerste factuur aan om te beginnen</p>
                <Button onClick={() => setNewFactuurOpen(true)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Nieuwe Factuur
                </Button>
              </div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Factuur Nr.</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Klant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Omschrijving</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bedrag</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vervaldatum</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => {
                    const status = statusConfig[invoice.status as keyof typeof statusConfig]
                    return (
                      <tr key={invoice.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm text-foreground">{invoice.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">{invoice.client}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-muted-foreground">{invoice.description}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">
                            {invoice.amount.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={status.variant} className="gap-1">
                            <status.icon className="w-3 h-3" />
                            {status.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">{invoice.dueDate}</span>
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
                                <CheckCircle className="w-4 h-4 mr-2" /> Markeer Betaald
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

      <NewFactuurDialog
        open={newFactuurOpen}
        onOpenChange={setNewFactuurOpen}
        onSubmit={() => {
          setNewFactuurOpen(false)
          loadInvoices()
        }}
      />
      <AIGeneratorDialog
        open={aiGeneratorOpen}
        onOpenChange={setAiGeneratorOpen}
        type="factuur"
        onGenerate={() => setAiGeneratorOpen(false)}
      />
    </DashboardLayout>
  )
}
