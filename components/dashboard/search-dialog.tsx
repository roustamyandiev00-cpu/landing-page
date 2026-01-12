"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  FileText, 
  Receipt, 
  Mail, 
  Calendar,
  Settings,
  Sparkles
} from "lucide-react"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const searchItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", keywords: ["home", "overzicht"] },
  { icon: Users, label: "Klanten", href: "/dashboard/klanten", keywords: ["contacten", "bedrijven"] },
  { icon: FolderKanban, label: "Projecten", href: "/dashboard/projecten", keywords: ["werk", "taken"] },
  { icon: FileText, label: "Offertes", href: "/dashboard/offertes", keywords: ["quotes", "prijzen"] },
  { icon: Receipt, label: "Facturen", href: "/dashboard/facturen", keywords: ["invoices", "betaling"] },
  { icon: Mail, label: "E-mail", href: "/dashboard/email", keywords: ["berichten", "inbox"] },
  { icon: Calendar, label: "Agenda", href: "/dashboard/agenda", keywords: ["afspraken", "planning"] },
  { icon: Sparkles, label: "AI Assistent", href: "/dashboard/ai-assistent", keywords: ["chat", "hulp"] },
  { icon: Settings, label: "Instellingen", href: "/dashboard/instellingen", keywords: ["profiel", "account"] },
]

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const filteredItems = searchItems.filter((item) => {
    const searchTerm = query.toLowerCase()
    return (
      item.label.toLowerCase().includes(searchTerm) ||
      item.keywords.some((keyword) => keyword.includes(searchTerm))
    )
  })

  const handleSelect = (href: string) => {
    router.push(href)
    onOpenChange(false)
    setQuery("")
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <div className="flex items-center border-b border-border px-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Zoeken... (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base"
            autoFocus
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">Geen resultaten gevonden</p>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleSelect(item.href)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors text-left"
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{item.label}</span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
