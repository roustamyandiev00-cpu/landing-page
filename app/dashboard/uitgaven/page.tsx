"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
  Camera,
  Euro,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Car,
  Coffee,
  Laptop,
  FileText,
  Zap,
  Plus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewUitgaveDialog } from "@/components/dashboard/new-uitgave-dialog"
import { BonScannerDialog } from "@/components/dashboard/bon-scanner-dialog"
import { BankConnectDialog } from "@/components/dashboard/bank-connect-dialog"

const stats = [
  { label: "Totaal Deze Maand", value: "€0", change: "-", trend: "up", icon: Euro, color: "text-red-500" },
  { label: "Zakelijk", value: "€0", change: "-", trend: "up", icon: Laptop, color: "text-blue-500" },
  { label: "Reiskosten", value: "€0", change: "-", trend: "down", icon: Car, color: "text-amber-500" },
  { label: "Overig", value: "€0", change: "-", trend: "up", icon: ShoppingBag, color: "text-purple-500" },
]

const budgets: { category: string; spent: number; budget: number; icon: any; color: string }[] = []

interface Expense {
  id: number
  description: string
  category: string
  amount: number
  date: string
  status: "pending" | "approved" | "rejected"
  icon: any
}

const statusConfig = {
  pending: { label: "In Review", variant: "secondary" as const },
  approved: { label: "Goedgekeurd", variant: "default" as const },
  rejected: { label: "Afgewezen", variant: "destructive" as const },
}

export default function UitgavenPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expenses, setExpenses] = useState<Expense[]>([])

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Uitgaven" description="Beheer je zakelijke uitgaven" icon={CreditCard}>
          <NewUitgaveDialog>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nieuwe Uitgave
            </Button>
          </NewUitgaveDialog>
        </PageHeader>

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
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-emerald-500" />
                  )}
                  <span className={`text-sm ${stat.trend === "up" ? "text-red-500" : "text-emerald-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs vorige maand</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget Overview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Budget Overzicht</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {budgets.length === 0 ? (
                <div className="text-center py-8">
                  <Euro className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Nog geen budgetten ingesteld</p>
                </div>
              ) : (
              budgets.map((budget) => {
                const percentage = (budget.spent / budget.budget) * 100
                return (
                  <div key={budget.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${budget.color}/20 flex items-center justify-center`}>
                          <budget.icon className={`w-4 h-4 ${budget.color.replace("bg-", "text-")}`} />
                        </div>
                        <span className="text-sm font-medium text-foreground">{budget.category}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        €{budget.spent} / €{budget.budget}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Snelle Acties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BonScannerDialog>
                  <Button variant="outline" className="h-auto py-4 justify-start gap-4 bg-transparent w-full">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Bon Scannen</p>
                      <p className="text-sm text-muted-foreground">Upload en scan automatisch</p>
                    </div>
                  </Button>
                </BonScannerDialog>
                <NewUitgaveDialog>
                  <Button variant="outline" className="h-auto py-4 justify-start gap-4 bg-transparent w-full">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Handmatig Toevoegen</p>
                      <p className="text-sm text-muted-foreground">Voer uitgave direct in</p>
                    </div>
                  </Button>
                </NewUitgaveDialog>
                <BankConnectDialog>
                  <Button variant="outline" className="h-auto py-4 justify-start gap-4 bg-transparent w-full">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Bank Koppelen</p>
                      <p className="text-sm text-muted-foreground">Importeer automatisch</p>
                    </div>
                  </Button>
                </BankConnectDialog>
                <Button variant="outline" className="h-auto py-4 justify-start gap-4 bg-transparent">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Download className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Exporteren</p>
                    <p className="text-sm text-muted-foreground">Download als CSV/Excel</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expenses List */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recente Uitgaven</CardTitle>
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
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nog geen uitgaven</h3>
                <p className="text-muted-foreground mb-4">Voeg je eerste uitgave toe om te beginnen</p>
                <NewUitgaveDialog>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nieuwe Uitgave
                  </Button>
                </NewUitgaveDialog>
              </div>
            ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => {
                const status = statusConfig[expense.status]
                return (
                  <div
                    key={expense.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <expense.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{expense.description}</p>
                      <p className="text-sm text-muted-foreground">{expense.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {expense.amount.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
                      </p>
                      <p className="text-sm text-muted-foreground">{expense.date}</p>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
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
                          <Download className="w-4 h-4 mr-2" /> Download Bon
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="w-4 h-4 mr-2" /> Verwijderen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
