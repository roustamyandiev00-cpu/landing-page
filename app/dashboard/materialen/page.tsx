"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Package,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  PackagePlus,
  Warehouse,
  Euro,
  BarChart3,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewMateriaalDialog } from "@/components/dashboard/new-materiaal-dialog"

const stats = [
  { label: "Totaal Producten", value: "156", change: "+12", icon: Package, color: "text-blue-500" },
  { label: "Voorraadwaarde", value: "€24.850", change: "+8%", icon: Euro, color: "text-emerald-500" },
  { label: "Lage Voorraad", value: "8", change: "-2", icon: AlertTriangle, color: "text-amber-500", negative: true },
  { label: "Categorieën", value: "12", change: "+1", icon: Warehouse, color: "text-primary" },
]

const materialen = [
  {
    id: 1,
    naam: "Cement Portland 25kg",
    categorie: "Bouwmaterialen",
    sku: "CEM-001",
    voorraad: 45,
    minVoorraad: 20,
    eenheid: "zakken",
    prijs: 8.50,
    leverancier: "Bouwdepot NL",
  },
  {
    id: 2,
    naam: "Gipsplaten 260x60cm",
    categorie: "Afwerking",
    sku: "GIP-002",
    voorraad: 12,
    minVoorraad: 15,
    eenheid: "stuks",
    prijs: 12.95,
    leverancier: "Gyproc Direct",
  },
  {
    id: 3,
    naam: "Isolatiemateriaal 100mm",
    categorie: "Isolatie",
    sku: "ISO-003",
    voorraad: 80,
    minVoorraad: 30,
    eenheid: "m²",
    prijs: 15.00,
    leverancier: "Isover BV",
  },
  {
    id: 4,
    naam: "PVC Buis 110mm (3m)",
    categorie: "Sanitair",
    sku: "PVC-004",
    voorraad: 5,
    minVoorraad: 10,
    eenheid: "stuks",
    prijs: 18.50,
    leverancier: "Wavin Nederland",
  },
  {
    id: 5,
    naam: "Elektriciteitskabel 2.5mm²",
    categorie: "Elektra",
    sku: "ELK-005",
    voorraad: 250,
    minVoorraad: 100,
    eenheid: "meter",
    prijs: 1.25,
    leverancier: "Kabel Express",
  },
  {
    id: 6,
    naam: "Schroeven 5x50mm (200st)",
    categorie: "Bevestiging",
    sku: "SCH-006",
    voorraad: 8,
    minVoorraad: 10,
    eenheid: "dozen",
    prijs: 14.95,
    leverancier: "Fischer BV",
  },
]

export default function MaterialenPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newMateriaalOpen, setNewMateriaalOpen] = useState(false)

  const getVoorraadStatus = (voorraad: number, minVoorraad: number) => {
    if (voorraad <= minVoorraad * 0.5) return { label: "Kritiek", variant: "destructive" as const }
    if (voorraad <= minVoorraad) return { label: "Laag", variant: "secondary" as const }
    return { label: "Op voorraad", variant: "default" as const }
  }

  const filteredMaterialen = materialen.filter(
    (m) =>
      m.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.categorie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Materialen & Voorraad"
          description="Beheer je materialen en voorraadniveaus"
          icon={Package}
          actionLabel="Nieuw Materiaal"
          onAction={() => setNewMateriaalOpen(true)}
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
                  {stat.negative ? (
                    <TrendingDown className="w-4 h-4 text-amber-500" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  )}
                  <span className={`text-sm ${stat.negative ? "text-amber-500" : "text-emerald-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">deze maand</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Materialen List */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alle Materialen</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Zoeken op naam, SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">SKU</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Categorie</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Voorraad</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Prijs</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterialen.map((materiaal) => {
                    const status = getVoorraadStatus(materiaal.voorraad, materiaal.minVoorraad)
                    return (
                      <tr
                        key={materiaal.id}
                        className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Package className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <span className="font-medium text-foreground block">{materiaal.naam}</span>
                              <span className="text-xs text-muted-foreground">{materiaal.leverancier}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <code className="text-sm bg-muted px-2 py-1 rounded">{materiaal.sku}</code>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-muted-foreground">{materiaal.categorie}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{materiaal.voorraad}</span>
                            <span className="text-muted-foreground text-sm">{materiaal.eenheid}</span>
                          </div>
                          <div className="w-24 h-1.5 bg-muted rounded-full mt-1">
                            <div
                              className={`h-full rounded-full ${
                                materiaal.voorraad <= materiaal.minVoorraad * 0.5
                                  ? "bg-destructive"
                                  : materiaal.voorraad <= materiaal.minVoorraad
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                              style={{
                                width: `${Math.min((materiaal.voorraad / (materiaal.minVoorraad * 2)) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">
                            €{materiaal.prijs.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={status.variant}>{status.label}</Badge>
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
                                <Edit className="w-4 h-4 mr-2" /> Bewerken
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="w-4 h-4 mr-2" /> Voorraad aanpassen
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
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
          </CardContent>
        </Card>
      </div>

      <NewMateriaalDialog
        open={newMateriaalOpen}
        onOpenChange={setNewMateriaalOpen}
        onSubmit={(data) => {
          console.log("Nieuw materiaal:", data)
        }}
      />
    </DashboardLayout>
  )
}
