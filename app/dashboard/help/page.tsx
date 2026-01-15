"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  Book, 
  Video, 
  FileText,
  ExternalLink,
  Clock,
  CheckCircle
} from "lucide-react"

const faqItems = [
  {
    question: "Hoe maak ik een factuur aan?",
    answer: "Ga naar Facturen → Nieuwe Factuur. Selecteer een klant, voeg items toe en klik op Opslaan.",
    category: "Facturen"
  },
  {
    question: "Kan ik offertes automatisch genereren?",
    answer: "Ja! Gebruik de AI Offerte Generator. Beschrijf je project en AI maakt een offerte voor je.",
    category: "Offertes"
  },
  {
    question: "Hoe voeg ik een nieuwe klant toe?",
    answer: "Ga naar Klanten → Nieuwe Klant. Vul de gegevens in en klik op Opslaan.",
    category: "Klanten"
  },
  {
    question: "Waar vind ik mijn bedrijfsgegevens?",
    answer: "Ga naar Instellingen → Bedrijf om je KVK, BTW nummer en andere gegevens in te stellen.",
    category: "Instellingen"
  }
]

const supportOptions = [
  {
    title: "Live Chat",
    description: "Chat direct met ons support team",
    icon: MessageCircle,
    action: "Start Chat",
    available: true
  },
  {
    title: "E-mail Support",
    description: "Stuur ons een e-mail voor uitgebreide hulp",
    icon: Mail,
    action: "E-mail Sturen",
    available: true
  },
  {
    title: "Telefoon Support",
    description: "Bel ons voor directe ondersteuning",
    icon: Phone,
    action: "Bel Nu",
    available: false
  }
]

const resources = [
  {
    title: "Gebruikershandleiding",
    description: "Complete gids voor alle functies",
    icon: Book,
    type: "PDF"
  },
  {
    title: "Video Tutorials",
    description: "Stap-voor-stap video uitleg",
    icon: Video,
    type: "Video"
  },
  {
    title: "API Documentatie",
    description: "Voor ontwikkelaars en integraties",
    icon: FileText,
    type: "Docs"
  }
]

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Help & Support"
          description="Vind antwoorden op je vragen en krijg ondersteuning"
          icon={HelpCircle}
        />

        {/* Search */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Zoek in de help artikelen..."
                className="pl-12 h-12 bg-muted/50 border-0 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Veelgestelde Vragen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">{item.question}</h3>
                      <Badge variant="secondary" className="ml-2">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Hulpbronnen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {resources.map((resource, index) => (
                    <div key={index} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <resource.icon className="w-5 h-5 text-primary" />
                        </div>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <h3 className="font-medium text-foreground mb-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                        Bekijken <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Options */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Contact Opnemen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportOptions.map((option, index) => (
                  <div key={index} className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <option.icon className="w-5 h-5 text-primary" />
                      </div>
                      {option.available ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="w-3 h-3" /> Beschikbaar
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="w-3 h-3" /> Binnenkort
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-foreground mb-1">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                    <Button 
                      size="sm" 
                      disabled={!option.available}
                      className="w-full"
                    >
                      {option.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Systeem Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">API Status</span>
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="w-3 h-3" /> Operationeel
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Database</span>
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="w-3 h-3" /> Operationeel
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI Services</span>
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="w-3 h-3" /> Operationeel
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}