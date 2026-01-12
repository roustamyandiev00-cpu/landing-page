"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mail, Search, Star, Trash2, Archive, Inbox, Send, FileText, AlertCircle, Sparkles } from "lucide-react"
import { NewEmailDialog } from "@/components/dashboard/new-email-dialog"
import { AIGeneratorDialog } from "@/components/dashboard/ai-generator-dialog"

const folders = [
  { icon: Inbox, label: "Inbox", count: 24, active: true },
  { icon: Star, label: "Belangrijk", count: 5 },
  { icon: Send, label: "Verzonden", count: 0 },
  { icon: FileText, label: "Concepten", count: 2 },
  { icon: Archive, label: "Archief", count: 0 },
  { icon: Trash2, label: "Prullenbak", count: 0 },
]

const initialEmails = [
  {
    id: 1,
    from: "Jan de Vries",
    email: "jan@abccorp.nl",
    subject: "Re: Offerte aanvraag Q1 2026",
    preview: "Bedankt voor de offerte. We hebben intern overlegd en willen graag een aantal aanpassingen bespreken...",
    time: "10:30",
    unread: true,
    starred: true,
    hasAttachment: true,
  },
  {
    id: 2,
    from: "Belastingdienst",
    email: "noreply@belastingdienst.nl",
    subject: "Herinnering: BTW aangifte Q4 2025",
    preview: "Uw BTW aangifte voor het vierde kwartaal van 2025 dient uiterlijk 31 januari 2026 te worden ingediend...",
    time: "09:15",
    unread: true,
    starred: false,
    important: true,
  },
  {
    id: 3,
    from: "Maria Santos",
    email: "maria@xyztech.com",
    subject: "Partnership voorstel",
    preview: "Geachte heer/mevrouw, Ik schrijf u namens XYZ Tech met een interessant partnership voorstel...",
    time: "Gisteren",
    unread: false,
    starred: false,
  },
  {
    id: 4,
    from: "ING Zakelijk",
    email: "zakelijk@ing.nl",
    subject: "Uw maandelijkse rekeningoverzicht",
    preview: "Uw rekeningoverzicht voor december 2025 staat klaar in Mijn ING Zakelijk...",
    time: "Gisteren",
    unread: false,
    starred: false,
  },
  {
    id: 5,
    from: "Kamer van Koophandel",
    email: "info@kvk.nl",
    subject: "Jaarlijkse update bedrijfsgegevens",
    preview: "Het is tijd om uw bedrijfsgegevens te controleren en indien nodig bij te werken...",
    time: "2 dagen",
    unread: false,
    starred: true,
  },
]

export default function EmailPage() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [emails, setEmails] = useState(initialEmails)
  const [activeFolder, setActiveFolder] = useState("Inbox")

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmails(emails.map((email) => (email.id === id ? { ...email, starred: !email.starred } : email)))
  }

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="E-mail" description="Beheer je zakelijke correspondentie" icon={Mail}>
          <NewEmailDialog>
            <Button className="gap-2">
              <Mail className="w-4 h-4" />
              Nieuwe E-mail
            </Button>
          </NewEmailDialog>
        </PageHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="glass-card lg:col-span-1">
            <CardContent className="p-4 space-y-2">
              {folders.map((folder) => (
                <button
                  key={folder.label}
                  onClick={() => setActiveFolder(folder.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    activeFolder === folder.label
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <folder.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{folder.label}</span>
                  {folder.count > 0 && (
                    <Badge variant={activeFolder === folder.label ? "default" : "secondary"} className="text-xs">
                      {folder.count}
                    </Badge>
                  )}
                </button>
              ))}

              <div className="pt-4 border-t border-border mt-4">
                <AIGeneratorDialog type="email">
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI E-mail Schrijven
                  </Button>
                </AIGeneratorDialog>
              </div>
            </CardContent>
          </Card>

          {/* Email List */}
          <Card className="glass-card lg:col-span-3">
            <CardContent className="p-4">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Zoek in e-mails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>

              {/* Email List */}
              <div className="space-y-2">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      selectedEmail === email.id ? "bg-primary/10" : "hover:bg-muted/50"
                    } ${email.unread ? "bg-muted/30" : ""}`}
                  >
                    <button className="mt-1" onClick={(e) => toggleStar(email.id, e)}>
                      <Star
                        className={`w-5 h-5 transition-colors ${email.starred ? "fill-amber-400 text-amber-400" : "text-muted-foreground hover:text-amber-400"}`}
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${email.unread ? "text-foreground" : "text-muted-foreground"}`}>
                          {email.from}
                        </span>
                        {email.important && <AlertCircle className="w-4 h-4 text-red-500" />}
                        {email.hasAttachment && <FileText className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <p
                        className={`text-sm ${email.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}
                      >
                        {email.subject}
                      </p>
                      <p className="text-sm text-muted-foreground truncate mt-1">{email.preview}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">{email.time}</span>
                      {email.unread && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
