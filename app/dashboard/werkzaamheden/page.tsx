"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Search, Package, Euro, Tag, Edit, Settings, Plus, Trash2 } from "lucide-react"
import { categorieën, werkzaamheden, getEenheidLabel, type Werkzaamheid } from "@/lib/werkzaamheden-data"
import { WerkzaamheidEditDialog } from "@/components/dashboard/werkzaamheid-edit-dialog"
import { WerkzaamheidFormDialog } from "@/components/dashboard/werkzaamheid-form-dialog"
import { getUserWerkzaamheden, deleteUserWerkzaamheid, type UserWerkzaamheid } from "@/lib/firestore"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export default function WerkzaamhedenPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategorie, setSelectedCategorie] = useState<string | null>(null)
  const [editingWerkzaamheid, setEditingWerkzaamheid] = useState<Werkzaamheid | UserWerkzaamheid | null>(null)
  const [formWerkzaamheid, setFormWerkzaamheid] = useState<UserWerkzaamheid | null>(null)
  const [showFormDialog, setShowFormDialog] = useState(false)
  const [deletingWerkzaamheid, setDeletingWerkzaamheid] = useState<UserWerkzaamheid | null>(null)
  const [userWerkzaamheden, setUserWerkzaamheden] = useState<UserWerkzaamheid[]>([])
  const [loading, setLoading] = useState(true)

  // Load user's custom werkzaamheden
  useEffect(() => {
    if (user) {
      loadUserWerkzaamheden()
    }
  }, [user])

  const loadUserWerkzaamheden = async () => {
    if (!user) return
    try {
      const customWerkzaamheden = await getUserWerkzaamheden(user.uid)
      setUserWerkzaamheden(customWerkzaamheden)
    } catch (error) {
      console.error("Error loading user werkzaamheden:", error)
      toast.error("Fout bij laden van aangepaste werkzaamheden")
    } finally {
      setLoading(false)
    }
  }

  // Merge standard and custom werkzaamheden
  const allWerkzaamheden = [
    ...werkzaamheden.map(w => {
      // Check if user has customized this werkzaamheid
      const customVersion = userWerkzaamheden.find(uw => uw.originalId === w.id)
      return customVersion || w
    }),
    // Add completely custom werkzaamheden (those without originalId)
    ...userWerkzaamheden.filter(uw => !uw.originalId)
  ]

  const filteredWerkzaamheden = allWerkzaamheden.filter(w => {
    const matchesSearch = !searchQuery || 
      w.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.omschrijving.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategorie = !selectedCategorie || w.categorie === selectedCategorie
    return matchesSearch && matchesCategorie
  })

  const handleEditWerkzaamheid = (werkzaamheid: Werkzaamheid | UserWerkzaamheid) => {
    setEditingWerkzaamheid(werkzaamheid)
  }

  const handleSaveWerkzaamheid = () => {
    loadUserWerkzaamheden() // Reload to show changes
    setEditingWerkzaamheid(null)
  }

  const handleAddWerkzaamheid = () => {
    setFormWerkzaamheid(null)
    setShowFormDialog(true)
  }

  const handleEditCustomWerkzaamheid = (werkzaamheid: UserWerkzaamheid) => {
    setFormWerkzaamheid(werkzaamheid)
    setShowFormDialog(true)
  }

  const handleDeleteWerkzaamheid = async () => {
    if (!deletingWerkzaamheid?.id) return

    try {
      await deleteUserWerkzaamheid(deletingWerkzaamheid.id)
      toast.success("Werkzaamheid verwijderd")
      loadUserWerkzaamheden()
    } catch (error) {
      console.error("Error deleting werkzaamheid:", error)
      toast.error("Fout bij verwijderen")
    } finally {
      setDeletingWerkzaamheid(null)
    }
  }

  const handleFormSave = () => {
    loadUserWerkzaamheden()
    setShowFormDialog(false)
    setFormWerkzaamheid(null)
  }

  const stats = [
    { label: "Totaal Werkzaamheden", value: allWerkzaamheden.length.toString(), icon: Package, color: "text-blue-500" },
    { label: "Categorieën", value: categorieën.length.toString(), icon: Tag, color: "text-purple-500" },
    { label: "Aangepast", value: userWerkzaamheden.length.toString(), icon: Settings, color: "text-green-500" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Werkzaamheden Bibliotheek"
          description="Standaard werkzaamheden en prijzen voor offertes"
          icon={Package}
        >
          <Button onClick={handleAddWerkzaamheid} className="gap-2">
            <Plus className="w-4 h-4" />
            Nieuwe werkzaamheid
          </Button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
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
            {filteredWerkzaamheden.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {searchQuery || selectedCategorie ? "Geen werkzaamheden gevonden" : "Geen werkzaamheden"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedCategorie 
                    ? "Probeer je zoekopdracht aan te passen of een andere categorie te selecteren."
                    : "Voeg je eerste werkzaamheid toe om te beginnen."
                  }
                </p>
                {!searchQuery && !selectedCategorie && (
                  <Button onClick={handleAddWerkzaamheid} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Eerste werkzaamheid toevoegen
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredWerkzaamheden.map((werk) => {
                  const categorie = categorieën.find(c => c.id === werk.categorie)
                  const isCustom = 'isCustom' in werk && werk.isCustom
                  const isFullyCustom = isCustom && !('originalId' in werk && werk.originalId)
                  
                  return (
                    <div
                      key={werk.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{categorie?.icon}</span>
                          <h3 className="font-medium text-foreground">{werk.naam}</h3>
                          {isCustom && (
                            <Badge variant="secondary" className="text-xs">
                              {isFullyCustom ? "Eigen" : "Aangepast"}
                            </Badge>
                          )}
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
                      <div className="flex items-center gap-2 sm:text-right">
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
                        <div className="flex gap-1">
                          {isFullyCustom ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditCustomWerkzaamheid(werk as UserWerkzaamheid)}
                                className="shrink-0"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setDeletingWerkzaamheid(werk as UserWerkzaamheid)}
                                className="shrink-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditWerkzaamheid(werk)}
                              className="shrink-0"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      {editingWerkzaamheid && (
        <WerkzaamheidEditDialog
          open={!!editingWerkzaamheid}
          onOpenChange={(open) => !open && setEditingWerkzaamheid(null)}
          werkzaamheid={editingWerkzaamheid}
          onSave={handleSaveWerkzaamheid}
        />
      )}

      {/* Form Dialog */}
      <WerkzaamheidFormDialog
        open={showFormDialog}
        onOpenChange={setShowFormDialog}
        werkzaamheid={formWerkzaamheid}
        onSave={handleFormSave}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingWerkzaamheid} onOpenChange={() => setDeletingWerkzaamheid(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Werkzaamheid verwijderen</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je "{deletingWerkzaamheid?.naam}" wilt verwijderen? 
              Deze actie kan niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteWerkzaamheid}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
