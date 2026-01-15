"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Package, Euro, Tag } from "lucide-react"
import { categorieën, werkzaamheden, getEenheidLabel, type Werkzaamheid } from "@/lib/werkzaamheden-data"

export default function WerkzaamhedenPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategorie, setSelectedCategorie] = useState<string | null>(null)

  const filteredWerkzaamheden = werkzaamheden.filter(w => {
    const matchesSearch = !searchQuery || 
      w.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.omschrijving.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategorie = !selectedCategorie || w.categorie === selectedCategorie
    return matchesSearch && matchesCategorie
  })

  const stats = [
    { label: "Totaal Werkzaamheden", value: werkzaamheden.length.toString(), icon: Package, color: "text-blue-500" },
    { label: "Categorieën", value: categorieën.length.toString(), icon: Tag, color: "text-purple-500" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Werkzaamheden Bibliotheek"
          description="Standaard werkzaamheden en prijzen voor offertes"
          icon={Package}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="glass-card">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Zoek werkzaamheden..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategorie === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategorie(null)}
              >
                Alle
              </Badge>
              {categorieën.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategorie === cat.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategorie(cat.id)}
                >
                  {cat.icon} {cat.naam}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Werkzaamheden List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>
              {filteredWerkzaamheden.length} werkzaamheden
              {selectedCategorie && ` in ${categorieën.find(c => c.id === selectedCategorie)?.naam}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredWerkzaamheden.map((werk) => {
                const categorie = categorieën.find(c => c.id === werk.categorie)
                return (
                  <div
                    key={werk.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{categorie?.icon}</span>
                        <h3 className="font-medium text-foreground">{werk.naam}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{werk.omschrijving}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {werk.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:text-right">
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          €{werk.standaardPrijs}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getEenheidLabel(werk.eenheid)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          €{werk.prijsMin} - €{werk.prijsMax}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {werk.btwTarief}% BTW
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
