"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus, ArrowUpRight, ArrowDownLeft, RefreshCw, TrendingUp, Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { BankConnectDialog } from "@/components/dashboard/bank-connect-dialog"

const accounts = [
  {
    id: 1,
    name: "ING Zakelijk",
    iban: "NL91 INGB 0123 4567 89",
    balance: 24680.5,
    type: "Betaalrekening",
    color: "bg-orange-500",
    logo: "ING",
  },
  {
    id: 2,
    name: "ABN AMRO Sparen",
    iban: "NL02 ABNA 9876 5432 10",
    balance: 15000.0,
    type: "Spaarrekening",
    color: "bg-green-500",
    logo: "ABN",
  },
  {
    id: 3,
    name: "Rabobank Zakelijk",
    iban: "NL39 RABO 1122 3344 55",
    balance: 8450.75,
    type: "Betaalrekening",
    color: "bg-blue-500",
    logo: "RABO",
  },
]

const recentTransactions = [
  {
    id: 1,
    description: "ABC Corporation - Factuur betaling",
    amount: 4500.0,
    type: "income",
    date: "10 Jan 2026",
    account: "ING Zakelijk",
    category: "Facturen",
  },
  {
    id: 2,
    description: "Google Workspace - Maandelijks",
    amount: -12.0,
    type: "expense",
    date: "09 Jan 2026",
    account: "ING Zakelijk",
    category: "Software",
  },
  {
    id: 3,
    description: "Salarisovermaking - Jan 2026",
    amount: -3500.0,
    type: "expense",
    date: "08 Jan 2026",
    account: "ING Zakelijk",
    category: "Salaris",
  },
  {
    id: 4,
    description: "XYZ Tech - Aanbetaling",
    amount: 8000.0,
    type: "income",
    date: "07 Jan 2026",
    account: "ING Zakelijk",
    category: "Facturen",
  },
  {
    id: 5,
    description: "KVK - Jaarlijkse bijdrage",
    amount: -75.0,
    type: "expense",
    date: "05 Jan 2026",
    account: "ING Zakelijk",
    category: "Administratie",
  },
]

export default function BankierenPage() {
  const [showBalances, setShowBalances] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  const handleSync = async () => {
    setIsSyncing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSyncing(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Bankieren" description="Beheer je bankrekeningen en transacties" icon={Building2}>
          <BankConnectDialog>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Bank Koppelen
            </Button>
          </BankConnectDialog>
        </PageHeader>

        {/* Total Balance Card */}
        <Card className="glass-card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Totaal Saldo</p>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-4xl font-bold text-foreground">
                    {showBalances
                      ? totalBalance.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })
                      : "€ ••••••"}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowBalances(!showBalances)}>
                    {showBalances ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-emerald-500">+€8.500 deze maand</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSync} disabled={isSyncing}>
                  {isSyncing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  {isSyncing ? "Synchroniseren..." : "Synchroniseren"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <Card key={account.id} className="glass-card hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${account.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{account.logo}</span>
                  </div>
                  <Badge variant="secondary">{account.type}</Badge>
                </div>
                <h3 className="font-medium text-foreground">{account.name}</h3>
                <p className="text-sm text-muted-foreground font-mono mt-1">{account.iban}</p>
                <p className="text-2xl font-bold text-foreground mt-3">
                  {showBalances
                    ? account.balance.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })
                    : "€ ••••"}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Add Account Card */}
          <BankConnectDialog>
            <Card className="glass-card border-dashed hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center min-h-[180px]">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">Rekening Toevoegen</p>
                <p className="text-sm text-muted-foreground mt-1">Koppel een nieuwe bank</p>
              </CardContent>
            </Card>
          </BankConnectDialog>
        </div>

        {/* Transactions */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recente Transacties</CardTitle>
              <Button variant="outline" size="sm">
                Alle Bekijken
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-emerald-500/20" : "bg-red-500/20"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowDownLeft className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">{transaction.account}</span>
                      <span className="text-muted-foreground">•</span>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${transaction.type === "income" ? "text-emerald-500" : "text-foreground"}`}
                    >
                      {transaction.type === "income" ? "+" : ""}
                      {transaction.amount.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
