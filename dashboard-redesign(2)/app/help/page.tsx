"use client"

import { Suspense, useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Video,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const categories = [
  { icon: FileText, label: "Facturen & Offertes", count: 12 },
  { icon: Book, label: "Aan de slag", count: 8 },
  { icon: MessageCircle, label: "Account & Instellingen", count: 6 },
  { icon: Video, label: "Video Tutorials", count: 15 },
]

const faqs = [
  {
    question: "Hoe maak ik een nieuwe factuur aan?",
    answer:
      "Ga naar Facturen > Nieuwe Factuur. Vul de klantgegevens in, voeg producten of diensten toe en klik op 'Opslaan' of 'Versturen'. Je kunt ook de AI gebruiken om automatisch een factuur te genereren.",
  },
  {
    question: "Kan ik mijn factuursjabloon aanpassen?",
    answer:
      "Ja! Ga naar Instellingen > Bedrijf > Factuursjabloon. Hier kun je je logo uploaden, kleuren aanpassen en extra velden toevoegen.",
  },
  {
    question: "Hoe koppel ik mijn bankrekening?",
    answer:
      "Ga naar Bankieren > Bank Koppelen. Selecteer je bank en volg de stappen om veilig te verbinden via PSD2. Je transacties worden dan automatisch geïmporteerd.",
  },
  {
    question: "Wat kan de AI Assistent voor mij doen?",
    answer:
      "De AI Assistent kan offertes en facturen schrijven, financiële analyses maken, herinneringen opstellen en bedrijfsadvies geven. Stel gewoon je vraag in natuurlijke taal!",
  },
  {
    question: "Hoe exporteer ik mijn gegevens voor de belastingaangifte?",
    answer:
      "Ga naar Inzichten > Exporteren. Selecteer de periode en het gewenste formaat (CSV, Excel of PDF). Je kunt ook direct koppelen met je accountant.",
  },
]

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat met ons support team",
    action: "Start Chat",
    available: true,
  },
  {
    icon: Mail,
    title: "E-mail Support",
    description: "support@onyx.ai",
    action: "Stuur E-mail",
    available: true,
  },
  {
    icon: Phone,
    title: "Telefonisch",
    description: "Ma-Vr 9:00 - 17:00",
    action: "+31 20 123 4567",
    available: false,
  },
]

function HelpContent() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <PageHeader title="Help & Support" description="Vind antwoorden of neem contact op" icon={HelpCircle} />

      {/* Search */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Hoe kunnen we helpen?</h2>
            <p className="text-muted-foreground mb-4">Zoek in onze kennisbank of stel een vraag</p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Zoek naar artikelen, tutorials of veelgestelde vragen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-muted/50 border-0 text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.label} className="glass-card hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{category.label}</p>
                  <p className="text-sm text-muted-foreground">{category.count} artikelen</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Veelgestelde Vragen</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Contact Opnemen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactOptions.map((option) => (
              <div
                key={option.title}
                className={`p-4 rounded-xl ${option.available ? "bg-muted/50" : "bg-muted/30 opacity-60"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <option.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{option.title}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <Button variant="link" className="p-0 h-auto mt-1 text-primary" disabled={!option.available}>
                      {option.action}
                      {option.available && <ExternalLink className="w-3 h-3 ml-1" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Werktijden support:</p>
              <p className="text-sm text-foreground">Maandag - Vrijdag: 9:00 - 17:00</p>
              <p className="text-sm text-foreground">Weekend: Alleen e-mail</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function HelpPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={null}>
        <HelpContent />
      </Suspense>
    </DashboardLayout>
  )
}
