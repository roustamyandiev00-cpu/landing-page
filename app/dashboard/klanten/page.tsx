"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  UserPlus,
  Building,
  Euro,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewKlantDialog } from "@/components/dashboard/new-klant-dialog"

const stats = [
  { label: "Totaal Klanten", value: "0", change: "-", icon: Users, color: "text-blue-500" },
  { label: "Actieve Klanten", value: "0", change: "-", icon: UserPlus, color: "text-emerald-500" },
  { label: "Bedrijven", value: "0", change: "-", icon: Building, color: "text-amber-500" },
  { label: "Totale Omzet", value: "€0", change: "-", icon: Euro, color: "text-primary" },
]

interface Klant {
  id: number
  naam: string
  contactpersoon: string
  email: string
  telefoon: string
  stad: string
  status: "actief" | "inactief"
  omzet: number
}

export default function KlantenPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newKlantOpen, setNewKlantOpen] = useState(false)
  const [klanten, setKlanten] = useState<Klant[]>([])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Klanten"
          description="Beheer je klanten en contacten"
          icon={Users}
          actionLabel="Nieuwe Klant"
          onAction={() => setNewKlantOpen(true)}
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

        {/* Klanten List */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alle Klanten</CardTitle>
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
            {klanten.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nog geen klanten</h3>
                <p className="text-muted-foreground mb-4">Voeg je eerste klant toe om te beginnen</p>
                <Button onClick={() => setNewKlantOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Nieuwe Klant
                </Button>
              </div>
            ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bedrijf</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contactpersoon</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Locatie</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Omzet</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {klanten.map((klant) => (
                    <tr key={klant.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">{klant.naam.charAt(0)}</span>
                          </div>
                          <span className="font-medium text-foreground">{klant.naam}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-foreground">{klant.contactpersoon}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {klant.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {klant.telefoon}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {klant.stad}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-foreground">
                          {klant.omzet.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={klant.status === "actief" ? "default" : "secondary"}>
                          {klant.status === "actief" ? "Actief" : "Inactief"}
                        </Badge>
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
                              <Mail className="w-4 h-4 mr-2" /> E-mail sturen
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="w-4 h-4 mr-2" /> Bellen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </CardContent>
        </Card>
      </div>

      <NewKlantDialog
        open={newKlantOpen}
        onOpenChange={setNewKlantOpen}
        onSubmit={(data) => {
          console.log("Nieuwe klant:", data)
        }}
      />
    </DashboardLayout>
  )
}
