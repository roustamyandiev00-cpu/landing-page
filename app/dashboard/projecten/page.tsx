"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FolderKanban,
  Search,
  MoreHorizontal,
  Eye,
  Clock,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  TrendingUp,
  Euro,
  Calendar,
  Users,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NewProjectDialog } from "@/components/dashboard/new-project-dialog"

const stats = [
  { label: "Totaal Projecten", value: "18", change: "+2", icon: FolderKanban, color: "text-blue-500" },
  { label: "Actief", value: "8", change: "+1", icon: PlayCircle, color: "text-emerald-500" },
  { label: "In Afwachting", value: "4", change: "0", icon: PauseCircle, color: "text-amber-500" },
  { label: "Totale Waarde", value: "€186.500", change: "+15%", icon: Euro, color: "text-primary" },
]

const projecten = [
  {
    id: 1,
    naam: "Website Redesign ABC Corp",
    klant: "ABC Corporation",
    status: "actief",
    voortgang: 65,
    deadline: "15 Feb 2026",
    budget: 12500,
    team: 3,
  },
  {
    id: 2,
    naam: "Mobile App XYZ Tech",
    klant: "XYZ Tech Solutions",
    status: "actief",
    voortgang: 40,
    deadline: "01 Mrt 2026",
    budget: 28000,
    team: 4,
  },
  {
    id: 3,
    naam: "IT Consultancy Global",
    klant: "Global Industries",
    status: "afgerond",
    voortgang: 100,
    deadline: "10 Jan 2026",
    budget: 5600,
    team: 2,
  },
  {
    id: 4,
    naam: "MVP StartUp Hub",
    klant: "StartUp Hub",
    status: "actief",
    voortgang: 25,
    deadline: "20 Apr 2026",
    budget: 18500,
    team: 3,
  },
  {
    id: 5,
    naam: "API Integratie Digital Plus",
    klant: "Digital Agency Plus",
    status: "wachtend",
    voortgang: 0,
    deadline: "01 Mei 2026",
    budget: 7800,
    team: 2,
  },
]

const statusConfig = {
  actief: { label: "Actief", variant: "default" as const, icon: PlayCircle },
  wachtend: { label: "In Afwachting", variant: "secondary" as const, icon: PauseCircle },
  afgerond: { label: "Afgerond", variant: "outline" as const, icon: CheckCircle },
}

export default function ProjectenPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newProjectOpen, setNewProjectOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Projecten"
          description="Beheer je projecten en voortgang"
          icon={FolderKanban}
          actionLabel="Nieuw Project"
          onAction={() => setNewProjectOpen(true)}
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

        {/* Projecten List */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alle Projecten</CardTitle>
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Project</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Klant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Voortgang</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Deadline</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Budget</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {projecten.map((project) => {
                    const status = statusConfig[project.status as keyof typeof statusConfig]
                    return (
                      <tr key={project.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FolderKanban className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <span className="font-medium text-foreground block">{project.naam}</span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Users className="w-3 h-3" /> {project.team} teamleden
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-foreground">{project.klant}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="w-32">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">{project.voortgang}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${project.voortgang}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {project.deadline}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">
                            {project.budget.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={status.variant} className="gap-1">
                            <status.icon className="w-3 h-3" />
                            {status.label}
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
                                <Clock className="w-4 h-4 mr-2" /> Tijdregistratie
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="w-4 h-4 mr-2" /> Markeer als afgerond
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

      <NewProjectDialog
        open={newProjectOpen}
        onOpenChange={setNewProjectOpen}
        onSubmit={(data) => {
          console.log("Nieuw project:", data)
        }}
      />
    </DashboardLayout>
  )
}
